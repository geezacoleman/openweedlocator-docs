# Networked Setup

This guide covers setting up OWL units that connect to an existing WiFi network rather than creating their own hotspot. This configuration allows multiple OWLs to communicate over a shared network and optionally be managed by a central controller.

## Overview

A networked OWL connects to your existing WiFi infrastructure and communicates via MQTT. This enables:

- Multiple OWLs on the same network
- Integration with existing farm networks
- Central monitoring from any device on the network
- Optional centralised control with a dedicated controller

```{admonition} Networked vs Standalone
:class: note

**Standalone OWL** creates its own WiFi hotspot — you connect directly to the OWL.

**Networked OWL** joins your existing WiFi — the OWL connects to your network.
```

## Architecture Options

### Option A: Networked OWLs Only

Multiple OWLs connect to the same WiFi network and MQTT broker. You can monitor each OWL individually from any device on the network.

```{mermaid}
graph LR
    subgraph "Your Network"
        R[WiFi Router]
        M[MQTT Broker<br/>Any device or cloud]
    end
    
    subgraph "OWL Units"
        O1[OWL-1]
        O2[OWL-2]
    end
    
    subgraph "Monitoring"
        L[Laptop]
        P[Phone]
    end
    
    R --- O1
    R --- O2
    R --- M
    R --- L
    R --- P
    O1 -.->|MQTT| M
    O2 -.->|MQTT| M
```

**Use when:**
- You have an existing MQTT broker
- You want to integrate with other systems
- You prefer distributed monitoring

### Option B: Networked OWLs + Central Controller

A dedicated Raspberry Pi acts as the central hub with MQTT broker and management dashboard. Ideal for commercial operations.

```{mermaid}
graph TB
    subgraph "Tractor Cab"
        C[Controller Pi<br/>with Touchscreen]
    end
    
    subgraph "Spray Boom"
        O1[OWL-1]
        O2[OWL-2]
        O3[OWL-3]
    end
    
    subgraph "Network"
        R[WiFi Router]
    end
    
    C <-->|WiFi| R
    O1 <-->|WiFi| R
    O2 <-->|WiFi| R
    O3 <-->|WiFi| R
    
    style C fill:#4CAF50,color:#fff
```

**Use when:**
- Managing multiple OWLs from one location
- You want a dedicated in-cab touchscreen interface
- No existing MQTT infrastructure

---

## Setting Up Networked OWLs

### Prerequisites

Before starting, you'll need:
- WiFi network name (SSID) and password
- MQTT broker address (IP or hostname)
- Static IP address for each OWL (recommended)
- Gateway IP address

### Step 1: Run Basic OWL Setup

First, complete the standard OWL installation:

```bash
git clone https://github.com/geezacoleman/OpenWeedLocator owl
bash owl/owl_setup.sh
```

### Step 2: Enable Dashboard in Networked Mode

When prompted for dashboard setup, choose **yes**:

```{code-block} text
Do you want to add a web dashboard for remote control? (y/n): y
```

Then select **Networked mode**:

```{code-block} text
[INFO] Select OWL Operation Mode:
  1) Standalone - Create WiFi hotspot with local MQTT broker and dashboard
  2) Networked  - Connect to existing WiFi network with remote MQTT broker

Select mode (1 or 2): 2
```

### Step 3: Configure Network Settings

Enter the network details for this OWL:

```{code-block} text
:caption: Networked OWL configuration

Enter OWL ID number (default: 1): 1
Enter WiFi network name (SSID) to join: FarmNetwork
Enter WiFi network password: ********
Enter static IP for this OWL (e.g., 192.168.1.11): 192.168.1.11
Enter gateway IP (default: 192.168.1.1): 192.168.1.1
Enter central controller IP (MQTT broker; default: 192.168.1.2): 192.168.1.2
```

```{important}
**IP Address Planning:**
- Each OWL needs a unique static IP
- All IPs must be on the same subnet
- The MQTT broker IP can be any device running an MQTT broker
```

### Network Validation

The setup validates your network configuration:

```{code-block} text
[OK] Network OK: OWL 192.168.1.11, Gateway 192.168.1.1, Controller 192.168.1.2 (base 192.168.1.x)
```

If there's a subnet mismatch:

```{code-block} text
[WARN] OWL static IP base (192.168.1.x) differs from Controller base (10.0.0.x).
[WARN] Please re-enter BOTH the OWL static IP and the Controller IP so they share the same subnet.
```

### What Gets Configured

