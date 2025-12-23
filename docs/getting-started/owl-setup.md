# OWL Setup

This guide covers setting up a single OWL unit, either as a basic detection system or as a standalone unit with its own 
WiFi hotspot and dashboard. The main steps are:

1. Step 1: Install Raspbian onto an SD card
2. Step 2: Download and run the setup script, deciding your setup parameters
3. Step 3: Focusing the camera
4. Step 4: Verifying the installation


## Prerequisites

Before starting, ensure you have:

| Requirement | Details                                                        |
|-------------|----------------------------------------------------------------|
| Hardware | Fully assembled OWL with Raspberry Pi and camera               |
| Camera | Connected and enabled Raspberry Pi camera module or USB camera |
| Internet | WiFi or Ethernet connection (for initial setup only)           |
| Time | Approximately 20-30 minutes                                    |

The first steps are common to both the Basic and Standalone dashboard OWL systems.

# Step 1: Prepare the Raspberry Pi

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

```{admonition} Connecting to a phone hotspot
:class: tip
It is often convenient to set the Pi to connect automatically to a phone hotspot for internet access. If you connect your
computer to the same network, then connecting over the network via SSH is straightforward. Just check your phone for the
IP address of the connected Pi under the Hotspot settings.
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
Connect a monitor and keyboard directly to the Pi. 

This approach can avoid any issues with losing the SSH connection and access to the Pi when adjusting network settings.

**Option B: SSH (Recommended)**

Find the IP address of the connected Raspberry Pi and connect to it via another device on the same network. More convenient
than setting up a screen and keyboard, but everything must be done through the command line.
```bash
ssh owl@<your-pi-ip-address>
```

## Step 2: Run the OWL Installer

Once connected to your Pi, open up the terminal with CTRL + ALT + T (if using a screen/keyboard) and run these commands:

```bash
git clone https://github.com/geezacoleman/OpenWeedLocator owl
```
This first command will download the repository into a folder called owl in your home directory. It may take some time 
depending on your internet speed and connection.
```bash
cd owl
```
Then we `change directory (cd)` into `owl` so we can run the final command below:
```bash
bash owl_setup.sh
```
```{admonition} Choosing Basic, Standalone or Networked setup
:class: important
During the setup you will be asked: 'Do you want to set up a Dashboard?':
 
**Basic OWL**
Respond NO and the setup should complete.

**Standalone OWL**
Respond YES, and then select 1 (standalone OWL) - setup instructions are provided below.

**Networked OWL**
Respond YES, and then select 2 (Networked OWL) - setup instructions are provided under Networked Setup.
``` 

This command will run the setup script. Here is where you can decide to setup the Basic, Standalone or Networked OWL.

```{warning}
**Do not run with sudo!** The installer will request elevated permissions only when needed.
```

## Completing Standalone OWL Setup

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
   - e.g. `https://owl-1.local/` or
   - `https://10.42.0.1/`
   - The actual address will be `owl-X.local`, where X is the OWL ID you provided in the setup script.

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
- Ability to upload/view data saved on the USB drive

---

## What the Installer Does

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

## Installation Progress

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

# Step 3: Focus Your Camera

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
For field deployment, focus at your typical operating distance (usually 0.9m for a 1m wide coverage).
```

---

# Step 4: Verify Installation

## Check the OWL Service

```bash
sudo systemctl status owl.service
```

You should see `Active: active (running)`.

## Check the Dashboard Service (Standalone Only)

```bash
sudo systemctl status owl-dash.service
```

## Test Detection

```bash
# Run with display output
~/owl/./owl.py --show-display

# Or check the service logs
journalctl -u owl.service -f
```

---

# Configuration

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

# Troubleshooting

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