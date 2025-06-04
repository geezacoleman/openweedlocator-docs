# Configuration file for the Sphinx documentation builder.
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

import os
import sys
from datetime import datetime

# -- Path setup --------------------------------------------------------------
# If extensions (or modules to document) are in another directory,
# add these directories to sys.path here.
sys.path.insert(0, os.path.abspath('.'))

# -- Project information -----------------------------------------------------
project = 'OpenWeedLocator'
author = 'Guy Coleman'
copyright = f'{datetime.now().year}, {author}'
release = '2.0.0'
version = '2.0'

# -- General configuration ---------------------------------------------------
extensions = [
    'myst_parser',                    # Markdown support
    'sphinx.ext.autodoc',             # Auto-generate docs from docstrings
    'sphinx.ext.viewcode',            # Add source code links
    'sphinx.ext.napoleon',            # Google/NumPy docstring support
    'sphinx.ext.intersphinx',         # Link to other documentation
    'sphinx.ext.autosectionlabel',    # Auto-generate section labels
    'sphinx_copybutton',              # Copy button for code blocks
    'sphinx_tabs',                    # Tabbed content
    'sphinx_design',                  # Modern UI components
]

# MyST Parser configuration
myst_enable_extensions = [
    'colon_fence',      # ::: for admonitions
    'deflist',          # Definition lists
    'fieldlist',        # Field lists
    'html_admonition',  # HTML-style admonitions
    'html_image',       # HTML images with attributes
    'linkify',          # Auto-link URLs
    'replacements',     # Text replacements
    'smartquotes',      # Smart quotes
    'strikethrough',    # ~~strikethrough~~
    'substitution',     # Variable substitution
    'tasklist',         # - [ ] task lists
]

# Add numbering to headings
myst_heading_anchors = 3

# Auto-generate labels for sections
autosectionlabel_prefix_document = True

# Templates path
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
exclude_patterns = [
    '_build',
    'Thumbs.db',
    '.DS_Store',
    '.github',
    'requirements.txt',
    'README.md',
]

# -- Options for HTML output -------------------------------------------------
html_theme = 'furo'
html_title = 'OpenWeedLocator Documentation'
html_short_title = 'OWL Docs'

# Theme options
html_theme_options = {
    'sidebar_hide_name': False,
    # Comment out logos until you add them
    # 'light_logo': 'images/owl-logo-light.png',
    # 'dark_logo': 'images/owl-logo-dark.png',
    'light_css_variables': {
        'color-brand-primary': '#2E7D32',
        'color-brand-content': '#1B5E20',
    },
    'dark_css_variables': {
        'color-brand-primary': '#4CAF50',
        'color-brand-content': '#81C784',
    },
    'footer_icons': [
        {
            'name': 'GitHub',
            'url': 'https://github.com/geezacoleman/OpenWeedLocator',
            'html': '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>',
        },
    ],
}

# Static files (CSS, JavaScript, images)
html_static_path = ['_static']
html_css_files = ['css/custom.css']

# Custom sidebar
html_sidebars = {
    '**': [
        'sidebar/scroll-start.html',
        'sidebar/brand.html',
        'sidebar/search.html',
        'sidebar/navigation.html',
        'sidebar/ethical-ads.html',
        'sidebar/scroll-end.html',
    ]
}

# -- Options for LaTeX output ------------------------------------------------
latex_engine = 'pdflatex'
latex_elements = {
    'papersize': 'a4paper',
    'pointsize': '10pt',
    'fncychap': '\\usepackage[Bjornstrup]{fncychap}',
    'preamble': r'''
        \usepackage{svg}
        \usepackage{graphicx}
    ''',
}

# LaTeX document info
latex_documents = [
    ('index', 'OpenWeedLocator.tex', 'OpenWeedLocator Documentation',
     author, 'manual'),
]

# -- Options for EPUB output -------------------------------------------------
epub_title = project
epub_author = author
epub_publisher = author
epub_copyright = copyright

# -- Extension configuration -------------------------------------------------

# Intersphinx mapping
intersphinx_mapping = {
    'python': ('https://docs.python.org/3', None),
    'numpy': ('https://numpy.org/doc/stable/', None),
    'matplotlib': ('https://matplotlib.org/stable/', None),
}

# Napoleon settings
napoleon_google_docstring = True
napoleon_numpy_docstring = True
napoleon_include_init_with_doc = False
napoleon_include_private_with_doc = False

# Autodoc settings
autodoc_default_options = {
    'members': True,
    'member-order': 'bysource',
    'special-members': '__init__',
    'undoc-members': True,
    'exclude-members': '__weakref__'
}

# Copy button configuration
copybutton_prompt_text = r">>> |\.\.\. |\$ |In \[\d*\]: | {2,5}\.\.\.: | {5,8}: "
copybutton_prompt_is_regexp = True
copybutton_remove_prompts = True