In networked mode, each OWL is configured with:

| Component | Configuration |
|-----------|--------------|
| **WiFi Client** | Connects to specified network with static IP |
| **MQTT Client** | Points to remote broker |
| **Video Streaming** | Nginx serves video feed over HTTPS |
| **mDNS** | Hostname resolution (owl-1.local, etc.) |

**Not installed in networked mode:**
- Local MQTT broker (uses remote broker)
- WiFi hotspot

### Step 4: Verify Connection

After reboot, verify the OWL is connected:

```bash
# Check WiFi connection
nmcli con show --active

# Check IP address
ip addr show wlan0

# Test MQTT connection
mosquitto_pub -h 192.168.1.2 -t "owl/test" -m "hello from owl-1"

# Check services
sudo systemctl status owl.service owl-dash.service
```

### Step 5: Repeat for Additional OWLs

For each additional OWL, repeat steps 1-4 with:
- Incremented OWL ID (1, 2, 3...)
- Unique static IP (192.168.1.11, .12, .13...)

---

## Accessing Networked OWLs

### Individual OWL Access

Each networked OWL serves its dashboard and video feed:

| Access Method | URL |
|---------------|-----|
| Dashboard | `https://owl-1.local/` or `https://192.168.1.11/` |
| Video Feed | `https://owl-1.local/video_feed` |
| SSH | `ssh owl@owl-1.local` |

### MQTT Communication

All OWLs publish to the configured MQTT broker:

```bash
# Subscribe to all OWL messages (run on any networked device)
mosquitto_sub -h 192.168.1.2 -t "owl/#" -v
```

Example messages:
```text
owl/owl-1/status {"state": "running", "fps": 12.5, "detections": 23}
owl/owl-2/status {"state": "running", "fps": 11.8, "detections": 45}
```

---

## Adding a Central Controller

For fleet management with a dedicated dashboard, you can set up a central controller.

### Controller Hardware

**Recommended:**
- Raspberry Pi 4 or 5 (4GB+ RAM)
- Official Raspberry Pi 7" touchscreen (optional but recommended)
- 12V power supply or buck converter

### Controller Setup

1. Flash **Raspberry Pi OS (64-bit)** with username `owl`

2. Download the OWL repository:
   ```bash
   git clone https://github.com/geezacoleman/OpenWeedLocator owl
   cd owl
   ```

3. Run the controller setup script:
   ```bash
   sudo bash controller/controller_setup.sh
   ```

   ```{warning}
   The controller setup **must** be run with sudo.
   ```

4. Configure when prompted:
   ```{code-block} text
   Enter your WiFi network name (SSID): FarmNetwork
   Enter WiFi password: ********
   Enter controller static IP (default: 192.168.1.2): 192.168.1.2
   Enter gateway IP (default: 192.168.1.1): 192.168.1.1
   Enter controller hostname (default: owl-controller): owl-controller
   ```

### What the Controller Provides

| Component | Purpose |
|-----------|---------|
| **Mosquitto MQTT Broker** | Central message hub for all OWLs |
| **Controller Dashboard** | Web interface showing all connected OWLs |
| **Nginx + SSL** | Secure web server |
| **Avahi/mDNS** | Local hostname resolution |
| **Kiosk Mode** (optional) | Full-screen dashboard for touchscreen |

### Kiosk Mode

For touchscreen installations, enable kiosk mode when prompted:

```{code-block} text
Enable kiosk mode for touchscreen display? (y/n): y
```

Kiosk mode:
- Launches Chromium in full-screen on boot
- Auto-loads the controller dashboard
- Hides the desktop environment

### Accessing the Controller

After setup:
- Dashboard: `https://owl-controller.local/` or `https://192.168.1.2/`
- MQTT Broker: `192.168.1.2:1883`

---

## Network Planning Guide

### Recommended IP Scheme

| Device | Hostname | Static IP |
|--------|----------|-----------|
| WiFi Router | - | 192.168.1.1 |
| Controller (if used) | owl-controller | 192.168.1.2 |
| MQTT Broker (if separate) | - | 192.168.1.3 |
| OWL Unit 1 | owl-1 | 192.168.1.11 |
| OWL Unit 2 | owl-2 | 192.168.1.12 |
| OWL Unit 3 | owl-3 | 192.168.1.13 |
| OWL Unit 4 | owl-4 | 192.168.1.14 |

### Router Configuration

