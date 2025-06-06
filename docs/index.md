
# OpenWeedLocator Documentation

```{toctree}
:maxdepth: 2
:caption: Documentation

getting-started/index
hardware/index
software/index
api/index
```

Welcome to the **OpenWeedLocator (OWL)** project documentation! OWL is an open-source hardware and software weed detector that uses entirely off-the-shelf components, simple green-detection algorithms, and 3D printable parts for low-cost, site-specific weed control.

::::{grid} 1 2 2 2
:gutter: 3

:::{grid-item-card} 🚀 Quick Start
:link: getting-started/index.html

Get OWL up and running in under 30 minutes with our streamlined installation guide.
:::

:::{grid-item-card} 🔧 Hardware Assembly
:link: hardware/index.html

Complete guides for building both Original and Compact OWL systems with detailed parts lists.
:::

:::{grid-item-card} 💻 Software Setup
:link: software/index.html

Installation, configuration, and advanced setup options for Raspberry Pi and desktop systems.
:::

:::{grid-item-card} 📖 Usage & Applications
:link: hardware/index.html

Learn about mounting OWL on vehicles, robots, and other platforms for various weed control applications.
:::
::::


## What is OpenWeedLocator?

OpenWeedLocator (OWL) integrates weed detection on a Raspberry Pi with relay control boards in a custom designed case. You can attach any 12V solenoid, relay, lightbulb, or device for **low-cost, simple, and open-source site-specific weed control**.

Projects to date have seen OWL mounted on:
- ✅ Vehicles for spot spraying
- ✅ Agricultural robots 
- ✅ Bicycles for small-scale applications
- ✅ Data collection platforms

## Key Features

::::{grid} 1 1 2 2
:gutter: 2

:::{grid-item-card} 🌱 Green Detection
Real-time weed detection using computer vision algorithms including ExG, HSV, and machine learning approaches.
:::

:::{grid-item-card} 🏗️ Open Hardware
Complete 3D printable enclosures and open hardware designs with detailed assembly instructions.
:::

:::{grid-item-card} 🔬 Research Validated
Published in Scientific Reports with field-tested performance data at speeds up to 30 km/h.
:::

:::{grid-item-card} 🤝 Community Driven
Active community of researchers, farmers, and developers continuously improving the platform.
:::
::::

## Latest Updates

```{admonition} February 2025 - Complete Installation Guide
:class: tip

🎥 **New Video Guide Available!** 
A complete OWL software installation guide is now available on YouTube, making setup easier than ever.
[Watch the tutorial →](https://www.youtube.com/watch?v=lH5b8tXYmDw&t=62s)
```

```{admonition} OpenSourceAg Newsletter
:class: note

📧 **Stay Updated!** 
Follow OWL updates through the new [OpenSourceAg Newsletter](https://openagtech.beehiiv.com/) - a new edition every two weeks.
```

## Getting Started

Ready to build your own OWL? Choose your path:

::::{grid} 1 1 3 3
:gutter: 2

:::{grid-item-card} ⚡ Two-Line Install
:link: https://github.com/geezacoleman/OpenWeedLocator#quick-method

```bash
git clone https://github.com/geezacoleman/OpenWeedLocator owl
bash owl/owl_setup.sh
```
:::

:::{grid-item-card} 📋 Hardware First
:link: https://github.com/geezacoleman/OpenWeedLocator#hardware-requirements

Start with our comprehensive parts lists and assembly guides for both OWL variants.
:::

:::{grid-item-card} 💡 Learn More
:link: https://github.com/geezacoleman/OpenWeedLocator#owl-use-cases

Explore different applications and see how others are using OWL in the field.
:::
::::

## Support & Community

```{admonition} Need Help?
:class: important

- 💬 **GitHub Discussions**: [Ask questions and share ideas](https://github.com/geezacoleman/OpenWeedLocator/discussions)
- 🐛 **Bug Reports**: [Report issues on GitHub](https://github.com/geezacoleman/OpenWeedLocator/issues)
- 🤝 **Contributing**: See our [contributing guidelines](https://github.com/geezacoleman/OpenWeedLocator/blob/main/CONTRIBUTING.md)
```

## Citation

If you use OWL in your research, please cite our paper:

```{code-block} bibtex
@article{Coleman2022,
  author = {Coleman, Guy and Salter, William and Walsh, Michael},
  doi = {10.1038/s41598-021-03858-9},
  journal = {Scientific Reports},
  number = {1},
  pages = {170},
  title = {{OpenWeedLocator (OWL): an open-source, low-cost device for fallow weed detection}},
  volume = {12},
  year = {2022}
}
```

---

**🚧 Documentation In Progress**

This documentation site is currently being built. For now, please refer to the comprehensive [main repository README](https://github.com/geezacoleman/OpenWeedLocator) for complete installation and usage instructions.

More sections will be added soon:
- 📖 Detailed installation guides
- 🔧 Hardware assembly tutorials  
- ⚙️ Configuration references
- 🔍 Troubleshooting guides
- 🤖 API documentation