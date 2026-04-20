/**
 * OWL dashboard demo stubs.
 *
 * Loaded BEFORE any real module so the real modules see a stubbed fetch()
 * and never hit a real backend. Write endpoints (POST/DELETE) are silently
 * accepted; read endpoints return mock state from mock_data.js.
 */
(function () {
    'use strict';

    if (!window.OWL_DEMO_STATE) {
        console.warn('[demo] mock_data.js not loaded before stubs.js');
        return;
    }

    const S = window.OWL_DEMO_STATE;

    // Mutable UI state — updated by POST endpoints so subsequent stats polls
    // reflect the user's clicks. Keeps the demo feeling responsive.
    const UI = {
        owl_running: true,
        detection_running: true,
        recording: false,
        tracking_enabled: false,
        detection_mode: 1,
        sensitivity_level: 'medium',
        fan_mode: 'auto',
        algorithm: 'exhsv',
    };

    // Helpers -----------------------------------------------------------
    function json(body, status) {
        return new Response(JSON.stringify(body), {
            status: status || 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    function ok(extras) {
        return { success: true, ...(extras || {}) };
    }

    async function parseBody(init) {
        if (!init || !init.body) return {};
        try {
            if (typeof init.body === 'string') return JSON.parse(init.body);
            if (init.body instanceof FormData) {
                const out = {};
                init.body.forEach((v, k) => { out[k] = v; });
                return out;
            }
        } catch (e) { /* ignore */ }
        return {};
    }

    // Suppress every native modal so the docs page never shows browser chrome
    // dialogs on top of the embedded demo.
    window.alert   = function () { /* demo: no-op */ };
    window.confirm = function () { return true; };  // "user accepts"
    window.prompt  = function (_msg, def) { return def == null ? '' : def; };

    function owlsPayload() {
        // Networked dashboard's _dashboard.js expects owls as an OBJECT keyed
        // by device_id, plus a `mqtt_connected` sibling. Matches the real
        // /api/owls shape in networked.py.
        const byId = {};
        S.OWLS.forEach(o => { byId[o.device_id] = { ...o }; });
        return {
            mqtt_connected: true,
            owls: byId,
            count: S.OWLS.length,
        };
    }

    function systemStatsPayload() {
        // Standalone _stats.js fields — cpu/mem/temp chips, power button,
        // detection/recording/tracking switches, sensitivity/fan readouts.
        // Reads the shared UI state so user clicks actually persist.
        const pick = S.OWLS[0];
        const t = Date.now() / 1000;
        return {
            owl_running: UI.owl_running,
            detection_running: UI.detection_running,
            detection_enable: UI.detection_running,
            recording: UI.recording,
            image_sample_enable: UI.recording,
            tracking_enabled: UI.tracking_enabled,
            detection_mode: UI.detection_mode,
            cpu_percent: 18 + Math.round(Math.sin(t / 5) * 6 + 6),
            memory_percent: 42 + Math.round(Math.sin(t / 7) * 5),
            cpu_temp: Math.round(pick.cpu_temp * 10) / 10,
            resolution_width: 1280,
            resolution_height: 720,
            sensitivity_level: UI.sensitivity_level,
            algorithm: UI.algorithm,
            fan_status: {
                mode: UI.fan_mode,
                rpm: UI.fan_mode === '100' ? 4800 : 3200 + Math.round(Math.sin(t / 3) * 400),
            },
            model_available: false,
            algorithm_error: null,
        };
    }

    function gpsPayload() {
        return {
            fix: {
                latitude: S.GPS.latitude,
                longitude: S.GPS.longitude,
                speed_kmh: Math.round(S.GPS.speed_kmh * 10) / 10,
                heading: Math.round(S.GPS.heading * 10) / 10,
                satellites: S.GPS.satellites,
                hdop: Math.round(S.GPS.hdop * 10) / 10,
                altitude: S.GPS.altitude,
                fix_valid: S.GPS.fix_valid,
                age_seconds: S.GPS.age_seconds,
            },
            connection: { gps_connected: true, gps_enabled: true, source: 'serial' },
            session: {
                active: true,
                distance_km: Math.round(S.GPS._track_index * 0.02 * 100) / 100,
                time_active_s: S.GPS._track_index * 2,
                area_hectares: Math.round(S.GPS._track_index * 0.02 * 12 / 10 * 100) / 100,
                boom_width_m: 12.0,
            },
        };
    }

    function breadcrumbsPayload() {
        return {
            coordinates: S.GPS._visible_points.slice(),
            recording: true,
        };
    }

    function actuationPayload() {
        return { ...S.ACTUATION, speed_kmh: S.GPS.speed_kmh };
    }

    // Route table -------------------------------------------------------
    // Handlers receive (body, method) and return the JSON payload.
    const ROUTES = {
        // --- Networked ---
        '/api/owls':                    { GET: owlsPayload },
        '/api/gps':                     { GET: gpsPayload },
        '/api/gps/breadcrumbs':         { GET: breadcrumbsPayload },
        '/api/gps/tracks':              { GET: () => ({ tracks: [] }) },
        '/api/gps/config':              { POST: () => ok({ boom_width_m: 12.0 }) },
        '/api/actuation':               { GET: actuationPayload },
        '/api/actuation/config':        { POST: ok },
        '/api/greenonbrown/defaults':   { GET: () => S.GREENONBROWN_DEFAULTS },
        '/api/command':                 { POST: ok },
        '/api/config':                  { GET: () => ({}), POST: ok },
        '/api/config/param':            { POST: ok, GET: () => ({}) },
        '/api/config/section':          { POST: ok },
        '/api/config/reset-default':    { POST: ok },
        '/api/config/set-active':       { POST: ok },
        '/api/widgets':                 { GET: () => ({ widgets: [] }) },
        '/api/system/shutdown':         { POST: ok },
        '/api/system/reboot':           { POST: ok },
        '/api/system/fix-screen':       { POST: ok },

        // --- Standalone ---
        '/api/system_stats':            { GET: systemStatsPayload },
        '/api/get_errors':              { GET: () => [] },
        '/api/owl/start':               { POST: () => { UI.owl_running = true;  return ok({ message: 'OWL starting' }); } },
        '/api/owl/stop':                { POST: () => { UI.owl_running = false; return ok({ message: 'OWL stopped' }); } },
        '/api/detection/start':         { POST: () => { UI.detection_running = true;  UI.detection_mode = 1; return ok({ message: 'Detection started' }); } },
        '/api/detection/stop':          { POST: () => { UI.detection_running = false; return ok({ message: 'Detection stopped' }); } },
        '/api/recording/start':         { POST: () => { UI.recording = true;  return ok({ message: 'Recording started' }); } },
        '/api/recording/stop':          { POST: () => { UI.recording = false; return ok({ message: 'Recording stopped' }); } },
        '/api/tracking/set':            { POST: async (_, init) => {
            const b = await parseBody(init);
            // Real backend accepts either {value: bool} or {enabled: bool}
            if ('value' in b) UI.tracking_enabled = !!b.value;
            else if ('enabled' in b) UI.tracking_enabled = !!b.enabled;
            return ok();
        } },
        '/api/nozzles/all-on':          { POST: () => { UI.detection_mode = 2; return ok(); } },
        '/api/nozzles/all-off':         { POST: () => { UI.detection_mode = 1; return ok(); } },
        '/api/sensitivity/set':         { POST: async (_, init) => {
            const b = await parseBody(init);
            // Real backend uses {level: 'low'|'medium'|'high'}
            const val = b.level || b.preset || b.sensitivity;
            if (val) UI.sensitivity_level = String(val).toLowerCase();
            return ok();
        } },
        '/api/sensitivity/presets':     { GET: () => ({ presets: ['low', 'medium', 'high'] }) },
        '/api/fan/set':                 { POST: async (_, init) => { const b = await parseBody(init); if (b.mode) UI.fan_mode = b.mode; return ok(); } },
        '/api/algorithm/set':           { POST: async (_, init) => { const b = await parseBody(init); if (b.algorithm) UI.algorithm = b.algorithm; return ok(); } },
        '/api/download_frame':          { POST: ok },
        '/api/update_gps':              { POST: ok },
        '/api/camera/set_max_resolution': { POST: ok },
        '/api/session/metadata':        { GET: () => ({}), POST: ok },
        '/api/controller_config':       { GET: () => ({ controller_type: 'none' }) },
        '/api/controller/switch_purpose': { POST: ok },

        // --- AI tab ---
        '/api/ai/set_model':            { POST: ok },
        '/api/ai/set_detect_classes':   { POST: ok },

        // --- Storage / downloads (standalone) ---
        '/api/usb_storage':             { GET: () => ({ available: false, path: null, capacity_gb: 0 }) },
        '/api/browse_files':            { POST: () => ({ files: [], directories: [] }) },
        '/api/config/crop_buffer':      { POST: ok },
        '/api/config/confidence':       { POST: ok },
    };

    // Patterns (regex matchers for dynamic paths) -----------------------
    const PATTERNS = [
        // /api/owl/<id>/restart
        { re: /^\/api\/owl\/[^/]+\/restart$/, handle: () => json(ok()) },
        // /api/snapshot/<id>  — return the placeholder image as a binary blob
        { re: /^\/api\/snapshot\/[^/]+$/, handle: () => {
            return fetch('./assets/video-placeholder.jpg');
        }},
        // /api/gps/tracks/<filename>  — return empty geojson
        { re: /^\/api\/gps\/tracks\/[^/]+$/, handle: () => json({
            type: 'FeatureCollection', features: [],
        })},
    ];

    // Intercept ---------------------------------------------------------
    const realFetch = window.fetch.bind(window);

    window.fetch = async function (input, init) {
        const raw = typeof input === 'string' ? input : (input && input.url) || '';
        const method = ((init && init.method) || (input && input.method) || 'GET').toUpperCase();

        // Only intercept app-origin /api/ paths. Everything else — relative
        // asset loads, cross-origin (Leaflet tiles, fonts) — passes through.
        if (!raw.startsWith('/api/')) {
            return realFetch(input, init);
        }

        const path = raw.split('?')[0];
        const entry = ROUTES[path];
        if (entry && entry[method]) {
            try {
                const result = await entry[method](path, init);
                return json(result);
            } catch (e) {
                console.warn('[demo] handler error', path, e);
                return json(ok(), 200);
            }
        }

        for (const p of PATTERNS) {
            if (p.re.test(path)) {
                try { return await p.handle(raw, init); }
                catch (e) {
                    console.warn('[demo] pattern error', path, e);
                    return json(ok(), 200);
                }
            }
        }

        // Unknown endpoint — log once. Always return {success:true} so real
        // modules don't treat it as a failure and spam error toasts.
        if (!window._owlDemoMissing) window._owlDemoMissing = new Set();
        if (!window._owlDemoMissing.has(path)) {
            window._owlDemoMissing.add(path);
            console.info('[demo] unmocked endpoint (returning {success:true}):', method, path);
        }
        return json(ok({ message: 'demo' }));
    };

    // Replace video-feed / preview imgs as soon as the DOM is ready
    function swapMediaPlaceholders() {
        const ids = ['video-feed-img', 'config-preview-img', 'frame-viewer-img'];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.src = './assets/video-placeholder.jpg';
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', swapMediaPlaceholders);
    } else {
        swapMediaPlaceholders();
    }

    // No-op helpers some modules expect on the window
    window.sendMQTTCommand = window.sendMQTTCommand || function () {};

    // Stub navigator.geolocation so the standalone's GPS toggle never
    // triggers the browser permission prompt. Replays the same breadcrumb
    // loop the GPS tab uses so the UI looks consistent.
    try {
        const fake = {
            getCurrentPosition: function (success, _err, _opts) {
                setTimeout(() => success({
                    coords: {
                        latitude: S.GPS.latitude,
                        longitude: S.GPS.longitude,
                        accuracy: 4.5,
                        altitude: S.GPS.altitude,
                        altitudeAccuracy: 2.0,
                        heading: S.GPS.heading,
                        speed: S.GPS.speed_kmh / 3.6,
                    },
                    timestamp: Date.now(),
                }), 300);
            },
            watchPosition: function (success, _err, _opts) {
                const id = setInterval(() => {
                    success({
                        coords: {
                            latitude: S.GPS.latitude,
                            longitude: S.GPS.longitude,
                            accuracy: 4.5,
                            altitude: S.GPS.altitude,
                            altitudeAccuracy: 2.0,
                            heading: S.GPS.heading,
                            speed: S.GPS.speed_kmh / 3.6,
                        },
                        timestamp: Date.now(),
                    });
                }, 1500);
                return id;
            },
            clearWatch: function (id) { clearInterval(id); },
        };
        Object.defineProperty(navigator, 'geolocation', {
            value: fake, configurable: true, writable: true,
        });
    } catch (e) { /* older browsers without configurable nav.geolocation — ignore */ }
})();
