# Networked Setup

```{warning}
**Development Branch — Subject to Change**

The wireless dashboard features described on this page are currently on the `wireless-display` branch and have not yet been merged into `main`. The setup process and behaviour may change before the final release.

To use these features, you must clone from the branch:

    git clone -b wireless-display https://github.com/geezacoleman/OpenWeedLocator owl
```

This guide walks you through connecting multiple OWL units to a shared WiFi network so they can all be monitored and controlled from a single dashboard. By the end, you'll have a working system where every OWL reports back to one central screen in the tractor cab.

## Overview

A networked OWL connects to your existing WiFi and communicates with other devices using a lightweight messaging system called MQTT. This enables:

- Multiple OWLs on the same network
- Central monitoring from a touchscreen in the cab
- Integration with existing farm networks
- Remote start, stop, and configuration changes

```{admonition} Networked vs Standalone
:class: note

**Standalone OWL** creates its own WiFi hotspot — you connect directly to the OWL. Best for a single unit.

**Networked OWL** joins your existing WiFi — the OWL connects to your network. Best for multiple units managed together.
```

**Option A: Networked OWLs only** — Multiple OWLs connect to the same WiFi and a shared message broker. You monitor each OWL individually from any device on the network. Use this if you already have an MQTT broker or want to integrate with other systems.

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

**Option B: Networked OWLs + Central Controller (recommended)** — A dedicated Raspberry Pi in the cab acts as the central hub with a touchscreen dashboard. It runs the message broker and shows all OWLs on one screen. This is the setup most farmers will want.

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

```{admonition} Haven't run the installer yet?
:class: tip

Complete the [Two-Step Install](../../software/two-step-install.md) first, then return here when prompted for dashboard setup.
```

This guide follows **Option B** (controller + OWLs). If you're using Option A, skip to [Step 2](#step-2-set-up-each-owl) and point your OWLs at your existing MQTT broker instead.

---

## Understanding your network

Before you start, here are the networking terms you'll see during setup, explained in plain language.

**WiFi network name (SSID)**
: The name of your WiFi that appears when you connect your phone. You'll enter this during setup so the OWLs and controller can join the same network.

**Password**
: Your WiFi password — the same one you use on your phone or laptop.

**IP address**
: Like a street address for each device on your network. Every device gets a unique one, such as `192.168.1.11`. Devices use these addresses to find and talk to each other.

**Static IP**
: An address that's permanently assigned to a device so it never changes. Without this, your router might give a device a different address each time it restarts, and the other devices won't be able to find it.

**Gateway**
: Your router's own IP address — the "front gate" that all network traffic goes through. It usually ends in `.1` (for example, `192.168.1.1`).

**Subnet**
: A group of addresses that can talk to each other directly. If your router is `192.168.1.1`, then all your devices should use addresses that start with `192.168.1.` — the last number is the only part that changes.

**MQTT**
: A lightweight messaging system that lets the OWLs talk to the controller. Think of the controller as a noticeboard — OWLs pin their status messages to it, and the dashboard reads them.

**MQTT broker**
: The device that runs the noticeboard. In a typical setup, the controller Pi runs the broker so you don't need any extra hardware.

```{tip}
**Where do I find my router's IP address?** Check your phone's WiFi settings (tap the network name for details), or look at the sticker on the bottom of your router. It's usually `192.168.1.1` or `192.168.0.1`.
```

---

## Planning your setup

Before powering on any Raspberry Pi, gather the following information and write it down on a piece of paper.

**What you'll need:**