For reliable operation:
- **Disable DHCP** or configure DHCP reservations for all OWL devices
- **Enable 2.4GHz** band (better range than 5GHz)
- **Position centrally** for coverage across spray boom

### Alternative MQTT Brokers

The networked OWL can connect to any MQTT broker:

| Broker | Configuration |
|--------|---------------|
| **Controller Pi** | Use controller IP (e.g., 192.168.1.2) |
| **Separate Server** | Any device running Mosquitto |
| **Cloud MQTT** | Public broker address (requires internet) |
| **Home Assistant** | Home Assistant's built-in broker |

---

## Configuration Reference

### OWL Network Configuration

Each OWL's network config is saved at `/opt/owl-dash-config.txt`:

```{code-block} text
:caption: /opt/owl-dash-config.txt (Networked OWL)

OWL Configuration
================
Mode: Networked
OWL ID: 1
Hostname: owl-1
WiFi Network: FarmNetwork
Static IP: 192.168.1.11
Gateway: 192.168.1.1

Controller Configuration:
- Controller IP: 192.168.1.2
- MQTT Broker: 192.168.1.2:1883

Access:
- Video Feed: https://owl-1.local/video_feed
- SSH: ssh owl@owl-1.local
```

### OWL Detection Config

Enable MQTT in each OWL's detection config:

```bash
nano ~/owl/config/DAY_SENSITIVITY_2.ini
```

```{code-block} ini
:caption: MQTT section

[MQTT]
enable = True
broker_ip = 192.168.1.2
broker_port = 1883
device_id = owl-1
```

### Controller Configuration

Controller config is saved at `/opt/owl-controller-config.txt`:

```{code-block} text
OWL Controller Configuration
============================
Hostname: owl-controller
Static IP: 192.168.1.2
WiFi SSID: FarmNetwork

Access URLs:
- Dashboard: https://owl-controller.local/
- MQTT Broker: 192.168.1.2:1883
```

---

## Troubleshooting

### OWL Not Connecting to WiFi

```bash
# Check WiFi status
nmcli con show
nmcli dev wifi list

# Manually connect
sudo nmcli con up "FarmNetwork"

# Check IP address
ip addr show wlan0
```

### OWL Not Publishing to MQTT

```bash
# Test MQTT connection from OWL
mosquitto_pub -h 192.168.1.2 -t "owl/test" -m "hello"

# Check if broker is reachable
ping 192.168.1.2

# Check OWL service logs
journalctl -u owl.service -f
```

### Cannot Access OWL Dashboard

```bash
# Check nginx is running
sudo systemctl status nginx

# Test locally
curl -k https://localhost/

# Check firewall
sudo ufw status
```

### Controller Not Receiving Messages

```bash
# On controller, check mosquitto
sudo systemctl status mosquitto
ss -tlnp | grep 1883

# Check mosquitto logs
sudo tail -f /var/log/mosquitto/mosquitto.log

# Subscribe to test messages
mosquitto_sub -h localhost -t "#" -v
```

### Static IP Not Applied

```bash
# Check NetworkManager connection
nmcli con show "FarmNetwork"

# Verify IP
ip addr show wlan0

# Restart NetworkManager
sudo systemctl restart NetworkManager
```

---

## Service Management

### OWL Services

```bash
# Detection service
sudo systemctl status owl.service
sudo systemctl restart owl.service
journalctl -u owl.service -f

# Dashboard service
sudo systemctl status owl-dash.service
journalctl -u owl-dash.service -f
```

### Controller Services

```bash
# Dashboard
sudo systemctl status owl-controller

# MQTT broker
sudo systemctl status mosquitto

# Web server
sudo systemctl status nginx
```

---

## Scaling Considerations

### Bandwidth

Each OWL video stream uses approximately:
- **Low quality**: 0.5-1 Mbps
- **Medium quality**: 1-2 Mbps
- **High quality**: 2-4 Mbps

MQTT overhead is minimal (~10 Kbps per OWL).

### WiFi Coverage

| OWL Count | Recommendation |
|-----------|----------------|
| 1-4 | Single router, 2.4GHz |
| 5-8 | Dual-band router or mesh |
| 8+ | Multiple access points |

---

## Next Steps

```{seealso}
- [OWL Setup](owl-setup.md) - Basic and standalone configurations
- [Configuration Guide](../software/configuration.md) - Detection parameter tuning
- [MQTT Topics Reference](../reference/mqtt-topics.md) - Message format documentation
- [Field Deployment](../usage/field-deployment.md) - Best practices for operations
```