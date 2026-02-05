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

```{admonition} Haven't run the installer yet?
:class: tip

Complete the [Two-Step Install](../../software/two-step-install.md) first, then return here when prompted for dashboard setup.
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

```{tip}
If you are using a central controller, set that up first so you have the MQTT broker IP ready. See [Adding a Central Controller](#adding-a-central-controller) below.
```

### Step 1: Run Basic OWL Setup

First, complete the standard OWL installation. See [Two-Step Install](../../software/two-step-install.md) for the full step-by-step walkthrough.

```bash
git clone https://github.com/geezacoleman/OpenWeedLocator owl
cd owl
bash owl_setup.sh
```

The installer will run through all steps (system update, camera check, virtual environment, OpenCV, dependencies, systemd service, desktop setup). See the [Two-Step Install - Expected Installation Output](../../software/two-step-install.md#expected-installation-output) for what to expect at each step.

### Step 2: Enable Dashboard in Networked Mode

When the installer prompts for dashboard setup, choose **yes**:

```{code-block} text
[INFO] Dashboard setup available...
Do you want to add a web dashboard for remote control? (y/n): y
```

The dashboard Python dependencies are installed first:

```{code-block} text
[INFO] Setting up OWL Dashboard...
[INFO] Installing dashboard Python dependencies...
... (installing flask, gunicorn, paho-mqtt, psutil, boto3)
[OK] Installing dashboard Python dependencies completed successfully.
[INFO] Verifying Python package installations...
[OK] Flask: 3.0.0, Gunicorn: 21.2.0, Paho-MQTT: installed
[OK] Verifying Python dependencies completed successfully.
```

Then select **Networked mode**:

```{code-block} text
[INFO] OWL Setup Configuration
=======================================

[INFO] Select OWL Operation Mode:
  1) Standalone - Create WiFi hotspot with local MQTT broker and dashboard
  2) Networked  - Connect to existing WiFi network with remote MQTT broker

Select mode (1 or 2): 2
[INFO] Networked mode selected
```

### Step 3: Configure Network Settings

Enter the network details for this OWL:

```{code-block} text
:caption: Networked OWL configuration

[INFO] Configuring WiFi Client (Networked Mode)
Enter WiFi network name (SSID) to join: FarmNetwork
Enter WiFi network password: ********
Re-enter WiFi password to confirm: ********
Enter OWL ID number (default: 1): 1
Enter static IP for this OWL (e.g., 192.168.1.11): 192.168.1.11
Enter gateway IP (default: 192.168.1.1): 192.168.1.1
Enter central controller IP (MQTT broker; default: 192.168.1.2): 192.168.1.2
```

```{note}
Passwords are masked with `*` characters as you type.
```

```{important}
**IP Address Planning:**
- Each OWL needs a unique static IP
- All IPs must be on the same subnet
- The MQTT broker IP can be any device running an MQTT broker
- Avoid using `.0` or `.255` as the last octet (these are reserved)
```

### Network Validation

The setup validates your network configuration. All IPs must share the same subnet:

```{code-block} text
:caption: Successful validation

[OK] Network OK: OWL 192.168.1.11, Gateway 192.168.1.1, Controller 192.168.1.2 (base 192.168.1.x).
```

If there's a **subnet mismatch**, the script will ask you to re-enter the IPs:

```{code-block} text
:caption: Subnet mismatch (requires re-entry)

[WARN] OWL static IP base (192.168.1.x) differs from Controller base (10.0.0.x).
[WARN] Please re-enter BOTH the OWL static IP and the Controller IP so they share the same subnet.
```

If the **gateway doesn't match**, a similar warning is shown:

```{code-block} text
[WARN] OWL static IP base (192.168.1.x) differs from Gateway base (10.0.0.x).
[WARN] Please re-enter the Gateway IP to match the OWL subnet.
```

### Configuration Summary

After validation, you'll see the full configuration summary:

```{code-block} text
:caption: Networked configuration summary

[INFO] Networked Configuration Summary:
  Mode: Networked
  Hostname: owl-1
  WiFi Network: FarmNetwork
  Static IP: 192.168.1.11
  Gateway: 192.168.1.1
  Controller IP: 192.168.1.2
  MQTT Broker: 192.168.1.2:1883 (remote)
  Video Feed: https://owl-1.local/video_feed

