"""
Build self-contained dashboard demos for the OWL docs.

Copies the networked and standalone controller UIs into
`readthedocs/docs/_static/demos/{networked,standalone}/`, rewriting
Flask/Jinja asset paths to plain relative ones and injecting a stubs.js
that intercepts fetch() calls so the UI renders with fake data.

Run manually after dashboard changes:

    python readthedocs/scripts/build_demos.py

Then `make html` inside readthedocs/ to rebuild docs.
"""

from __future__ import annotations

import re
import shutil
import sys
from pathlib import Path

# ---------------------------------------------------------------------------
# Paths — resolved relative to this script so it works from any CWD.
# ---------------------------------------------------------------------------
SCRIPT_DIR = Path(__file__).resolve().parent
DOCS_ROOT = SCRIPT_DIR.parent                             # readthedocs/
REPO_ROOT = DOCS_ROOT.parent                              # OpenWeedLocator/
DEMOS_ROOT = DOCS_ROOT / 'docs' / '_static' / 'demos'

CONTROLLERS = {
    'networked':  REPO_ROOT / 'controller' / 'networked',
    'standalone': REPO_ROOT / 'controller' / 'standalone',
}
SHARED_DIR = REPO_ROOT / 'controller' / 'shared'

# Assets under each demo tree — copied verbatim from the controller static dir.
STATIC_SUBDIRS = ['css', 'js', 'lib']

# ---------------------------------------------------------------------------
# Jinja/Flask path rewrites
# ---------------------------------------------------------------------------
URL_FOR_RE = re.compile(
    r"""\{\{\s*url_for\(\s*['"]static['"]\s*,\s*filename\s*=\s*['"]([^'"]+)['"]\s*\)\s*\}\}"""
)
SHARED_PATH_RE = re.compile(r'(["\'])/shared/')

# In the source tree, controller/*/static/css/style.css uses
# '../../../shared/css/foo.css' to reach controller/shared/css/. In the demo
# tree, shared/ is a direct sibling of css/, so the correct path is
# '../shared/css/foo.css'.
CSS_SHARED_IMPORT_RE = re.compile(r"(@import\s+['\"])\.\./\.\./\.\./shared/")


def rewrite_index_html(html: str) -> str:
    """Convert Flask/Jinja asset refs to plain relative paths.

    - {{ url_for('static', filename='X') }}  ->  X
    - "/shared/...                           ->  "shared/...
    """
    html = URL_FOR_RE.sub(lambda m: m.group(1), html)
    html = SHARED_PATH_RE.sub(r'\1shared/', html)
    return html


def rewrite_css_imports(path: Path) -> None:
    """Fix @import paths inside the copied style.css so they resolve in the
    demo tree. Source uses ../../../shared/; demo needs ../shared/.
    """
    if not path.is_file():
        return
    text = path.read_text(encoding='utf-8')
    new_text = CSS_SHARED_IMPORT_RE.sub(r'\1../shared/', text)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')


def inject_demo_scaffolding(html: str) -> str:
    """Inject the stubs + demo badge + mock runtime.

    `stubs.js` MUST load before any real module (so fetch/MQTT are already
    intercepted when the real modules wire their event handlers).
    `mock_runtime.js` loads last so it can drive the UI after everything
    else has initialised.
    """
    # Inject the demo flag + stubs before closing </head>
    head_injection = (
        '    <script>window.OWL_DEMO = true;</script>\n'
        '    <script src="mock_data.js"></script>\n'
        '    <script src="stubs.js"></script>\n'
        '</head>'
    )
    html = html.replace('</head>', head_injection, 1)

    # Inject the mock runtime before closing </body>
    body_injection = (
        '<script src="mock_runtime.js"></script>\n'
        '</body>'
    )
    html = html.replace('</body>', body_injection, 1)
    return html


def copy_tree(src: Path, dst: Path) -> None:
    """Copy src/ into dst/, removing dst first. No-op if src is missing."""
    if not src.is_dir():
        return
    if dst.exists():
        shutil.rmtree(dst)
    shutil.copytree(src, dst)


def build_one(variant: str, controller_dir: Path) -> None:
    """Build a single demo variant (networked or standalone)."""
    print(f"[{variant}] building...")
    dest = DEMOS_ROOT / variant
    if dest.exists():
        shutil.rmtree(dest)
    dest.mkdir(parents=True, exist_ok=True)

    static_src = controller_dir / 'static'
    for sub in STATIC_SUBDIRS:
        copy_tree(static_src / sub, dest / sub)
        if (dest / sub).exists():
            print(f"  + {sub}/  (from controller/{variant}/static/{sub}/)")

    # Fix the top-level style.css @import paths so shared/ resolves.
    rewrite_css_imports(dest / 'css' / 'style.css')

    # Shared CSS/JS (served at /shared/ at runtime, rewritten to shared/ here)
    shared_dst = dest / 'shared'
    shared_dst.mkdir(exist_ok=True)
    for sub in ('css', 'js'):
        src = SHARED_DIR / sub
        if src.is_dir():
            copy_tree(src, shared_dst / sub)
            print(f"  + shared/{sub}/")

    # Main template -> index.html (with rewrites and injections)
    tpl = controller_dir / 'templates' / 'index.html'
    html = tpl.read_text(encoding='utf-8')
    html = rewrite_index_html(html)
    html = inject_demo_scaffolding(html)
    (dest / 'index.html').write_text(html, encoding='utf-8')
    print(f"  + index.html  (rewritten from controller/{variant}/templates/index.html)")


def copy_shared_demo_assets() -> None:
    """Copy mock/stub/runtime + placeholder assets into each variant.

    These files live in `readthedocs/scripts/demo_assets/` and are duplicated
    into every variant's output so each demo is independently loadable at its
    own URL.
    """
    src_assets = SCRIPT_DIR / 'demo_assets'
    if not src_assets.is_dir():
        print(f"[WARN] demo_assets/ not found at {src_assets} — skipping")
        return

    for variant in CONTROLLERS:
        dest = DEMOS_ROOT / variant
        for item in src_assets.iterdir():
            if item.is_file():
                shutil.copy2(item, dest / item.name)
            elif item.is_dir():
                copy_tree(item, dest / item.name)
        print(f"[{variant}] + demo_assets/* (mock runtime + placeholders)")


def main() -> int:
    if not REPO_ROOT.is_dir():
        print(f"[ERROR] OWL repo root not found at {REPO_ROOT}", file=sys.stderr)
        return 1

    DEMOS_ROOT.mkdir(parents=True, exist_ok=True)

    for variant, controller_dir in CONTROLLERS.items():
        if not controller_dir.is_dir():
            print(f"[WARN] {variant}: source dir missing ({controller_dir}) — skipping")
            continue
        build_one(variant, controller_dir)

    copy_shared_demo_assets()

    print()
    print("Done. Demos written to:")
    print(f"  {DEMOS_ROOT}")
    print()
    print("Next:  cd readthedocs && make html  (or sphinx-build -b html docs docs/_build/html)")
    return 0


if __name__ == '__main__':
    sys.exit(main())
