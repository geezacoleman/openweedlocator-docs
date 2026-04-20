/**
 * Mock data + state for the OWL dashboard demos.
 *
 * This file holds the single source of truth the stubbed fetch() draws from.
 * mock_runtime.js mutates this object on a timer so the UI looks alive.
 */
(function () {
    'use strict';

    // Pre-baked farm loop — realistic rectangular field pattern near Wagga.
    // Each entry is [lon, lat] (GeoJSON order). The runtime reveals points
    // one at a time so the breadcrumb appears to grow.
    const TRACK = [
        [147.3700, -35.1150], [147.3702, -35.1150], [147.3704, -35.1150],
        [147.3706, -35.1150], [147.3708, -35.1150], [147.3710, -35.1150],
        [147.3712, -35.1150], [147.3714, -35.1150], [147.3716, -35.1150],
        [147.3718, -35.1150], [147.3720, -35.1150], [147.3722, -35.1150],
        [147.3724, -35.1150], [147.3726, -35.1151], [147.3727, -35.1152],
        [147.3728, -35.1154], [147.3728, -35.1156], [147.3728, -35.1158],
        [147.3728, -35.1160], [147.3728, -35.1162], [147.3728, -35.1164],
        [147.3727, -35.1165], [147.3725, -35.1166], [147.3723, -35.1166],
        [147.3721, -35.1166], [147.3719, -35.1166], [147.3717, -35.1166],
        [147.3715, -35.1166], [147.3713, -35.1166], [147.3711, -35.1166],
        [147.3709, -35.1166], [147.3707, -35.1166], [147.3705, -35.1166],
        [147.3703, -35.1166], [147.3701, -35.1166], [147.3700, -35.1167],
        [147.3699, -35.1168], [147.3699, -35.1170], [147.3699, -35.1172],
        [147.3699, -35.1174], [147.3699, -35.1176], [147.3699, -35.1178],
        [147.3700, -35.1179], [147.3702, -35.1180], [147.3704, -35.1180],
        [147.3706, -35.1180], [147.3708, -35.1180], [147.3710, -35.1180],
        [147.3712, -35.1180], [147.3714, -35.1180], [147.3716, -35.1180],
        [147.3718, -35.1180], [147.3720, -35.1180], [147.3722, -35.1180],
        [147.3724, -35.1180], [147.3726, -35.1180], [147.3728, -35.1180],
    ];

    // Fake OWL devices. `_base_temp` / `_base_loop` are the means the runtime
    // drifts around every few seconds.
    const OWLS = [
        {
            device_id: 'owl-1', connected: true, status: 'online',
            detection_enable: true, detection_mode: 1,
            recording_enable: false, image_sample_enable: false,
            algorithm: 'exhsv', sensitivity_level: 'medium', relay_num: 4,
            cpu_temp: 54.0, _base_temp: 54,
            cpu_percent: 22, memory_percent: 41,
            avg_loop_time_ms: 31, _base_loop: 31, fps: 32,
            model_name: null, model_available: false,
            tracking_enabled: false, nozzles_all: false,
            ip: '192.168.1.11',
        },
        {
            device_id: 'owl-2', connected: true, status: 'online',
            detection_enable: true, detection_mode: 1,
            recording_enable: false, image_sample_enable: false,
            algorithm: 'exhsv', sensitivity_level: 'medium', relay_num: 4,
            cpu_temp: 49.0, _base_temp: 49,
            cpu_percent: 18, memory_percent: 38,
            avg_loop_time_ms: 34, _base_loop: 34, fps: 29,
            model_name: null, model_available: false,
            tracking_enabled: false, nozzles_all: false,
            ip: '192.168.1.12',
        },
        {
            device_id: 'owl-3', connected: true, status: 'online',
            detection_enable: false, detection_mode: 1,
            recording_enable: false, image_sample_enable: false,
            algorithm: 'exhsv', sensitivity_level: 'low', relay_num: 4,
            cpu_temp: 46.0, _base_temp: 46,
            cpu_percent: 12, memory_percent: 33,
            avg_loop_time_ms: 28, _base_loop: 28, fps: 36,
            model_name: null, model_available: false,
            tracking_enabled: false, nozzles_all: false,
            ip: '192.168.1.13',
        },
    ];

    // Live GPS state — mutated by the runtime.
    const GPS = {
        latitude: TRACK[0][1],
        longitude: TRACK[0][0],
        speed_kmh: 8.2,
        heading: 90.0,
        satellites: 9,
        hdop: 1.1,
        altitude: 182.0,
        fix_valid: true,
        age_seconds: 0.4,
        _track_index: 0,
        _visible_points: [TRACK[0]],
    };

    const ACTUATION = {
        speed_kmh: 8.2,
        actuation_duration: 0.15,
        delay: 0.0,
        source: 'gps',
        gps_status: 'active',
        coverage_ok: true,
        min_gap_cm: 45,
        coverage_message: '',
        actuation_length_cm: 10,
        offset_cm: 30,
    };

    const GREENONBROWN_DEFAULTS = {
        exg_min: 25, exg_max: 200,
        hue_min: 39, hue_max: 83,
        saturation_min: 50, saturation_max: 220,
        brightness_min: 60, brightness_max: 220,
        min_detection_area: 10,
    };

    window.OWL_DEMO_STATE = {
        TRACK, OWLS, GPS, ACTUATION, GREENONBROWN_DEFAULTS,
    };
})();
