// ============================================
// OWL Central Controller - GPS Map overlay
// Leaflet map + breadcrumb polyline + current-fix marker.
// Online OSM tiles with an offline grid fallback (for cabs without
// internet). Listens for `gps:update` events dispatched by _gps.js.
// ============================================

(function () {
    'use strict';

    const BREADCRUMB_POLL_MS = 5000;
    const TILE_ERROR_LIMIT = 3;
    const TILE_ERROR_WINDOW_MS = 10000;

    let map = null;
    let tileLayer = null;
    let gridLayer = null;
    let trackLine = null;
    let posMarker = null;
    let breadcrumbTimer = null;
    let lastFix = null;
    let hasAutoFit = false;
    let tileErrors = [];
    let usingFallback = false;

    function initMap() {
        if (map) return;
        if (typeof L === 'undefined') {
            console.warn('[gps_map] Leaflet not loaded; map disabled');
            return;
        }
        const el = document.getElementById('gps-map');
        if (!el) return;

        map = L.map(el, {
            zoomControl: true,
            attributionControl: true,
            center: [0, 0],
            zoom: 2,
            preferCanvas: true,
        });

        L.control.attribution({ position: 'bottomleft' }).addTo(map);
        // Zoom control in bottom-right keeps the top corners clear for the dials.
        map.zoomControl.setPosition('bottomright');

        tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
        });
        tileLayer.on('tileerror', onTileError);
        tileLayer.addTo(map);

        trackLine = L.polyline([], {
            color: '#1abc9c',
            weight: 4,
            opacity: 0.85,
        }).addTo(map);

        addCustomControls();

        window.addEventListener('online', () => {
            if (usingFallback && map && tileLayer) {
                map.addLayer(tileLayer);
                if (gridLayer) map.removeLayer(gridLayer);
                usingFallback = false;
                tileErrors = [];
            }
        });
    }

    function onTileError() {
        const now = Date.now();
        tileErrors.push(now);
        tileErrors = tileErrors.filter(t => now - t < TILE_ERROR_WINDOW_MS);
        if (tileErrors.length >= TILE_ERROR_LIMIT && !usingFallback) {
            switchToFallback();
        }
    }

    function switchToFallback() {
        if (!map || usingFallback) return;
        usingFallback = true;
        try { map.removeLayer(tileLayer); } catch (e) { /* noop */ }

        if (!gridLayer) {
            const Grid = L.GridLayer.extend({
                createTile: function (coords) {
                    const size = this.getTileSize();
                    const tile = document.createElement('canvas');
                    tile.width = size.x;
                    tile.height = size.y;
                    const ctx = tile.getContext('2d');
                    ctx.fillStyle = '#1a1a2e';
                    ctx.fillRect(0, 0, size.x, size.y);
                    ctx.strokeStyle = 'rgba(127, 140, 141, 0.25)';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(0, 0, size.x, size.y);
                    ctx.fillStyle = 'rgba(127, 140, 141, 0.45)';
                    ctx.font = '10px monospace';
                    ctx.fillText(coords.z + '/' + coords.x + '/' + coords.y, 6, 14);
                    return tile;
                }
            });
            gridLayer = new Grid({ maxZoom: 19 });
        }
        gridLayer.addTo(map);
        console.info('[gps_map] Offline fallback active — tiles unreachable');
    }

    function addCustomControls() {
        const Controls = L.Control.extend({
            options: { position: 'topright' },
            onAdd: function () {
                const container = L.DomUtil.create('div', 'leaflet-bar');
                container.style.background = 'transparent';
                container.style.border = 'none';
                container.style.boxShadow = 'none';

                const btnCentre = L.DomUtil.create('button', 'gps-map-btn', container);
                btnCentre.type = 'button';
                btnCentre.textContent = 'Centre';
                btnCentre.title = 'Centre on current fix';
                L.DomEvent.on(btnCentre, 'click', function (e) {
                    L.DomEvent.stopPropagation(e);
                    centreOnFix();
                });

                const btnFit = L.DomUtil.create('button', 'gps-map-btn', container);
                btnFit.type = 'button';
                btnFit.textContent = 'Fit all';
                btnFit.title = 'Zoom to whole track';
                L.DomEvent.on(btnFit, 'click', function (e) {
                    L.DomEvent.stopPropagation(e);
                    fitAll();
                });

                L.DomEvent.disableClickPropagation(container);
                return container;
            }
        });
        map.addControl(new Controls());
    }

    function centreOnFix() {
        if (map && lastFix && lastFix.latitude != null && lastFix.longitude != null) {
            map.setView([lastFix.latitude, lastFix.longitude], Math.max(map.getZoom(), 17));
        }
    }

    function fitAll() {
        if (!map || !trackLine) return;
        const latlngs = trackLine.getLatLngs();
        if (latlngs.length >= 2) {
            map.fitBounds(trackLine.getBounds(), { padding: [40, 40] });
        } else if (lastFix && lastFix.latitude != null) {
            map.setView([lastFix.latitude, lastFix.longitude], 16);
        }
    }

    function hdopColor(hdop) {
        if (hdop == null) return '#95a5a6';
        if (hdop <= 1.0) return '#2ecc71';
        if (hdop <= 2.0) return '#f39c12';
        return '#e74c3c';
    }

    function updatePositionMarker(fix) {
        if (!map) return;
        if (!fix || !fix.fix_valid || fix.latitude == null || fix.longitude == null) {
            if (posMarker) posMarker.setStyle({ opacity: 0.3, fillOpacity: 0.3 });
            return;
        }
        const ll = [fix.latitude, fix.longitude];
        if (!posMarker) {
            posMarker = L.circleMarker(ll, {
                radius: 8,
                color: 'white',
                weight: 2,
                fillColor: hdopColor(fix.hdop),
                fillOpacity: 1.0,
            }).addTo(map);
        } else {
            posMarker.setLatLng(ll);
            posMarker.setStyle({
                fillColor: hdopColor(fix.hdop),
                opacity: 1.0,
                fillOpacity: 1.0,
            });
        }
        if (!hasAutoFit) {
            hasAutoFit = true;
            map.setView(ll, 17);
        }
    }

    async function pollBreadcrumbs() {
        try {
            const res = await fetch('/api/gps/breadcrumbs');
            if (!res.ok) return;
            const data = await res.json();
            const coords = (data.coordinates || [])
                .filter(c => Array.isArray(c) && c.length >= 2)
                // Incoming is [lon, lat, (alt)] — Leaflet wants [lat, lon]
                .map(c => [c[1], c[0]]);
            if (trackLine) {
                trackLine.setLatLngs(coords);
            }
        } catch (e) {
            // Non-fatal — show empty track on error
        }
    }

    function onGPSUpdate(e) {
        const data = (e && e.detail) || {};
        const fix = data.fix || {};
        lastFix = fix;
        updatePositionMarker(fix);
    }

    window.gpsMapShow = function () {
        initMap();
        if (!map) return;
        // Leaflet needs a nudge after its container becomes visible.
        setTimeout(() => { try { map.invalidateSize(); } catch (e) {} }, 50);
        if (!breadcrumbTimer) {
            pollBreadcrumbs();
            breadcrumbTimer = setInterval(pollBreadcrumbs, BREADCRUMB_POLL_MS);
        }
    };

    window.gpsMapHide = function () {
        if (breadcrumbTimer) {
            clearInterval(breadcrumbTimer);
            breadcrumbTimer = null;
        }
    };

    window.addEventListener('gps:update', onGPSUpdate);
})();