- [ ] Your WiFi network name and password
- [ ] A Raspberry Pi for the controller (Pi 4 or 5, 4GB+ RAM recommended)
- [ ] Optional: a touchscreen display (EDATEC HMI3010 at 1280x800 or Raspberry Pi 7" display)
- [ ] One Raspberry Pi per OWL unit (with camera and relay board)
- [ ] A plan for IP addresses (see the table below)

**Recommended IP addresses:**

| Device | Address | Note |
|--------|---------|------|
| Router (gateway) | 192.168.1.1 | Usually already set — check your router |
| Controller | 192.168.1.2 | The in-cab Pi that runs the dashboard |
| OWL 1 | 192.168.1.11 | First OWL on the boom |
| OWL 2 | 192.168.1.12 | Second OWL |
| OWL 3 | 192.168.1.13 | Third OWL |
| OWL 4 | 192.168.1.14 | Continue the pattern |

```{tip}
Write these addresses on a piece of paper and keep it with your equipment. You'll need them during setup and they're useful for troubleshooting later.
```

**Router tips:**

- Use the **2.4 GHz** WiFi band if your router supports both 2.4 and 5 GHz — it has better range across a spray boom
- If possible, set up **DHCP reservations** (or "address reservation") in your router for each device, so the addresses are locked in even if a device loses its static IP setting
- Position the router centrally for good coverage across the boom

---

## Step 1 — Set up the controller

The controller is the central hub that runs the dashboard and message broker. Set this up first so the OWLs have something to connect to.

### What you'll need

- Raspberry Pi 4 or 5 (4GB+ RAM)
- MicroSD card flashed with **Raspberry Pi OS (64-bit)**, username set to `owl`
- Optional: touchscreen display for in-cab use

```{tip}
Use the free [Raspberry Pi Imager](https://www.raspberrypi.com/software/) tool to flash the SD card. When it asks for a username, enter `owl`.
```

### Run the controller setup

Connect the controller Pi to a monitor and keyboard (or access it via SSH), then run:

```bash
git clone -b wireless-display https://github.com/geezacoleman/OpenWeedLocator owl
cd owl
sudo bash controller/networked/in-cab_controller_setup.sh
```

```{warning}
The controller setup **must** be run with `sudo`. If you forget, you'll see:

    [ERROR] This script must be run with sudo privileges.
```

The script will ask you a series of questions. Enter the values you wrote down in the planning step.

```{code-block} text
:caption: Controller configuration prompts

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
**Kiosk mode** means the dashboard opens automatically in full-screen when the Pi boots — you won't see a normal desktop. This is ideal for a touchscreen in the cab. Enter **n** if you want a normal desktop environment.
```

If you enable kiosk mode, the script will ask you to choose a screen resolution:

```{code-block} text
:caption: Screen resolution selection (kiosk mode only)

[INFO] Select display resolution (for kiosk/touchscreen):
  1) 1280x800  (EDATEC HMI3010 default)
  2) 1024x600  (7" alternative)
  3) 1920x1080 (Full HD)
  4) Custom

Select resolution (1-4, default 1): 1
```

The script will also ask about GPS. If you have a Teltonika router that provides GPS data, enable this for speed-adaptive spray timing:

```{code-block} text
:caption: GPS configuration

[INFO] GPS Configuration
  The controller can receive GPS data from a Teltonika router
  via NMEA-over-TCP on port 8500. This enables speed-adaptive
  actuation and track recording.

Enable GPS from Teltonika router? (y/n, default: n): n
```

Finally, review the configuration summary and confirm:

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
Screen Resolution: 1280x800
GPS: Disabled

Access Information:
  Dashboard: https://owl-controller.local/ or https://192.168.1.2/
  MQTT Broker: 192.168.1.2:1883

Continue with these settings? (y/n): y
```

The installation will then run automatically. It takes around 10-15 minutes. Watch for `[OK]` messages — if everything passes, you'll see a summary like this:

```{code-block} text
:caption: Successful controller setup

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
[OK] CONTROLLER.ini
[OK] Service Management
[OK] Kiosk Mode Configuration
[OK] WiFi Configuration
[OK] Static IP Configuration

[COMPLETE] OWL Controller setup completed successfully!
```

<details>
<summary>What to expect during installation (click to expand)</summary>

The script installs and configures each component in order. You'll see output like this:

```text
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

</details>

When prompted, reboot the controller:

```text
Reboot now? (y/n): y
```

After reboot, the controller is ready. If kiosk mode is enabled, the dashboard will open automatically in full-screen.

**What the controller provides:**

| Component | What it does |
|-----------|-------------|
| MQTT broker | Central message hub — all OWLs send their status here |
| Dashboard | Web interface showing all connected OWLs on one screen |
| Nginx + SSL | Secure web server that handles video streaming |
| Kiosk mode (optional) | Full-screen dashboard that starts automatically on boot |

```{tip}
**Dashboard access:** Open `https://192.168.1.2/` in any browser on the same network. Your browser will show a security warning — this is normal and safe to click through. The connection is encrypted, but the certificate is self-generated rather than from a public authority.
```

**Next step:** Now set up each OWL unit using the controller's IP address (`192.168.1.2`) when prompted.

---

## Step 2 — Set up each OWL

Each OWL unit on the boom needs to be set up individually. The process is the same for each one — just change the OWL ID number and IP address.

### Run the OWL installer

On each OWL Pi, clone the repository and run the installer:

```bash
git clone -b wireless-display https://github.com/geezacoleman/OpenWeedLocator owl
cd owl
bash owl_setup.sh
```

The installer handles everything: system updates, camera check, virtual environment, OpenCV, and dependencies. When it asks about the web dashboard, say **yes**:

```{code-block} text
[INFO] Dashboard setup available...
Do you want to add a web dashboard for remote control? (y/n): y
```

The installer then runs the network setup automatically — you do not need to run a separate script.

```{tip}
If you need to re-run just the network setup later (without reinstalling everything), use:

    sudo bash ~/owl/controller/shared/setup.sh
```

### Choose networked mode

Select **Networked** mode and choose your connection type:

```{code-block} text
[INFO] Select OWL Operation Mode:
  1) Standalone - Create WiFi hotspot with local MQTT broker and dashboard
  2) Networked  - Connect to existing WiFi network with remote MQTT broker

