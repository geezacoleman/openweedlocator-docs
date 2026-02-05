# Getting Started

Welcome! Here's how to get your OWL up and running.

```{admonition} Connect a USB Drive
:class: important

The OWL software requires that you connect a USB drive to the Raspberry Pi for data collection. The software will not
start without one connected.

We recommend the Sandisk Fit or Samsung drives that will fit within the Compact enclosure.
```

## What do I need?

::::{grid} 1 1 2 2
:gutter: 3

:::{grid-item-card} Need hardware?
:link: ../hardware/index
:link-type: doc

View the full parts lists and assembly guides for the Original OWL and Compact OWL. The Paradar driver board is available from the [Paradar store](https://paradar.co.uk/collections/openweedlocator).
:::

:::{grid-item-card} Already have parts?
:link: ../hardware/original-owl/index
:link-type: doc

Jump straight to the assembly guides for the [Original OWL](../hardware/original-owl/index.md) or [Compact OWL](../hardware/compact-owl/index.md).
:::
::::

## How do I install the software?

Once your hardware is assembled with a Raspberry Pi and camera connected:

::::{grid} 1 1 2 2
:gutter: 3

:::{grid-item-card} Two-Step Install (Recommended)
:link: ../software/two-step-install
:link-type: doc

Automated setup — download the repo and run the installer. Up and running in **~10 minutes**.
:::

:::{grid-item-card} Detailed Install
:link: ../software/detailed-install
:link-type: doc

Step-by-step manual installation. Learn what happens under the hood (**~60 minutes**).
:::
::::

```{admonition} Prerequisites
:class: tip

Before installing, ensure you have:
- A fully assembled OWL unit ([Original OWL](../hardware/original-owl/index.md) or [Compact OWL](../hardware/compact-owl/index.md))
- A Raspberry Pi with a fresh installation of **Raspberry Pi OS (64-bit)**
- A connected Raspberry Pi camera module (USB or Raspberry Pi cameras supported)
- SSH access or a connected monitor/keyboard
```

## What about the dashboard and remote control?

After installation, you can set up a dashboard for remote monitoring and control:

| Mode | Description | Best For |
|------|-------------|----------|
| **Standalone** | OWL creates its own WiFi hotspot with local dashboard | Single OWL, field use, no network infrastructure |
| **Networked** | OWL joins existing WiFi with remote MQTT broker | Multiple OWLs, farm network integration |

::::{grid} 1 1 2 2
:gutter: 3

:::{grid-item-card} Standalone Setup
:link: ../controllers/wireless/standalone
:link-type: doc

Single OWL with its own WiFi hotspot. Connect from your phone or tablet.
:::

:::{grid-item-card} Networked Setup
:link: ../controllers/wireless/networked
:link-type: doc

Multiple OWLs on an existing network with optional central controller.
:::
::::

```{admonition} What should I choose?
:class: tip

- **Just want to try it out?** → Install software only (Basic OWL, no dashboard)
- **Single unit in the field?** → Standalone OWL
- **Multiple OWLs?** → Networked OWL + Controller
```

## Configuration Comparison

| Feature | Basic | Standalone | Networked |
|---------|-------|------------|-----------|
| Weed detection | Yes | Yes | Yes |
| Auto-start on boot | Yes | Yes | Yes |
| WiFi hotspot | No | Yes | No |
| Web dashboard | No | Yes | Yes |
| Remote video feed | No | Yes | Yes |
| MQTT communication | No | Yes (local) | Yes (remote) |
| Multi-OWL support | No | No | Yes |
| Requires network | No | No | Yes |
| Phone/tablet control | No | Yes | Yes |

## Need a tutorial?

- [Watch the installation walkthrough](https://www.youtube.com/watch?v=lH5b8tXYmDw) on YouTube (Feb 2025)

## Need help?

- [Troubleshooting Guide](../troubleshooting/index.md) - Common issues and solutions
- [OpenWeedLocator Community](https://community.openweedlocator.org) - Ask questions and share ideas
- [GitHub Issues](https://github.com/geezacoleman/OpenWeedLocator/issues) - Report bugs
