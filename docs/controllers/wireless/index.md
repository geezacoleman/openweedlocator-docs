# Wireless Controllers

Network-based control via WiFi and MQTT provides remote monitoring and control of your OWL system from any device with a web browser.

## Modes

| Mode | Description | Best For |
|------|-------------|----------|
| **Standalone** | OWL creates WiFi hotspot with local dashboard | Single OWL, field use, no network infrastructure |
| **Networked** | OWL joins existing WiFi with remote MQTT broker | Multiple OWLs, farm network integration |

---

## Standalone Mode

The OWL creates its own WiFi access point. Connect your phone, tablet, or laptop directly to control and monitor the OWL.

**Features:**
- WiFi hotspot (e.g., "OWL-1")
- Local MQTT broker
- Full web dashboard
- Video feed
- Detection controls

**Access:**

| Method | Address |
|--------|---------|
| WiFi Network | Connect to "OWL-1" (or your configured SSID) |
| Dashboard | https://owl-1.local/ or https://10.42.0.1/ |
| Video Feed | https://owl-1.local/video_feed |

**Setup:**

Standalone mode is configured during OWL software installation:

```bash
bash owl_setup.sh
```

When prompted, select:
1. **Yes** to dashboard setup
2. **Option 1** (Standalone)

See [OWL Setup Guide](../../getting-started/owl-setup.md) for complete instructions.

---

## Networked Mode

The OWL joins your existing WiFi network and connects to a central MQTT broker. Multiple OWLs can be monitored from any device on the network.

**Features:**
- Integration with existing WiFi
- Central MQTT communication
- Video feed accessible from any network device
- Multi-OWL coordination

**Access:**

| Method | Address |
|--------|---------|
| Video Feed | https://owl-1.local/video_feed or https://[static-ip]/video_feed |
| SSH | ssh owl@owl-1.local |
| MQTT | Connect to your broker IP on port 1883 |

**Setup:**

Networked mode is configured during OWL software installation:

```bash
bash owl_setup.sh
```

When prompted, select:
1. **Yes** to dashboard setup
2. **Option 2** (Networked)

You'll need:
- WiFi network SSID and password
- Static IP for this OWL
- Gateway IP (usually your router)
- MQTT broker/controller IP

See [Networked Setup Guide](../../getting-started/networked-setup.md) for complete instructions.

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

- [OWL Setup Guide](../../getting-started/owl-setup.md) - Complete software installation
- [Networked Setup Guide](../../getting-started/networked-setup.md) - Multi-OWL network configuration
- [Wired Controllers](../wired/index.md) - Add physical switch control
- [Configuration Guide](../../software/configuration/index.md) - MQTT and controller settings

