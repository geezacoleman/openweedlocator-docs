/**
 * Auto-scale embedded dashboard demos.
 *
 * The real iframe always loads at its native viewport (1280×800 tablet,
 * 414×760 phone) so the dashboard's CSS media queries behave correctly.
 * This script shrinks the rendered size to exactly match the surrounding
 * docs content column — no more, no less — so there's never clipping or
 * extra whitespace.
 */
(function () {
    'use strict';

    const NATIVE = {
        'owl-demo-tablet': { w: 1280, h: 800 },
        'owl-demo-phone':  { w: 414,  h: 760 },
    };

    function scaleShell(shell) {
        const iframe = shell.querySelector('iframe');
        if (!iframe) return;

        let kind = null;
        for (const k in NATIVE) {
            if (shell.classList.contains(k)) { kind = k; break; }
        }
        if (!kind) return;

        const native = NATIVE[kind];
        const width = shell.clientWidth;
        if (!width) return;

        const scale = Math.min(1, width / native.w);
        iframe.style.width = native.w + 'px';
        iframe.style.height = native.h + 'px';
        iframe.style.transformOrigin = 'top left';
        iframe.style.transform = 'scale(' + scale + ')';

        // Keep the shell's own height pinned to the rendered height so there's
        // no empty space below the iframe.
        shell.style.height = (native.h * scale) + 'px';
    }

    function scaleAll() {
        document.querySelectorAll('.owl-demo-shell').forEach(scaleShell);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scaleAll);
    } else {
        scaleAll();
    }

    // Debounced resize handler
    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(scaleAll, 120);
    });

    // Rescale once more after images/fonts load in case column width shifts
    window.addEventListener('load', scaleAll);
})();
