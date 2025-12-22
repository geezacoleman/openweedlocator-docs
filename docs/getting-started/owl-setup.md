# OWL Setup

This guide covers setting up a single OWL unit, either as a basic detection system or as a standalone unit with its own WiFi hotspot and dashboard.

```{contents} On this page
:local:
:depth: 2
```

## Prerequisites

Before starting, ensure you have:

| Requirement | Details |
|-------------|---------|
| Hardware | Fully assembled OWL with Raspberry Pi and camera |
| Operating System | Raspberry Pi OS (64-bit) freshly installed |
| Camera | Connected and enabled Raspberry Pi camera module |
| Internet | WiFi or Ethernet connection (for initial setup only) |
| Time | Approximately 30 minutes |

## Step 1: Prepare the Raspberry Pi

### Flash the Operating System

1. Download and install [Raspberry Pi Imager](https://www.raspberrypi.com/software/)
2. Select **Raspberry Pi OS (64-bit)** as the operating system
3. Click the **settings cog** before writing to configure:

```{important}
**Required Settings:**
- **Username**: `owl` (strongly recommended for compatibility)
- **Password**: Choose a secure password
- **SSH**: Enable for remote access
- **WiFi**: Configure your network for initial setup
- **Locale**: Set your timezone and keyboard layout
```

```{figure} https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/a86a6358-3a8c-4f40-94df-9eeba9c17e4d
:alt: Raspberry Pi Imager
:width: 500px

Use Raspberry Pi Imager to flash the OS and configure initial settings.
```

4. Write the image to your SD card
5. Insert the SD card into your Raspberry Pi and boot

### Connect to Your Pi

**Option A: Direct Connection**
Connect a monitor and keyboard directly to the Pi

**Option B: SSH (Recommended)**
```bash
ssh owl@<your-pi-ip-address>
# or if mDNS is working:
ssh owl@raspberrypi.local
```

## Step 2: Run the OWL Installer

Once connected to your Pi, run these two commands:

```bash
git clone https://github.com/geezacoleman/OpenWeedLocator owl
bash owl/owl_setup.sh
```

```{warning}
**Do not run with sudo!** The installer will request elevated permissions only when needed.
```

### What the Installer Does

The `owl_setup.sh` script performs these steps automatically:

```{list-table}
:header-rows: 1
:widths: 10 30 60

* - Step
  - Action
  - Details
* - 1
  - System Update
  - Updates and upgrades all system packages
* - 2
  - Camera Check
  - Verifies a camera is connected and functional
* - 3
  - Space Cleanup
  - Removes unnecessary packages (LibreOffice, Wolfram) to free space
* - 4
  - Virtual Environment
  - Creates an isolated Python environment for OWL
* - 5
  - NumPy Alignment
  - Ensures NumPy versions are compatible with system OpenCV
* - 6
  - OpenCV Installation
  - Installs opencv-contrib-python in the virtual environment
* - 7
  - OWL Dependencies
  - Installs all Python packages from requirements.txt
* - 8
  - Systemd Service
  - Configures OWL to start automatically on boot
* - 9
  - Desktop Setup
  - Sets wallpaper and creates Focus desktop shortcut
* - 10
  - Dashboard (Optional)
  - Prompts to install web dashboard for remote control
```

### Installation Progress

You'll see status indicators throughout:
- `[OK]` - Step completed successfully
- `[FAIL]` - Step failed (check the error message)
- `[WARNING]` - Non-critical issue

```{code-block} text
:caption: Example installation output

[INFO] Updating and upgrading the system...
[OK] System upgrade completed successfully.
[INFO] Checking for connected Raspberry Pi camera...
[INFO] Camera detected successfully.
[INFO] Testing camera functionality...
[INFO] Camera is working correctly.
...
```

---

## Basic OWL (No Dashboard)

The simplest configuration runs OWL detection without any network dashboard. This is ideal for testing, development, or when you only need local control.

### Complete Basic Setup

When the installer prompts for dashboard setup, choose **no**:

```{code-block} text
Do you want to add a web dashboard for remote control? (y/n): n
```

That's it! Your OWL will:
- Start detecting weeds automatically on boot
- Activate relays when green vegetation is detected
- Be controllable via SSH or local terminal

### Using Basic OWL

**Start with display output (for testing):**
```bash
~/owl/./owl.py --show-display
```

**Run in background:**
```bash
sudo systemctl start owl.service
```

**Check status:**
```bash
sudo systemctl status owl.service
```

**View logs:**
```bash
journalctl -u owl.service -f
```

### When to Use Basic Mode

- Initial testing and development
- Resource-constrained deployments
- Integration with external control systems
- When you only need relay activation, not monitoring

---

## Standalone OWL (With Dashboard)

The standalone configuration creates a self-contained OWL unit with:
- A WiFi hotspot you can connect to from any device
- A web dashboard for monitoring and configuration
- Local MQTT broker for internal communication

### Enable Dashboard Setup

When the installer prompts for dashboard setup, choose **yes**:

```{code-block} text
Do you want to add a web dashboard for remote control? (y/n): y
```

### Select Standalone Mode

The dashboard installer will ask you to select a mode:

```{code-block} text
[INFO] Select OWL Operation Mode:
  1) Standalone - Create WiFi hotspot with local MQTT broker and dashboard
  2) Networked  - Connect to existing WiFi network with remote MQTT broker

Select mode (1 or 2): 1
```

**Select option 1 (Standalone)** for a self-contained unit.

### Configure Your Hotspot

You'll be prompted to configure:

| Setting | Default | Description |
|---------|---------|-------------|
| OWL ID | 1 | Unique identifier for this unit |
| Hotspot SSID | OWL-1 | WiFi network name others will see |
| Hotspot Password | (none) | Minimum 8 characters |

```{code-block} text
:caption: Example configuration

Enter OWL ID number (default: 1): 1
Enter WiFi hotspot name/SSID (default: OWL-1): OWL-1
Enter WiFi hotspot password (min 8 characters): ********
Re-enter WiFi password to confirm: ********
```

### What Gets Configured

The standalone dashboard setup installs and configures:

| Component | Purpose |
|-----------|---------|
| **NetworkManager Hotspot** | Creates WiFi network at 10.42.0.1/24 |
| **Mosquitto** | Local MQTT broker for OWL communication |
| **Nginx** | Web server with SSL for the dashboard |
| **Avahi** | mDNS for `owl-1.local` hostname resolution |
| **Gunicorn** | Python WSGI server for the Flask dashboard |
| **UFW** | Firewall configured to allow required ports |

### Accessing the Dashboard

After setup completes and the system reboots:

1. On your phone/tablet/laptop, look for the WiFi network (e.g., `OWL-1`)
2. Connect using the password you configured
3. Open a browser and navigate to:
   - `https://owl-1.local/` or
   - `https://10.42.0.1/`

```{note}
Your browser will show a security warning because the SSL certificate is self-signed. This is expected—click through to proceed.
```

### Dashboard Features

The web dashboard provides:
- Live video feed with detection overlay
- Real-time statistics (detections per minute, relay activations)
- Configuration controls
- System status monitoring
- Start/stop controls

---

## Step 3: Focus Your Camera

Proper focus is critical for accurate weed detection. After installation completes:

### Using the Desktop Icon

If you have a monitor connected, double-click the **Focus** icon on the desktop.

### Using the Command Line

```bash
~/owl/./owl.py --focus
```

### Focus Procedure

1. Point the camera at vegetation or a focus target
2. Observe the **sharpness value** displayed on screen
3. Slowly rotate the lens focus ring
4. Find the position with the **highest sharpness value**
5. Lock the focus ring (if your lens has a lock screw)

```{tip}
For field deployment, focus at your typical operating distance (usually 0.5-1.5m depending on mounting height).
```

---

## Step 4: Verify Installation

### Check the OWL Service

```bash
sudo systemctl status owl.service
```

You should see `Active: active (running)`.

### Check the Dashboard Service (Standalone Only)

```bash
sudo systemctl status owl-dash.service
```

### Test Detection

```bash
# Run with display output
~/owl/./owl.py --show-display

# Or check the service logs
journalctl -u owl.service -f
```

---

## Configuration

### Main Configuration File

Edit detection settings in:

```bash
nano ~/owl/config/DAY_SENSITIVITY_2.ini
```

Key settings to adjust:
- `exgMin` / `exgMax` - Green detection thresholds
- `minArea` - Minimum detection size
- Relay assignments and timing

See [Configuration Guide](../software/configuration.md) for detailed explanations.

### Dashboard Configuration (Standalone)

After setup, configuration is saved at `/opt/owl-dash-config.txt`:

```{code-block} text
:caption: /opt/owl-dash-config.txt

OWL Configuration
================
Mode: Standalone
Hostname: owl-1
WiFi Hotspot SSID: OWL-1
Hotspot IP: 10.42.0.1/24
MQTT Broker: localhost:1883 (local)
Dashboard: https://owl-1.local/
```

---

## Troubleshooting

### OWL Service Won't Start

```bash
# Check service logs
journalctl -u owl.service -f

# Common fixes:
# 1. Camera not detected
rpicam-hello --list-cameras

# 2. Permission issues
sudo chown -R owl:owl ~/owl
```

### Camera Not Working

```bash
# Test camera
rpicam-hello

# If "No cameras available":
# 1. Check ribbon cable connection
# 2. Enable camera in raspi-config
sudo raspi-config
# Interface Options → Camera → Enable
```

### Dashboard Not Accessible (Standalone)

```bash
# Check if services are running
sudo systemctl status owl-dash nginx mosquitto

# Check hotspot is active
nmcli con show --active

# Restart network
sudo systemctl restart NetworkManager
```

### WiFi Hotspot Not Appearing (Standalone)

```bash
# Check NetworkManager connections
nmcli con show

# If not active, try:
sudo nmcli con up "OWL-1 Hotspot"

# Or restart NetworkManager
sudo systemctl restart NetworkManager
```

---

## Service Management

### Useful Commands

```bash
# Start/stop OWL detection
sudo systemctl start owl.service
sudo systemctl stop owl.service
sudo systemctl restart owl.service

# Enable/disable auto-start
sudo systemctl enable owl.service
sudo systemctl disable owl.service

# View live logs
journalctl -u owl.service -f
```

### Dashboard Services (Standalone)

```bash
# Restart dashboard
sudo systemctl restart owl-dash.service

# View dashboard logs
journalctl -u owl-dash.service -f

# MQTT broker
sudo systemctl status mosquitto
```

### MQTT Testing (Standalone)

```bash
# Subscribe to all OWL messages
mosquitto_sub -h localhost -t "owl/#"

# Publish a test message
mosquitto_pub -h localhost -t "owl/test" -m "hello"

# Test from hotspot IP
mosquitto_pub -h 10.42.0.1 -t "owl/test" -m "hello"
```

---

## Next Steps

Your OWL is now ready for deployment!

```{seealso}
- [Configuration Guide](../software/configuration.md) - Fine-tune detection parameters
- [Detection Algorithms](../software/algorithms.md) - Understand ExG, ExGR, and ML options
- [Mounting Guide](../usage/mounting.md) - Install OWL on your vehicle
- [Networked Setup](networked-setup.md) - Connect multiple OWLs or join existing networks
```