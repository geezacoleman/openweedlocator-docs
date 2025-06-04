# OpenWeedLocator Documentation

[![Documentation Status](https://readthedocs.org/projects/openweedlocator/badge/?version=latest)](https://docs.openweedlocator.org/en/latest/?badge=latest)
[![Build Docs](https://github.com/geezacoleman/openweedlocator-docs/actions/workflows/build-docs.yml/badge.svg)](https://github.com/geezacoleman/openweedlocator-docs/actions/workflows/build-docs.yml)

This repository contains the documentation for the [OpenWeedLocator (OWL)](https://github.com/geezacoleman/OpenWeedLocator) project - an open-source hardware and software weed detector.

## 📖 Read the Documentation

The documentation is hosted at: **[docs.openweedlocator.org](https://docs.openweedlocator.org)**

## 🚀 Building Locally

To build the documentation locally:

```bash
# Clone this repository
git clone https://github.com/geezacoleman/openweedlocator-docs.git
cd openweedlocator-docs

# Install dependencies
pip install -r requirements.txt

# Build the documentation
cd docs
sphinx-build -b html . _build/html

# Serve locally
python -m http.server 8000 -d _build/html
```

Then open http://localhost:8000 in your browser.

## ✍️ Contributing

We welcome contributions! See the documentation for contribution guidelines.

## 🛠️ Technical Details

- **Built with**: [Sphinx](https://www.sphinx-doc.org/) + [MyST Parser](https://myst-parser.readthedocs.io/)
- **Theme**: [Furo](https://pradyunsg.me/furo/)
- **Hosted on**: [Read the Docs](https://readthedocs.org/)

## 📝 License

This documentation is licensed under the same [MIT License](https://github.com/geezacoleman/OpenWeedLocator/blob/main/LICENSE) as the main OpenWeedLocator project.

---

**Main Project**: [OpenWeedLocator](https://github.com/geezacoleman/OpenWeedLocator)  
**Documentation**: [docs.openweedlocator.org](https://docs.openweedlocator.org)  
**Community**: [GitHub Discussions](https://github.com/geezacoleman/OpenWeedLocator/discussions)