Select mode (1 or 2): 2
[INFO] Networked mode selected

[INFO] Select network connection type:
  1) WiFi     - Connect to an existing WiFi network
  2) Ethernet - Use a wired LAN connection (eth0)

Select connection type (1 or 2, default: 1): 1
```

```{note}
**WiFi vs Ethernet:** Most setups use WiFi. Choose Ethernet if you've run a network cable directly to the OWL — this skips the WiFi credentials and uses the wired connection instead.
```

### Enter network settings

Enter the details for this OWL. Use the IP addresses you planned earlier.

**WiFi connection:**

```{code-block} text
[INFO] Configuring WiFi Client (Networked Mode)
Enter WiFi network name (SSID) to join: FarmNetwork
Enter WiFi network password: ********
Re-enter WiFi password to confirm: ********
Enter OWL ID number (default: 1): 1
Enter static IP for this OWL (e.g., 192.168.1.11): 192.168.1.11
Enter gateway IP (default: 192.168.1.1): 192.168.1.1
Enter central controller IP (MQTT broker; default: 192.168.1.2): 192.168.1.2
```

**Ethernet connection:** Same prompts but without the WiFi name and password.

The script validates that all your addresses are on the same subnet:

```{code-block} text
[OK] Network OK: OWL 192.168.1.11, Gateway 192.168.1.1, Controller 192.168.1.2 (base 192.168.1.x).
```

If there's a mismatch (for example, the OWL is on `192.168.1.x` but the controller is on `10.0.0.x`), the script will warn you and ask you to re-enter the addresses.

Review the summary and confirm:

```{code-block} text
[INFO] Networked Configuration Summary:
  Mode: Networked
  Hostname: owl-1
  Connection: WiFi (FarmNetwork)
  Static IP: 192.168.1.11
  Gateway: 192.168.1.1
  Controller IP: 192.168.1.2
  MQTT Broker: 192.168.1.2:1883 (remote)
  Video Feed: https://owl-1.local/video_feed

Continue with these settings? (y/n): y
```

```{warning}
**If you're connected via SSH:** When the network settings are applied, your SSH connection will drop because the Pi is switching to its new IP address. Reconnect using the new static IP:

    ssh owl@192.168.1.11
```

<details>
<summary>What to expect during OWL setup (click to expand)</summary>

In networked mode, the OWL installs MQTT clients (not a broker) and configures networking:

```text
[INFO] Installing required system packages...
[INFO] Installing MQTT clients only (networked mode)...
[OK] Installing system packages completed successfully.
[INFO] Skipping MQTT broker setup (networked mode - using remote broker)
[INFO] Configuring WiFi client connection: FarmNetwork...
[OK] WiFi configuration completed successfully.
[INFO] Configuring firewall (UFW)...
[OK] UFW firewall configuration completed successfully.
[INFO] Setting hostname to owl-1...
[OK] Setting hostname completed successfully.
[INFO] Generating SSL certificates...
[OK] SSL certificate generation completed successfully.
[INFO] Setting up Nginx web server...
[OK] Nginx configuration completed successfully.
[INFO] Configuring Avahi for .local domain resolution...
[OK] Avahi service configuration completed successfully.
[INFO] Starting and enabling services...
[OK] Starting services completed successfully.
```

The setup writes configuration to `GENERAL_CONFIG.ini` and `CONTROLLER.ini` automatically — you don't need to edit any config files manually.

</details>

When prompted, reboot the OWL:

```text
Reboot now? (y/n): y
```

### Repeat for each OWL

For each additional OWL, repeat the process above with:
- An incremented **OWL ID** (1, 2, 3...)
- A unique **static IP** (192.168.1.11, .12, .13...)

Everything else (WiFi name, password, gateway, controller IP) stays the same.

---

## Step 3 — Verify everything works

### Check the controller

1. Open `https://192.168.1.2/` in a browser on the same network. You should see the OWL Controller dashboard.

2. Your browser will show a security warning — this is normal. Click "Advanced" and then "Proceed" (the exact wording varies by browser). The connection is encrypted and safe.

3. As each OWL comes online after reboot, it should appear as a card on the dashboard within a few seconds.

4. To check the message broker is running, open a terminal on the controller and run:

```bash
mosquitto_sub -h localhost -t "owl/#" -v
```

You should see messages from each connected OWL appearing every few seconds.

### Check each OWL

On each OWL, verify the connection:

