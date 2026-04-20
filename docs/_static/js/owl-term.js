/**
 * OWL install terminal player.
 *
 * Each <div class="owl-term" data-script="..."> becomes a dark terminal
 * chrome with a Play button. Clicking runs a JSON timeline of steps that
 * type commands, stream output, and auto-answer interactive prompts. All
 * state lives in the instance closure — multiple players on one page work
 * independently.
 *
 * Timeline step shapes:
 *   { "wait": 400 }
 *   { "prompt": "$ ", "type": "git clone ...", "cpm": 900 }
 *   { "out": "text", "speed": 2, "class": "info|ok|warn|err|muted|plain" }
 *   { "prompt": "$ ", "ask": "Do you want X? (y/n): ",
 *     "answer": "y", "answerDelay": 900,
 *     "branch": { "y": "dashboard-setup", "n": null } }
 *   { "clear": true }
 */
(function () {
    'use strict';

    const DEFAULT_CPM = 900;         // command typing speed (chars/minute)
    const DEFAULT_OUT_SPEED = 2;     // ms per output char
    const TICK_MIN = 5;              // scheduler floor (ms)

    const COPY_COMMANDS = [
        'git clone https://github.com/geezacoleman/OpenWeedLocator owl',
        'cd owl',
        'bash owl_setup.sh',
    ].join('\n');

    function el(tag, className, text) {
        const e = document.createElement(tag);
        if (className) e.className = className;
        if (text != null) e.textContent = text;
        return e;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, Math.max(TICK_MIN, ms | 0)));
    }

    async function waitWhileHidden() {
        while (document.hidden) await sleep(150);
    }

    function buildChrome(title) {
        const chrome = el('div', 'owl-term-chrome');
        chrome.appendChild(el('span', 'owl-term-dot owl-term-dot-r'));
        chrome.appendChild(el('span', 'owl-term-dot owl-term-dot-y'));
        chrome.appendChild(el('span', 'owl-term-dot owl-term-dot-g'));
        chrome.appendChild(el('span', 'owl-term-title', title || 'pi@raspberrypi: ~'));
        return chrome;
    }

    function buildPlayButton() {
        const btn = el('button', 'owl-term-play');
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Run install');
        const tri = el('span', 'owl-term-play-tri', '\u25B6');  // ▶
        const label = el('span', 'owl-term-play-label', 'Run install');
        btn.appendChild(tri);
        btn.appendChild(label);
        return btn;
    }

    function hydrate(root) {
        const scriptURL = root.getAttribute('data-script');
        if (!scriptURL) {
            console.warn('[owl-term] missing data-script', root);
            return;
        }
        const title = root.getAttribute('data-title') || 'pi@raspberrypi: ~';
        const label = root.getAttribute('data-label') || '';

        root.classList.add('owl-term-hydrated');
        root.textContent = '';

        const chrome = buildChrome(title);
        const body = el('pre', 'owl-term-body');
        const cursor = el('span', 'owl-term-cursor', '\u00A0');  // nbsp
        body.appendChild(cursor);

        const playBtn = buildPlayButton();
        const poster = el('div', 'owl-term-poster');
        poster.appendChild(playBtn);

        const replay = el('button', 'owl-term-btn', '\u21BB  Replay');  // ↻
        replay.type = 'button';
        replay.setAttribute('data-kind', 'replay');
        replay.hidden = true;

        const copy = el('button', 'owl-term-btn', '\u2398  Copy commands');  // ⎘
        copy.type = 'button';
        copy.setAttribute('data-kind', 'copy');

        const copiedChip = el('span', 'owl-term-chip', 'Copied');
        copiedChip.hidden = true;

        const caption = el('span', 'owl-term-caption', label);

        const controls = el('div', 'owl-term-controls');
        controls.appendChild(replay);
        controls.appendChild(copy);
        controls.appendChild(copiedChip);
        controls.appendChild(caption);

        const frame = el('div', 'owl-term-frame');
        frame.appendChild(chrome);
        frame.appendChild(body);
        frame.appendChild(poster);
        root.appendChild(frame);
        root.appendChild(controls);

        let timeline = null;
        let running = false;
        let stopFlag = false;
        let stickyBottom = true;

        body.addEventListener('scroll', () => {
            const near = (body.scrollHeight - body.scrollTop - body.clientHeight) < 24;
            stickyBottom = near;
        });

        function scrollBottom() {
            if (stickyBottom) body.scrollTop = body.scrollHeight;
        }

        function writeText(text, cls) {
            const span = cls
                ? el('span', 'owl-term-' + cls, text)
                : el('span', null, text);
            body.insertBefore(span, cursor);
            scrollBottom();
        }

        async function typeChars(text, msPerChar, cls) {
            const span = el('span', cls ? 'owl-term-' + cls : null);
            body.insertBefore(span, cursor);
            for (let i = 0; i < text.length; i++) {
                if (stopFlag) return;
                span.appendChild(document.createTextNode(text[i]));
                scrollBottom();
                const jitter = Math.random() * 12;
                await sleep(msPerChar + jitter);
            }
        }

        async function streamOut(text, msPerChar, cls) {
            const span = el('span', cls ? 'owl-term-' + cls : null);
            body.insertBefore(span, cursor);
            const chunkSize = Math.max(1, Math.round(12 / Math.max(msPerChar, 1)));
            let i = 0;
            while (i < text.length) {
                if (stopFlag) return;
                const end = Math.min(i + chunkSize, text.length);
                span.appendChild(document.createTextNode(text.slice(i, end)));
                i = end;
                scrollBottom();
                await sleep(msPerChar);
            }
        }

        async function runStep(step) {
            if (!step) return;
            await waitWhileHidden();

            if (step.clear) {
                Array.from(body.childNodes).forEach(n => {
                    if (n !== cursor) body.removeChild(n);
                });
                return;
            }
            if (typeof step.wait === 'number') {
                await sleep(step.wait);
                return;
            }
            if (step.prompt != null && step.type != null) {
                if (step.prompt) writeText(step.prompt, 'prompt');
                const cpm = step.cpm || DEFAULT_CPM;
                await typeChars(step.type, 60000 / cpm, 'cmd');
                writeText('\n');
                return;
            }
            if (step.ask != null) {
                if (step.prompt) writeText(step.prompt, 'prompt');
                writeText(step.ask, 'plain');
                await sleep(step.answerDelay || 900);
                const cpm = step.cpm || (DEFAULT_CPM * 0.75);
                await typeChars(step.answer || '', 60000 / cpm, 'cmd');
                writeText('\n');
                if (step.branch) {
                    const followUp = step.branch[step.answer];
                    if (followUp) await loadAndInline(followUp);
                }
                return;
            }
            if (step.out != null) {
                const msPerChar = (typeof step.speed === 'number') ? step.speed : DEFAULT_OUT_SPEED;
                const text = step.out + (step.out.endsWith('\n') ? '' : '\n');
                if (msPerChar <= 0) writeText(text, step.class);
                else await streamOut(text, msPerChar, step.class);
            }
        }

        async function loadAndInline(name) {
            const baseURL = scriptURL.replace(/[^/]+$/, '');
            try {
                const res = await fetch(baseURL + name + '.json', { cache: 'no-store' });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                const subSteps = await res.json();
                for (const s of subSteps) {
                    if (stopFlag) return;
                    await runStep(s);
                }
            } catch (e) {
                console.warn('[owl-term] branch load failed:', name, e);
                writeText('[demo] (branch "' + name + '" unavailable — skipping)\n', 'muted');
            }
        }

        async function run() {
            if (running) return;
            running = true;
            stopFlag = false;
            if (!timeline) {
                try {
                    const res = await fetch(scriptURL, { cache: 'no-store' });
                    timeline = await res.json();
                } catch (e) {
                    console.error('[owl-term] failed to load timeline', scriptURL, e);
                    writeText('[demo] failed to load ' + scriptURL + '\n', 'err');
                    running = false;
                    return;
                }
            }

            poster.hidden = true;
            cursor.classList.add('owl-term-cursor-blink');

            for (const step of timeline) {
                if (stopFlag) break;
                await runStep(step);
            }

            cursor.classList.remove('owl-term-cursor-blink');
            replay.hidden = false;
            running = false;
        }

        function reset() {
            stopFlag = true;
            Array.from(body.childNodes).forEach(n => {
                if (n !== cursor) body.removeChild(n);
            });
            replay.hidden = true;
            poster.hidden = true;
            setTimeout(run, 30);
        }

        function copyCommands() {
            const done = () => {
                copiedChip.hidden = false;
                setTimeout(() => { copiedChip.hidden = true; }, 1500);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(COPY_COMMANDS).then(done).catch(fallback);
            } else {
                fallback();
            }

            function fallback() {
                const ta = document.createElement('textarea');
                ta.value = COPY_COMMANDS;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand('copy'); done(); }
                catch (e) { console.warn('[owl-term] clipboard fallback failed', e); }
                document.body.removeChild(ta);
            }
        }

        playBtn.addEventListener('click', run);
        replay.addEventListener('click', reset);
        copy.addEventListener('click', copyCommands);
    }

    function hydrateAll() {
        document.querySelectorAll('.owl-term:not(.owl-term-hydrated)').forEach(hydrate);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hydrateAll);
    } else {
        hydrateAll();
    }
})();
