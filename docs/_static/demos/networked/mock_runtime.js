/**
 * Animates the demo state so the UI feels alive.
 *
 * Drives: breadcrumb growth, speed/heading drift, HDOP cycling, satellite
 * flicker, per-OWL CPU temp + loop time, and slow detection counters. The
 * dashboard's own polling loops (1–5s) pick up the changes — we just keep
 * the shared state object moving.
 */
(function () {
    'use strict';

    const S = window.OWL_DEMO_STATE;
    if (!S) { return; }

    let tick = 0;

    // Fast ticker — GPS fix, speed sine wave, satellite flicker (1 Hz)
    setInterval(() => {
        tick += 1;

        // Sinusoidal speed between 3 and 14 km/h
        const t = tick / 10;
        S.GPS.speed_kmh = 8.5 + Math.sin(t) * 3.8 + Math.sin(t * 1.7) * 1.2;
        if (S.GPS.speed_kmh < 0) S.GPS.speed_kmh = 0;

        // Satellite count flickers 7–11 with a slight bias upward
        if (Math.random() < 0.25) {
            S.GPS.satellites = 7 + Math.floor(Math.random() * 5);
        }

        // HDOP cycles 0.8 → 1.3 → 0.9 so the marker colour swaps
        S.GPS.hdop = 0.9 + Math.abs(Math.sin(tick / 15)) * 1.4;

        // Age freshness — always recent
        S.GPS.age_seconds = 0.3 + Math.random() * 0.4;

        // Actuation mirrors GPS speed
        S.ACTUATION.speed_kmh = S.GPS.speed_kmh;
        S.ACTUATION.actuation_duration =
            Math.max(0.05, Math.min(0.5, 1.2 / Math.max(S.GPS.speed_kmh, 1)));
    }, 1000);

    // Breadcrumb extender — reveal one point every 2s, wrap to start at end
    setInterval(() => {
        S.GPS._track_index = (S.GPS._track_index + 1) % S.TRACK.length;
        const pt = S.TRACK[S.GPS._track_index];

        S.GPS.longitude = pt[0];
        S.GPS.latitude = pt[1];

        // Heading — derive from previous->current vector
        const prev = S.TRACK[(S.GPS._track_index - 1 + S.TRACK.length) % S.TRACK.length];
        const dLon = pt[0] - prev[0];
        const dLat = pt[1] - prev[1];
        if (Math.abs(dLon) + Math.abs(dLat) > 1e-9) {
            S.GPS.heading = (Math.atan2(dLon, dLat) * 180 / Math.PI + 360) % 360;
        }

        // Grow the visible polyline; reset to a single point when we wrap
        if (S.GPS._track_index === 0) {
            S.GPS._visible_points = [pt];
        } else {
            S.GPS._visible_points.push(pt);
        }
    }, 2000);

    // Per-OWL drift — temps, loop times, CPU/mem gauges (every 3s)
    setInterval(() => {
        S.OWLS.forEach(o => {
            o.cpu_temp = Math.max(35, Math.min(78,
                o._base_temp + (Math.random() - 0.5) * 5.5
            ));
            o.cpu_temp = Math.round(o.cpu_temp * 10) / 10;

            o.avg_loop_time_ms = Math.max(18, Math.min(55,
                o._base_loop + (Math.random() - 0.5) * 6
            ));
            o.avg_loop_time_ms = Math.round(o.avg_loop_time_ms);
            o.fps = Math.round(1000 / o.avg_loop_time_ms);

            o.cpu_percent = Math.max(5, Math.min(95,
                o.cpu_percent + (Math.random() - 0.5) * 6
            ));
            o.cpu_percent = Math.round(o.cpu_percent);
            o.memory_percent = Math.max(20, Math.min(90,
                o.memory_percent + (Math.random() - 0.5) * 3
            ));
            o.memory_percent = Math.round(o.memory_percent);
        });
    }, 3000);

    // One OWL disconnects and reconnects every ~25s so viewers see the
    // offline card style and online/offline transition.
    let offlineToggle = 0;
    setInterval(() => {
        const target = S.OWLS[2];
        offlineToggle = (offlineToggle + 1) % 4;
        target.connected = (offlineToggle !== 0);
        target.status = target.connected ? 'online' : 'offline';
    }, 8000);
})();