Continue with these settings? (y/n): y
```

Review this carefully before confirming. If anything is wrong, enter **n** to cancel and re-run the setup.

### Network Change Warning

```{warning}
**If you are connected via SSH**, read this carefully!

Before proceeding with network configuration, you will see:

    [INFO] If you are using a wifi connection to access the Pi over SSH or for internet,
    your network connection will be replaced with the new connection settings.
    [WARNING] If so it is likely this will drop out when the network is reconnected under a different IP address
    [WARNING] Reconnect under the details entered above. OWL Static IP: 192.168.1.11
    [WARNING] Make sure you have physical access to the Pi in case of issues
    Do you want to continue? (y/n):

In **Networked mode**, the Pi will switch from your current WiFi connection to the new static IP configuration. Your SSH session **will drop**. After setup completes and the Pi reboots, reconnect using the new static IP:

    ssh owl@192.168.1.11

Or by hostname (if mDNS is working on your network):

    ssh owl@owl-1.local
```

### Expected Networked Setup Output

Below is the step-by-step output you should see during the networked setup.

#### Package Installation

In networked mode, only MQTT **clients** are installed (not the broker):

```{code-block} text
:caption: System packages (networked mode)

[INFO] Installing required system packages...
[INFO] Installing MQTT clients only (networked mode)...
... (apt-get install output)
[OK] Installing system packages (nginx, ufw, openssl, avahi-daemon, mosquitto, net-tools) completed successfully.
```

#### MQTT Broker Skipped

```{code-block} text
:caption: No local MQTT broker in networked mode

[INFO] Skipping MQTT broker setup (networked mode - using remote broker)
```

```{important}
In networked mode, there is **no local MQTT broker**. The OWL connects to the remote broker specified during configuration (e.g., the controller at 192.168.1.2). Make sure that broker is running before the OWL reboots.
```

#### WiFi Client Configuration

```{code-block} text
:caption: WiFi client with static IP

[INFO] Configuring WiFi client connection: FarmNetwork...
[OK] WiFi configuration completed successfully.
```

#### Firewall Configuration

```{code-block} text
:caption: UFW firewall

[INFO] Configuring firewall (UFW)...
[INFO] Configuring UFW for networked mode...
[OK] UFW firewall configuration completed successfully.
```

#### Hostname and Permissions

```{code-block} text
:caption: Hostname and sudo permissions