```bash
# Check WiFi is connected (or Ethernet)
nmcli con show --active

# Check the correct IP address is assigned
ip addr show wlan0    # use eth0 for Ethernet

# Test that the OWL can reach the controller
mosquitto_pub -h 192.168.1.2 -t "owl/test" -m "hello from owl-1"

# Check the detection service is running
sudo systemctl status owl.service
```

If the MQTT test completes silently (no output), it worked. If you see `Error: The connection was refused`, check that the controller is powered on and connected to the same network.

```{note}
If OWLs don't appear on the dashboard, see the [Troubleshooting](#troubleshooting) section below.
```

---

## Troubleshooting

### WiFi or network problems

```bash
# Check if WiFi is connected
nmcli con show --active

# See available WiFi networks
nmcli dev wifi list

# Check your IP address
ip addr show wlan0

# Manually reconnect to WiFi
sudo nmcli con up "FarmNetwork"

# Restart the network service
sudo systemctl restart NetworkManager
```

If the OWL has the wrong IP address, re-run the network setup:

```bash
sudo bash ~/owl/controller/shared/setup.sh
```

### OWLs not appearing on controller

First, check the MQTT broker on the controller:

```bash
# Is the broker running?
sudo systemctl status mosquitto

# Can the controller receive messages?
mosquitto_sub -h localhost -t "owl/#" -v
```

Then, from the OWL, check it can reach the controller:

```bash
# Can the OWL reach the controller?
ping 192.168.1.2

# Can the OWL send MQTT messages?
mosquitto_pub -h 192.168.1.2 -t "owl/test" -m "hello"
```

If `ping` works but MQTT fails, the firewall on the controller may be blocking port 1883:

```bash
# On the controller, check firewall rules
sudo ufw status
```

### Video feed not working

```bash
# Check nginx is running
sudo systemctl status nginx

# Test the video feed locally on the OWL
curl -k https://localhost/video_feed

# Check the camera is detected
vcgencmd get_camera    # Pi 4 and earlier
libcamera-hello --list-cameras    # Pi 5
```

### Services not starting

```bash
# Check the OWL detection service
sudo systemctl status owl.service
journalctl -u owl.service --no-pager -n 50

# Check the controller dashboard service
sudo systemctl status owl-controller
journalctl -u owl-controller --no-pager -n 50
```

For more help, see the [full Troubleshooting Guide](../../troubleshooting/index.md).

---

## Reference

### MQTT topics

Each OWL publishes to device-specific topics. Replace `{id}` with the device ID (e.g., `owl-1`).

| Topic | Purpose |
|-------|---------|
| `owl/{id}/state` | Full device state (detection mode, algorithm, settings) |
| `owl/{id}/commands` | Control commands sent to the OWL (start, stop, config changes) |
| `owl/{id}/status` | Heartbeat and connectivity status |
| `owl/{id}/detection` | Weed detection events |
| `owl/{id}/config` | Configuration data |
| `owl/{id}/indicators` | LED and buzzer indicator state |
| `owl/{id}/gps` | GPS data from the controller |

To watch all messages from all OWLs:

```bash
mosquitto_sub -h 192.168.1.2 -t "owl/#" -v
```

### Configuration files

The setup script configures these files automatically — you should not need to edit them manually.

| File | Location | Purpose |
|------|----------|---------|
| `GENERAL_CONFIG.ini` | `~/owl/config/` | Detection parameters, sensitivity presets, relay mapping |
| `CONTROLLER.ini` | `~/owl/config/` | MQTT settings, network mode, GPS, actuation timing |
| Network config summary | `/opt/owl-dash-config.txt` (OWL) or `/opt/owl-controller-config.txt` (controller) | Human-readable record of setup choices |

### System services

| Service | Runs on | Purpose |
|---------|---------|---------|
| `owl.service` | Each OWL | Weed detection and camera |
| `owl-controller` | Controller | Dashboard web application |
| `mosquitto` | Controller | MQTT message broker |
| `nginx` | Both | Web server (SSL, video proxy) |

Common service commands:

```bash
# Check if a service is running
sudo systemctl status owl.service

# Restart a service
sudo systemctl restart owl-controller

# View live logs
journalctl -u owl.service -f
```

### Scaling

| OWL count | WiFi recommendation |
|-----------|---------------------|
| 1-4 | Single router, 2.4 GHz band |
| 5-8 | Dual-band router or mesh network |
| 8+ | Multiple access points along the boom |

Each OWL video stream uses approximately 1-2 Mbps. MQTT overhead is minimal (around 10 Kbps per OWL).

---

## Next steps

```{seealso}
- [Standalone Setup](standalone.md) - Single OWL with WiFi hotspot
- [Configuration Guide](../../software/configuration/index.md) - Detection parameter tuning
- [Controllers](../../controllers/index.md) - Wired and wireless controller options
- [Use Cases](../../usage/use-cases/index.md) - Application examples and field deployment
```
