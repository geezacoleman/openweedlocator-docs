# Wireless Controllers

```{toctree}
:maxdepth: 1
:caption: Wireless Controllers
:titlesonly:
:hidden:

standalone
networked
```

Network-based control via WiFi and MQTT provides remote monitoring and control of your OWL system from any device with a web browser.

## Modes

| Mode | Description | Best For |
|------|-------------|----------|
| **Standalone** | OWL creates WiFi hotspot with local dashboard | Single OWL, field use, no network infrastructure |
| **Networked** | OWL joins existing WiFi with remote MQTT broker | Multiple OWLs, farm network integration |

::::{grid} 1 1 2 2
:gutter: 3

:::{grid-item-card} Standalone Mode
:link: standalone
:link-type: doc

OWL creates its own WiFi hotspot. Connect your phone, tablet, or laptop directly to control and monitor. Includes local MQTT broker and full web dashboard.
:::

:::{grid-item-card} Networked Mode
:link: networked
:link-type: doc

OWL joins your existing WiFi network. Multiple OWLs communicate via a central MQTT broker. Optional dedicated controller with touchscreen.
:::
::::

---

## Combining with Wired Controllers

Wireless control can be used alongside [wired controllers](../wired/index.md).

```{important}
**Hardware takes precedence.**

When both wired and wireless controllers are active, physical switch inputs from wired controllers override wireless/dashboard commands. This ensures reliable operation if network connectivity is lost.
```

### Example: Standalone + Ute Controller

- Ute Controller provides physical toggle switches
- Standalone dashboard provides monitoring and video feed
- If you flip the recording switch OFF on the hardware, the dashboard cannot override it

### Configuration

In `config.ini`, set both controller types:

```ini
[Controller]
controller_type = ute

# Ute controller pins
switch_purpose = recording
switch_pin = 37
```

The wireless dashboard is enabled separately during `owl_setup.sh`.

---

## MQTT Communication

Both standalone and networked modes use MQTT for communication between the OWL and dashboard.

### Topics

| Topic | Purpose |
|-------|---------|
| `owl/{device_id}/status` | OWL status updates (FPS, detections, state) |
| `owl/{device_id}/command` | Commands to OWL (start, stop, config) |
| `owl/{device_id}/detection` | Detection events |

### Testing MQTT

**Standalone mode:**
```bash
# On the OWL
mosquitto_pub -h localhost -t "owl/test" -m "hello"
mosquitto_sub -h localhost -t "owl/#"
```

**Networked mode:**
```bash
# Replace with your broker IP
mosquitto_pub -h 192.168.1.2 -t "owl/test" -m "hello"
mosquitto_sub -h 192.168.1.2 -t "owl/#"
```

---

## OWL Configuration

Enable MQTT in your OWL config file:

**File:** `~/owl/config/DAY_SENSITIVITY_2.ini`

**Standalone:**
```ini
[MQTT]
enable = True
broker_ip = localhost
broker_port = 1883
device_id = owl-1
```

**Networked:**
```ini
[MQTT]
enable = True
broker_ip = 192.168.1.2
broker_port = 1883
device_id = owl-1
```

---

## Troubleshooting

### Cannot connect to WiFi hotspot (Standalone)
```bash
nmcli connection show
sudo systemctl restart NetworkManager
```

### Dashboard not loading
```bash
sudo systemctl status nginx owl-dash
journalctl -u owl-dash -f
```

### MQTT not connecting
```bash
# Check broker is running (standalone only)
sudo systemctl status mosquitto

# Test connection
mosquitto_pub -h localhost -t test -m test
```

---

## Next Steps

- [Standalone Setup](standalone.md) - Complete standalone OWL setup walkthrough
- [Networked Setup](networked.md) - Multi-OWL network configuration
- [Wired Controllers](../wired/index.md) - Add physical switch control
- [Configuration Guide](../../software/configuration/index.md) - MQTT and controller settings
