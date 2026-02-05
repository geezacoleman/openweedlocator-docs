
# OpenWeedLocator Documentation

```{toctree}
:maxdepth: 2
:caption: Documentation
:hidden:

getting-started/index
hardware/index
software/index
controllers/index
usage/index
troubleshooting/index
reference/index
community/index
```

Welcome to the **OpenWeedLocator (OWL)** project official documentation. 

The OWL is an open-source hardware and software weed detection system that can be built with off-the-shelf components, 
simple green-detection algorithms, and 3D printable parts. It means low-cost, site-specific weed control accessible 
to everyone.

::::{grid} 1 2 2 2
:gutter: 3

:::{grid-item-card} 🔧 Hardware Assembly
:link: hardware/index
:link-type: doc

Complete guides for building both Original and Compact OWL systems with detailed parts lists.
:::

:::{grid-item-card} 🚀 Getting Started
:link: getting-started/index
:link-type: doc

New to OWL? Start here for a roadmap of the full setup process.
:::

:::{grid-item-card} 💻 Software Installation
:link: software/two-step-install
:link-type: doc

Two-step automated install — up and running in ~10 minutes.
:::

:::{grid-item-card} 📡 Dashboard & Wireless
:link: controllers/wireless/index
:link-type: doc

Set up your dashboard for remote monitoring. Standalone hotspot or networked multi-OWL.
:::

:::{grid-item-card} 📖 Usage & Applications
:link: usage/index
:link-type: doc

Learn about mounting OWL on vehicles, robots, and other platforms for various weed control applications.
:::

:::{grid-item-card} 🎛️ Controllers
:link: controllers/index
:link-type: doc

Wired hardware controllers and wireless dashboard options for monitoring and control.
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

:::{grid-item-card} Green Detection
Real-time weed detection using computer vision algorithms including ExG, HSV, and machine learning approaches.
:::

:::{grid-item-card} 🏗Open Hardware
Complete 3D printable enclosures and open hardware designs with detailed assembly instructions.
:::

:::{grid-item-card} Research Validated
Published in Scientific Reports with field-tested detection performance data at speeds up to 30 km/h.
:::

:::{grid-item-card} Community Driven
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

## Support & Community

```{admonition} Need Help?
:class: important

- 💬 **OpenWeedLocator Community**: [Ask questions and share ideas](https://community.openweedlocator.org)
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