# Software

```{toctree}
:maxdepth: 1
:caption: Software
:titlesonly:
:hidden:

two-step-install
detailed-install
configuration/index
green-on-green/index
development/index
```

Installing the OWL software is straightforward and can be automated for a simple, two-step install. Alternatively, you can take the step-by-step alternative to see what is happening under the hood.

Both begin by flashing the latest Raspbian operating system to an SD card and booting up a Raspberry Pi.

## Installation Options

| Method | Time | Best For |
|--------|------|----------|
| Two-Step Install | ~10 mins | Quick setup, production use |
| Detailed Install | ~60 mins | Learning, customisation, troubleshooting |

## Supported Platforms

The project supports the following Raspberry Pi models:

- **Raspberry Pi 5** - Full support
- **Raspberry Pi 4B** - Full support
- **Raspberry Pi 3B+** - Full support

```{admonition} Important Software Changes
:class: warning

**08/05/2024** - OWL transitioned from `picamera` to `picamera2` support. The v1.0.0 disk image (Buster) does not support `picamera2` and will not work on the Raspberry Pi 5 nor with recent camera releases. We strongly recommend using the most up to date version of Raspbian with the latest OWL software.

**17/03/2023** - Running of the OWL changed from using `greenonbrown.py` to `owl.py`. This ensures better cross compatibility with GoG algorithms and improves the modularity of the system.
```

## Quick Navigation

::::{grid} 1 1 2 2
:gutter: 3

:::{grid-item-card} Two-Step Install
:link: two-step-install
:link-type: doc

Automated setup — download the repo and run the installer. Up and running in ~10 minutes.
:::

:::{grid-item-card} Detailed Install
:link: detailed-install
:link-type: doc

Step-by-step manual installation. Learn what happens under the hood (~60 minutes).
:::

:::{grid-item-card} Configuration
:link: configuration/index
:link-type: doc

Adjust detection sensitivity, relay timing, and other parameters.
:::

:::{grid-item-card} Green-on-Green
:link: green-on-green/index
:link-type: doc

Experimental in-crop weed detection using deep learning.
:::

:::{grid-item-card} Development Setup
:link: development/index
:link-type: doc

Run OWL software on your laptop/desktop for testing and development.
:::
::::
