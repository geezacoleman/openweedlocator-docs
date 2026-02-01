# Network Setup

```{toctree}
:maxdepth: 1
:caption: Network Configuration
:titlesonly:
:hidden:

standalone/index
networked/index
```

The OWL supports two network operation modes to suit different deployment scenarios.

## Quick Navigation

::::{grid} 1 1 2 2
:gutter: 3

:::{grid-item-card} Standalone Mode
:link: standalone/index
:link-type: doc

Self-contained WiFi hotspot with local MQTT broker and dashboard. Ideal for single OWL deployments.
:::

:::{grid-item-card} Networked Mode
:link: networked/index
:link-type: doc

Connect to existing WiFi network with remote MQTT broker. Ideal for multi-OWL systems with central controller.
:::
::::

---

## Mode Comparison

| Feature | Standalone | Networked |
|---------|------------|-----------|
| WiFi Configuration | Creates hotspot | Joins existing network |
| MQTT Broker | Local (on OWL) | Remote (on controller) |
| Dashboard | Full dashboard | Video feed only |
| Multi-OWL Support | Single OWL | Multiple OWLs |
| Internet Access | No | Yes (via router) |
| Best For | Field use, isolated | Farm network, central monitoring |

---

## Prerequisites

Both modes require:
- Completed OWL hardware build
- OWL software installed
- Raspberry Pi with WiFi capability

### Standalone Mode Requirements
- No additional infrastructure
- Device to connect to OWL hotspot (phone, tablet, laptop)

### Networked Mode Requirements
- Existing WiFi network
- Central controller/MQTT broker (another Pi or server)
- Static IP address planning

---

## Choosing a Mode

**Choose Standalone if:**
- You have a single OWL
- You want simple setup with no network infrastructure
- You need to operate in the field without internet
- You want the full dashboard on your phone/tablet

**Choose Networked if:**
- You have multiple OWLs to coordinate
- You have an existing farm network
- You need central monitoring and control
- You want internet access on the OWL

---

## Next Steps

- [Standalone Setup](standalone/index.md) - Create WiFi hotspot with local dashboard
- [Networked Setup](networked/index.md) - Join existing network with central MQTT

