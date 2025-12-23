# Getting Started

Welcome to the OpenWeedLocator (OWL) software setup guide. This section will help you get your OWL system running using
our ready-made setup scripts, once you've completed the hardware build.

Alternatively, if you're interested in just exploring the software, you can install this on Raspberry Pi with a camera attached.

```{admonition} Prerequisites
:class: tip

Before proceeding, ensure you have:
- A fully assembled OWL unit ([Original OWL](../hardware/original-owl.md) or [Compact OWL](../hardware/compact-owl.md))
- A Raspberry Pi with a fresh installation of **Raspberry Pi OS (64-bit)**
- A connected Raspberry Pi camera module (we currently support USB or Raspberry Pi cameras)
- SSH access or a connected monitor/keyboard
```
```{admonition} Connect a USB Drive
:class: important

The OWL software requires that you connect a USB drive to the Raspberry Pi for data collection. The software will not 
start without one connected. 

We recommend the Sandisk Fit or Samsung drives that will fit within the Compact enclosure.
```

## Choose Your Setup Path

The OWL system supports several deployment configurations. Choose based on your needs:

::::{grid} 1 1 3 3
:gutter: 3

:::{grid-item-card} 🦉 Basic OWL
:class-card: sd-border-secondary

**Simplest setup, but no remote access**

This is the original, basic setup with no remote control over a network. It can be setup to work with the 'Advanced/Ute Controllers'
that provide simple management options. Configuration changes need a connected monitor/keyboard or via SSH. 
No dashboard provided.

**Best for:**
- Quick testing
- Minimal resource usage
- Headless operation
- Small setups without need for oversight

[Setup Guide →](owl-setup.md#basic-owl-no-dashboard)
:::

:::{grid-item-card} 📡 Standalone OWL
:class-card: sd-border-primary

**Self-contained with WiFi hotspot**

Creates its own WiFi network with a local dashboard. Connect directly from your phone or tablet.

**Best for:**
- Single or few OWL deployments (consider a networked system for > 4 OWL setups)
- Field operations
- Data collection
- Visualising detection performance and camera FOV
- No existing network infrastructure

[Setup Guide →](owl-setup.md#standalone-owl-with-dashboard)
:::

:::{grid-item-card} 🌐 Networked OWL
:class-card: sd-border-success

**Connects to existing network**

Joins your WiFi network and connects to an MQTT broker. Can be used with or without a dedicated networked controller.

**Best for:**
- Larger OWL setups with need for fleet-style management and error reporting
- More fine-detailed control
- Farm network integration

**Requires:**
1. Networked controller 
2. Dedicated network for the system

[Setup Guide →](networked-setup.md)
:::
::::

```{admonition} What should I choose?
:class: tip

- **Just want to try it out?** → Basic OWL
- **Single unit in the field?** → Standalone OWL  
- **Multiple OWLs** → Networked OWL + Controller
```

## Configuration Comparison

| Feature | Basic | Standalone | Networked |
|---------|-------|------------|-----------|
| Weed detection | ✅ | ✅ | ✅ |
| Auto-start on boot | ✅ | ✅ | ✅ |
| WiFi hotspot | ❌ | ✅ | ❌ |
| Web dashboard | ❌ | ✅ | ✅ |
| Remote video feed | ❌ | ✅ | ✅ |
| MQTT communication | ❌ | ✅ (local) | ✅ (remote) |
| Multi-OWL support | ❌ | ❌ | ✅ |
| Requires network | ❌ | ❌ | ✅ |
| Phone/tablet control | ❌ | ✅ | ✅ |

---

## What's Next?

After completing your chosen setup path:

```{admonition} Ready to Deploy?
:class: success

**Recommended next steps:**
1. [Configure detection settings](../software/configuration.md) for your target weeds
2. [Learn about detection algorithms](../software/algorithms.md) and when to use each
3. [Mount your OWL](../usage/mounting.md) on your vehicle or platform
4. [Test in the field](../usage/field-testing.md) with real vegetation
```

## Need Help?

```{admonition} Support Resources
:class: tip

- 📖 **Detailed Guides**: Explore our [software](../software/index.md) and [hardware](../hardware/index.md) documentation
- 💬 **Community**: Ask questions on the [OpenWeedLocator Community](https://community.openweedlocator.org)
- 🐛 **Issues**: Report bugs on [GitHub Issues](https://github.com/geezacoleman/OpenWeedLocator/issues)
- 📺 **Video**: Watch the [installation walkthrough](https://www.youtube.com/watch?v=lH5b8tXYmDw) on YouTube
```

```{toctree}
:hidden:
:maxdepth: 2

owl-setup
networked-setup
```