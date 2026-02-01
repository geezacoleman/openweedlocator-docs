# Controllers

```{toctree}
:maxdepth: 1
:caption: Controller Options
:titlesonly:
:hidden:

wired/index
wireless/index
```

Controllers allow you to manage OWL operation from a central location. The OWL supports multiple control methods that can be used independently or combined.

## Quick Navigation

::::{grid} 1 1 3 3
:gutter: 3

:::{grid-item-card} No Controller

Run OWL autonomously with no external control. Simplest setup.

[Learn more →](#no-controller)
:::

:::{grid-item-card} Wired Controllers
:link: wired/index
:link-type: doc

GPIO-based hardware controllers (Ute Controller, Advanced Controller) for physical switch control.
:::

:::{grid-item-card} Wireless Controllers
:link: wireless/index
:link-type: doc

Network-based control via WiFi dashboard and MQTT. Standalone or networked modes.
:::
::::

---

(no-controller)=
## No Controller

The OWL can operate completely autonomously without any controller. In this mode:

- OWL starts automatically on boot
- Detects weeds and activates relays based on `config.ini` settings
- No remote monitoring or control
- Configuration changes require SSH access or direct connection

**Best for:**
- Simple deployments
- Single OWL systems
- Situations where remote control is not needed

**Configuration:**
```ini
[Controller]
controller_type = None
```

---

## Wired Controllers

Physical hardware controllers connected via GPIO pins. Provide tactile switches for:
- Toggling detection on/off
- Switching sensitivity presets
- Enabling/disabling recording
- Manual "all nozzles on" override

Two designs available:
- **Ute Controller** - Simple control for single OWL
- **Advanced Controller** - Multi-OWL support (1-4 units)

[View Wired Controller Setup →](wired/index.md)

---

## Wireless Controllers

Network-based control via WiFi and MQTT. Provides:
- Web dashboard for monitoring and control
- Real-time video feed
- Remote configuration
- Multi-device access (phone, tablet, laptop)

Two modes available:
- **Standalone** - OWL creates its own WiFi hotspot with local dashboard
- **Networked** - OWL joins existing network with central MQTT broker

[View Wireless Controller Setup →](wireless/index.md)

---

## Combining Controllers

Wired and wireless controllers can be used together. When combined:

```{important}
**Hardware takes precedence over wireless controls.**

Physical switch inputs from wired controllers override any wireless/dashboard commands. This ensures reliable field operation even if network connectivity is lost.
```

**Example combinations:**

| Wired | Wireless | Use Case |
|-------|----------|----------|
| None | Standalone | Phone/tablet control via OWL hotspot |
| Ute | Standalone | Physical switches + dashboard monitoring |
| Advanced | Networked | Multi-OWL fleet with central dashboard and physical overrides |

---

## Choosing a Controller

| Requirement | Recommended |
|-------------|-------------|
| Simplest setup, no control needed | No Controller |
| Single OWL, physical switches | Ute Controller |
| Single OWL, phone/tablet control | Standalone Wireless |
| Multiple OWLs, physical switches | Advanced Controller |
| Multiple OWLs, central monitoring | Networked Wireless |
| Maximum control + reliability | Wired + Wireless combined |

---

## Next Steps

- [Wired Controller Setup](wired/index.md) - Build Ute or Advanced Controller
- [Wireless Controller Setup](wireless/index.md) - Configure Standalone or Networked mode
- [Configuration Guide](../software/configuration/index.md) - Controller config parameters