[INFO] Setting hostname to owl-1...
[OK] Setting hostname completed successfully.
[INFO] Updating local hostname resolution...
[OK] Setting hostname and local resolution completed successfully.
[INFO] Configuring sudo permissions for Pi 5 fan control...
[OK] Fan control sudo permissions completed successfully.
[INFO] Configuring sudo permissions for OWL service control...
[OK] Service control sudo permissions completed successfully.
```

#### SSL Certificate

```{code-block} text
[INFO] Generating SSL certificates...
[OK] SSL certificate generation completed successfully.
```

#### Nginx Web Server

In networked mode, Nginx serves a **video feed only** (not a full dashboard):

```{code-block} text
[INFO] Setting up Nginx web server...
[OK] Nginx configuration is valid
[OK] Nginx configuration completed successfully.
```

```{note}
Navigating to `https://owl-1.local/` in a browser will show a simple information page with a link to the video feed. The full management dashboard is provided by the [central controller](#adding-a-central-controller), not by individual networked OWLs.
```

#### Avahi (mDNS)

```{code-block} text
[INFO] Configuring Avahi for .local domain resolution...
[OK] Avahi service configuration completed successfully.
```

#### Service Startup

```{code-block} text
:caption: Services (no local dashboard in networked mode)

[INFO] Starting and enabling services...
[OK] Starting services completed successfully.
[INFO] Skipping dashboard service creation (networked mode)
```

#### Configuration Summary File

```{code-block} text
[INFO] Creating configuration summary...
```

The full configuration is saved at `/opt/owl-dash-config.txt`:

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
- MQTT Broker: 192.168.1.2:1883 (remote)

Access:
- Video Feed: https://owl-1.local/video_feed
- Video Feed: https://192.168.1.11/video_feed
- SSH: ssh owl@owl-1.local or ssh owl@192.168.1.11

SSL Certificate: /etc/ssl/certs/owl.crt
SSL Private Key: /etc/ssl/private/owl.key
Nginx Config: /etc/nginx/sites-available/owl-dash
Avahi Service: /etc/avahi/services/owl-dash.service

Testing Commands:
- mosquitto_pub -h 192.168.1.2 -t "test/message" -m "Hello World"
- mosquitto_sub -h 192.168.1.2 -t "owl/#"
- curl -k https://localhost/video_feed
- ping 192.168.1.2
```

#### Final Validation

```{code-block} text
:caption: Network connectivity test

[INFO] Performing final system validation...
[INFO] Testing network connectivity...
[OK] Can reach controller at 192.168.1.2
[INFO] Testing dashboard service...
[OK] Dashboard service is responding
```

If the controller is not reachable during setup (e.g., it hasn't been set up yet):

```{code-block} text
[WARNING] Cannot reach controller - check network
```

This is not a critical failure — the connection will work once the controller is online and the OWL reboots.

#### MQTT Configuration Reminder

```{code-block} text
:caption: OWL config reminder

[INFO] Checking OWL configuration...
[INFO] Remember to set in OWL config:
  [MQTT]
  enable = True
  broker_ip = 192.168.1.2
  broker_port = 1883
  device_id = owl-1
```

#### Setup Complete Summary

```{code-block} text
:caption: Final summary (all steps passed)

[INFO] OWL Setup Summary:
[OK] System Packages
[OK] MQTT Configuration
[OK] Network Configuration
[OK] UFW Firewall Configuration
[OK] Fan Control Permissions
[OK] Nginx Configuration
[OK] SSL Certificate Generation
[OK] Avahi Service Configuration
[OK] Service Management

[INFO] Networked Mode - Access Information:
  Hostname: owl-1
  Static IP: 192.168.1.11
  WiFi Network: FarmNetwork
  Controller: 192.168.1.2
  Video Feed: https://owl-1.local/video_feed
  Configuration: /opt/owl-dash-config.txt

[INFO] Testing Commands:
  mosquitto_pub -h 192.168.1.2 -t 'owl/test' -m 'hello'
  mosquitto_sub -h 192.168.1.2 -t 'owl/#'
  curl -k https://localhost/video_feed
  ping 192.168.1.2
  ssh owl@owl-1.local

[COMPLETE] OWL setup completed successfully!

[INFO] Setup Complete - Reboot Recommended
======================================
A reboot is recommended to ensure all services start properly.

After reboot:
  * OWL will connect to WiFi 'FarmNetwork'
  * Video feed will be at https://owl-1.local/video_feed
  * MQTT will connect to 192.168.1.2:1883
  * owl.py will launch if enabled

Reboot now? (y/n):
```

Enter **y** to reboot immediately (recommended), or **n** to reboot later with `sudo reboot`.

```{admonition} If any steps show [FAIL]
:class: warning

If the summary shows failures, you will see error details:

    [ERROR] Some components failed to install. Check the status above.
    [ERROR] WiFi Config: WiFi configuration failed
    [ERROR] Please fix the above issues before rebooting.

Review the specific error, fix the issue, and re-run `web_setup.sh`:

    sudo ~/owl/web/web_setup.sh
```

### What Gets Configured

In networked mode, each OWL is configured with:

| Component | Configuration |
|-----------|--------------|
| **WiFi Client** | Connects to specified network with static IP |
| **MQTT Client** | Points to remote broker (mosquitto-clients only) |
| **Video Streaming** | Nginx serves video feed over HTTPS |
| **mDNS** | Hostname resolution (owl-1.local, etc.) |
| **UFW Firewall** | Allows SSH, HTTP, HTTPS, and MQTT ports |
| **SSL Certificate** | Self-signed, valid for 10 years |

**Not installed in networked mode:**
- Local MQTT broker (uses remote broker)
- WiFi hotspot
- Dashboard service (owl-dash)
- Full dashboard web interface (served by controller instead)

### Step 4: Verify Connection

After reboot, verify the OWL is connected:

```bash
# Check WiFi connection
nmcli con show --active
```

You should see your network listed as active:

```{code-block} text
NAME         UUID                                  TYPE  DEVICE
FarmNetwork  a1b2c3d4-e5f6-7890-abcd-ef1234567890  wifi  wlan0
```

```bash
# Check IP address
ip addr show wlan0
```

Look for your static IP in the output:

```{code-block} text
inet 192.168.1.11/24 brd 192.168.1.255 scope global wlan0
```

```bash
# Test MQTT connection to the controller
mosquitto_pub -h 192.168.1.2 -t "owl/test" -m "hello from owl-1"
```

If the broker is running, this command will complete silently (no output = success). If it fails:

```{code-block} text
Error: The connection was refused.
```

This means the MQTT broker is not running or not reachable. Check the controller is set up and on the same network.

```bash
# Check OWL service
sudo systemctl status owl.service
```

You should see `Active: active (running)`.

### Step 5: Repeat for Additional OWLs

For each additional OWL, repeat steps 1-4 with:
- Incremented OWL ID (1, 2, 3...)
- Unique static IP (192.168.1.11, .12, .13...)

---

## Accessing Networked OWLs

### Individual OWL Access

Each networked OWL serves a video feed and information page:

| Access Method | URL |
|---------------|-----|
| Information Page | `https://owl-1.local/` or `https://192.168.1.11/` |
| Video Feed | `https://owl-1.local/video_feed` |
| SSH | `ssh owl@owl-1.local` or `ssh owl@192.168.1.11` |

```{note}
The information page at the root URL shows the OWL hostname, mode, and a link to the video feed. The full management dashboard is provided by the [central controller](#adding-a-central-controller), not by individual networked OWLs.

Your browser will show a security warning because the SSL certificate is self-signed. This is expected — click through to proceed.
```

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

For fleet management with a dedicated dashboard, you can set up a central controller. The controller provides the MQTT broker and management dashboard for all networked OWLs.

```{important}
**Set up the controller BEFORE the networked OWLs.** The OWLs need the controller's IP address during their setup, and the MQTT broker must be running for OWLs to connect.
```

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
   The controller setup **must** be run with sudo. If you forget, you'll see:

       [ERROR] This script must be run with sudo privileges.
       [ERROR] Please run: sudo ./controller_setup.sh
   ```

### Controller Setup: Introduction

When the script starts, you'll see a summary of what it will do:

```{code-block} text
:caption: Controller setup intro

============================================
    OWL In-Cab Controller Setup
============================================

This script will configure this Raspberry Pi as the
in-cab controller for multiple OWL units.

The controller will:
  * Install all required system packages
  * Create a Python virtual environment
  * Configure MQTT broker for OWL communication
  * Set up Nginx web server with SSL
  * Configure WiFi with static IP
  * Optional: Enable kiosk mode for display
```

### Controller Setup: Configuration Prompts

```{code-block} text
:caption: Controller configuration

[INFO] Controller Configuration
=======================================
Enter your WiFi network name (SSID): FarmNetwork
Enter WiFi password: ********
Re-enter WiFi password to confirm: ********
Enter controller static IP (default: 192.168.1.2): 192.168.1.2
Enter router/gateway IP (default: 192.168.1.1): 192.168.1.1
Enter hostname (default: owl-controller): owl-controller
Enable kiosk mode on boot? (y/n, default: y): y
```

```{note}
**Kiosk mode** launches Chromium in full-screen on boot, auto-loading the controller dashboard. Ideal for touchscreen installations. Enter **n** if you want a normal desktop environment.
```

### Controller Setup: Configuration Summary

```{code-block} text
:caption: Configuration summary

[INFO] Configuration Summary:
=======================================
WiFi SSID: FarmNetwork
WiFi Password: [HIDDEN]
Static IP: 192.168.1.2
Gateway: 192.168.1.1
Hostname: owl-controller
Kiosk Mode: y

Access Information:
  Dashboard: https://owl-controller.local/ or https://192.168.1.2/
  MQTT Broker: 192.168.1.2:1883

Continue with these settings? (y/n): y
```

### Controller Setup: Installation Progress

The script installs system packages, Python environment, MQTT broker, SSL, Nginx, Avahi, firewall, dashboard service, and configures WiFi. You'll see `[OK]` or `[FAIL]` for each step:

```{code-block} text
:caption: Key installation steps

[INFO] Updating system package list...
[OK] System update completed successfully.
[INFO] Installing required system packages...
[OK] Installing system packages completed successfully.
[INFO] Setting up Python virtual environment...
[OK] Creating virtual environment completed successfully.
[INFO] Installing Python dependencies...
[OK] Installing Python dependencies completed successfully.
[INFO] Setting hostname to owl-controller...
[OK] Hostname configuration completed successfully.
[INFO] Configuring MQTT broker...
[OK] MQTT broker configuration completed successfully.
[INFO] Generating SSL certificate...
[OK] SSL certificate generation completed successfully.
[INFO] Configuring Nginx web server...
[OK] Nginx configuration completed successfully.
[INFO] Configuring Avahi for .local domain...
[OK] Avahi service configuration completed successfully.
[INFO] Configuring UFW firewall...
[OK] Firewall configuration completed successfully.
[INFO] Creating systemd service for OWL Controller Dashboard...
[OK] Dashboard service configuration completed successfully.
[INFO] Setting up kiosk mode (labwc, Raspberry Pi way)...
[OK] Kiosk mode configuration completed successfully.
[INFO] Configuring WiFi connection: FarmNetwork...
[OK] WiFi configuration completed successfully.
[INFO] Starting and enabling services...
[OK] OWL Controller dashboard service started successfully
[OK] Starting services completed successfully.
```

### Controller Setup: Final Validation

The script tests MQTT, dashboard, and network connectivity:

```{code-block} text
:caption: Final validation

[INFO] Performing final system validation...
[INFO] Testing MQTT broker...
[OK] Mosquitto service is running
[OK] Mosquitto is listening on port 1883
[INFO] Testing local MQTT connection...
[OK] Local MQTT connection successful (attempt 1)
[OK] MQTT configuration file is correct
[OK] MQTT broker core functionality verified
[INFO] Final MQTT connectivity validation...
[OK] MQTT broker ready for OWL communication
[INFO] Testing dashboard service...
[OK] Dashboard service is responding
[INFO] Testing network connectivity...
[OK] Connected to FarmNetwork
[OK] Static IP 192.168.1.2 configured
```

### Controller Setup: Complete Summary

```{code-block} text
:caption: Final summary

============================================
[INFO] OWL Controller Setup Summary:
============================================
[OK] System Packages
[OK] Python Environment
[OK] MQTT Broker Configuration
[OK] SSL Certificate
[OK] Nginx Configuration
[OK] Avahi (.local) Configuration
[OK] Firewall Configuration
[OK] Dashboard Service
[OK] Service Management
[OK] Kiosk Mode Configuration
[OK] WiFi Configuration
[OK] Static IP Configuration

[INFO] Controller Access Information:
=======================================
  Controller IP: 192.168.1.2
  Dashboard URL: https://owl-controller.local/ or https://192.168.1.2/
  MQTT Broker: 192.168.1.2:1883
  Hostname: owl-controller
  Configuration: /opt/owl-controller-config.txt

[INFO] Testing Commands:
  mosquitto_pub -h 192.168.1.2 -t 'owl/test' -m 'hello'
  mosquitto_sub -h 192.168.1.2 -t 'owl/#'
  systemctl status owl-controller mosquitto nginx
  journalctl -u owl-controller -f

[INFO] Next Steps for OWL Configuration:
1. On each OWL unit, edit the configuration file
2. Set network_mode = 'networked_owl'
3. Set controller_ip = '192.168.1.2'
4. Set mqtt_broker = '192.168.1.2'
5. OWLs will automatically connect to this controller

[COMPLETE] OWL Controller setup completed successfully!
============================================

A reboot is recommended to ensure all services start properly.

After reboot:
  * Controller will connect to WiFi 'FarmNetwork'
  * Dashboard will be available at https://192.168.1.2/
  * MQTT broker will be running on port 1883
  * Kiosk mode will launch automatically on boot

Reboot now? (y/n):
```

### What the Controller Provides

| Component | Purpose |
|-----------|---------|
| **Mosquitto MQTT Broker** | Central message hub for all OWLs |
| **Controller Dashboard** | Web interface showing all connected OWLs |
| **Nginx + SSL** | Secure web server with MJPEG streaming support |
| **Avahi/mDNS** | Local hostname resolution (owl-controller.local) |
| **Python Virtual Environment** | Isolated environment at `/home/owl/controller_venv` |
| **UFW Firewall** | Allows SSH, HTTP, HTTPS, MQTT, and mDNS ports |
| **Kiosk Mode** (optional) | Full-screen Chromium dashboard for touchscreen |

### Accessing the Controller

After setup and reboot:
- Dashboard: `https://owl-controller.local/` or `https://192.168.1.2/`
- MQTT Broker: `192.168.1.2:1883`
- Configuration file: `/opt/owl-controller-config.txt`

```{note}
Your browser will show a security warning because the SSL certificate is self-signed. This is expected — click through to proceed.

If kiosk mode is enabled, the dashboard will load automatically in full-screen Chromium on the connected display.
```

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

Each OWL's network config is saved at `/opt/owl-dash-config.txt`. View it with:

```bash
cat /opt/owl-dash-config.txt
```

### OWL Detection Config

Enable MQTT in each OWL's detection config:

```bash
nano ~/owl/config/DAY_SENSITIVITY_2.ini
```

```{code-block} ini
:caption: MQTT section in DAY_SENSITIVITY_2.ini

[MQTT]
enable = True
broker_ip = 192.168.1.2
broker_port = 1883
device_id = owl-1
```

```{important}
Each OWL must have a unique `device_id` (e.g., owl-1, owl-2, owl-3). This matches the hostname set during setup.
```

### Controller Configuration

Controller config is saved at `/opt/owl-controller-config.txt`:

```{code-block} text
:caption: /opt/owl-controller-config.txt

OWL Controller Configuration
============================
Hostname: owl-controller
Static IP: 192.168.1.2
Gateway: 192.168.1.1
WiFi SSID: FarmNetwork
WiFi Password: [HIDDEN]

Access URLs:
- Dashboard: https://owl-controller.local/ or https://192.168.1.2/
- MQTT Broker: 192.168.1.2:1883

Service Configuration:
- MQTT Config: /etc/mosquitto/conf.d/owl_controller.conf
- MQTT Log: /var/log/mosquitto/mosquitto.log
- Nginx Config: /etc/nginx/sites-available/owl-controller
- SSL Certificate: /etc/ssl/certs/owl-controller.crt
- SSL Private Key: /etc/ssl/private/owl-controller.key
- Avahi Service: /etc/avahi/services/owl-controller.service
- Dashboard Service: /etc/systemd/system/owl-controller.service
- Python Venv: /home/owl/controller_venv

Testing Commands:
- mosquitto_pub -h localhost -t "test/message" -m "Hello World"
- mosquitto_sub -h localhost -t "owl/#"
- curl -k https://localhost/
- systemctl status owl-controller mosquitto nginx

OWL Configuration:
- Set network_mode to 'networked_owl' in OWL config
- Set controller_ip to '192.168.1.2'
- Set mqtt_broker to '192.168.1.2'
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

Expected output when connected:

```{code-block} text
NAME         UUID                                  TYPE  DEVICE
FarmNetwork  a1b2c3d4-e5f6-7890-abcd-ef1234567890  wifi  wlan0
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

If the MQTT test fails with `Error: The connection was refused`, check:
1. The controller is powered on and connected to the same network
2. The mosquitto service is running on the controller: `sudo systemctl status mosquitto`
3. The firewall allows port 1883: `sudo ufw status` (on the controller)

### Cannot Access OWL Video Feed

```bash
# Check nginx is running
sudo systemctl status nginx

# Test locally on the OWL
curl -k https://localhost/video_feed

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

Expected output when MQTT is working:

```{code-block} text
:caption: mosquitto service status

Active: active (running) since ...
```

```{code-block} text
:caption: Port 1883 listening

LISTEN  0  100  0.0.0.0:1883  0.0.0.0:*  users:(("mosquitto",pid=1234,fd=5))
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

For more troubleshooting help, see the [full Troubleshooting Guide](../../troubleshooting/index.md).

---

## Service Management

### OWL Services

```bash
# Detection service
sudo systemctl status owl.service
sudo systemctl restart owl.service
journalctl -u owl.service -f

# Nginx (video feed)
sudo systemctl status nginx
sudo systemctl restart nginx
```

### Controller Services

```bash
# Controller dashboard
sudo systemctl status owl-controller
journalctl -u owl-controller -f

# MQTT broker
sudo systemctl status mosquitto
sudo tail -f /var/log/mosquitto/mosquitto.log

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
- [Standalone Setup](standalone.md) - Single OWL with WiFi hotspot
- [Configuration Guide](../../software/configuration/index.md) - Detection parameter tuning
- [Controllers](../../controllers/index.md) - Wired and wireless controller options
- [Use Cases](../../usage/use-cases/index.md) - Application examples and field deployment
```
