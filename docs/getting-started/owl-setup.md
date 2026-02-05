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

### Installation Status Indicators

You'll see status indicators throughout:
- `[OK]` - Step completed successfully
- `[FAIL]` - Step failed (check the error message)
- `[WARNING]` - Non-critical issue, installation continues
- `[INFO]` - Progress information

---

### Expected Installation Output

Below is what you should see at each step of the installer. Use this to confirm everything is working correctly.

```{admonition} If OWL is already running
:class: note

If `owl.service` is already running (e.g., you are re-running the installer), you will be prompted first:

    [WARNING] The owl.service is currently running.
    Do you want to stop the service to continue with the installation? (y/n): y
    [INFO] Stopping owl.service...

Enter `y` to continue.
```

#### Step 1: System Update

```{code-block} text
:caption: System update output

[INFO] Updating and upgrading the system...
... (apt update and upgrade output)
[OK] System upgrade completed successfully.
```

#### Step 2: Camera Check

The installer checks for a connected camera. If found:

```{code-block} text
:caption: Camera detected

[INFO] Checking for connected Raspberry Pi camera...
[INFO] Camera detected successfully.
```

If no camera is found, you will be prompted to connect one:

```{code-block} text
:caption: No camera detected

[INFO] Checking for connected Raspberry Pi camera...
[ERROR] No camera detected!
Please connect a Raspberry Pi camera and press Enter to retry...
```

```{warning}
The installer will **not continue** until a camera is detected. Check that your ribbon cable is properly seated and that the camera module is compatible.
```

#### Step 3: Camera Functionality Test

After detecting the camera, the installer tests that it can actually capture images:

```{code-block} text
:caption: Camera test passed

[INFO] Testing camera functionality...
[INFO] Camera is working correctly.
```

If the camera test fails, the installer will attempt a full system upgrade to resolve any driver issues:

```{code-block} text
:caption: Camera test failed (auto-recovery)

[INFO] Testing camera functionality...
[WARNING] Camera test failed. Running full system upgrade to resolve potential issues...
... (full upgrade output)
[OK] Full system upgrade completed successfully.
[INFO] Retesting camera after full upgrade...
[INFO] Camera test passed after full upgrade.
```

If the camera still fails after a full upgrade, a critical error is shown:

```{code-block} text
:caption: Camera failure (requires manual intervention)

[CRITICAL ERROR] Camera still not working after full upgrade.
Please log an issue: https://github.com/geezacoleman/OpenWeedLocator/issues
```

#### Step 4: Space Cleanup

```{code-block} text
:caption: Removing unnecessary packages

[INFO] Freeing up space by removing unnecessary packages...
... (removing wolfram-engine, libreoffice)
[OK] Cleaning up completed successfully.
```

#### Step 5: Virtual Environment

The installer creates an isolated Python environment so OWL's packages don't interfere with the system:

```{code-block} text
:caption: Virtual environment creation

[INFO] Setting up the virtual environment...
[OK] Installing virtualenv packages completed successfully.
[OK] Virtualenv configuration completed successfully.
[INFO] Creating the 'owl' virtual environment...
[OK] Creating virtual environment 'owl' completed successfully.
```

#### Step 6: NumPy Alignment

The installer checks that NumPy versions match between the system and virtual environment. This prevents OpenCV compatibility issues:

```{code-block} text
:caption: NumPy versions match (ideal)

[INFO] Checking NumPy consistency (system vs venv) ...
[OK] System NumPy: 1.24.2 at /usr/lib/python3/dist-packages/numpy/__init__.py.
[INFO] Venv NumPy: 1.24.2 at /usr/lib/python3/dist-packages/numpy/__init__.py
[OK] NumPy versions match: 1.24.2
```

If a mismatch is found, the installer corrects it automatically:

```{code-block} text
:caption: NumPy mismatch auto-corrected

[INFO] Checking NumPy consistency (system vs venv) ...
[OK] System NumPy: 1.24.2 at /usr/lib/python3/dist-packages/numpy/__init__.py.
[INFO] Venv NumPy: 1.26.4 at /home/owl/.virtualenvs/owl/lib/python3.11/site-packages/numpy/__init__.py
[WARN] NumPy mismatch detected (venv=1.26.4, system=1.24.2). Aligning venv to system...
[OK] Venv NumPy aligned to system: 1.24.2
```

#### Step 7: OpenCV Installation

```{code-block} text
:caption: OpenCV install and verification

[INFO] Installing opencv-contrib-python in the 'owl' virtual environment...
... (pip install output)
[OK] Installing opencv-contrib-python completed successfully.
[OK] Final check: NumPy 1.24.2, OpenCV 4.9.0
```

The final check line confirms both NumPy and OpenCV are importable and their versions.

#### Step 8: OWL Dependencies

```{code-block} text
:caption: Python dependencies

[INFO] Installing the OWL Python dependencies...
... (pip install output)
[OK] Installing dependencies from requirements.txt completed successfully.
```

#### Step 9: OWL Systemd Service

The installer creates a systemd service so OWL starts automatically on every boot:

```{code-block} text
:caption: Service creation and startup

[INFO] Setting up OWL to start on boot with systemd...
[INFO] Creating systemd service for OWL...
[INFO] Starting OWL service...
[OK] OWL systemd service is active
[OK] Creating OWL systemd service completed successfully.
```

If the service fails to start, you will see debugging information:

```{code-block} text
:caption: Service startup failure

[INFO] Starting OWL service...
[FAIL] OWL systemd service failed to start
[INFO] Showing service logs for debugging:
... (service status output)
[INFO] For live logs, run: journalctl -u owl.service -f
```

#### Step 10: Desktop Setup

```{code-block} text
:caption: Desktop configuration

[INFO] Setting desktop background...
[OK] Setting desktop background completed successfully.
[INFO] Creating OWL Focusing desktop icon...
[INFO] Focus OWL desktop icon created at: /home/owl/Desktop/Focus.desktop
[OK] Creating desktop icon completed successfully.
```

#### Step 11: Dashboard Setup (Decision Point)

This is where you choose your setup path:

```{code-block} text
:caption: Dashboard prompt

[INFO] Dashboard setup available...
Do you want to add a web dashboard for remote control? (y/n):
```

- Enter **n** for a **Basic OWL** (skips dashboard, proceeds to final summary)
- Enter **y** for **Standalone** or **Networked** (launches the web setup script)

If you choose **n**, the installer will install the dashboard Python dependencies and then proceed to the final summary. For Standalone setup, see [Completing Standalone OWL Setup](#completing-standalone-owl-setup) below. For Networked setup, see [Networked Setup](networked-setup.md).

```{code-block} text
:caption: Dashboard skipped (Basic OWL)

[INFO] Dashboard setup skipped.
```

```{code-block} text
:caption: Dashboard accepted (triggers web_setup.sh)

[INFO] Setting up OWL Dashboard...
[INFO] Installing dashboard Python dependencies...
... (installing flask, gunicorn, paho-mqtt, psutil, boto3)
[OK] Installing dashboard Python dependencies completed successfully.
[INFO] Verifying Python package installations...
[OK] Flask: 3.0.0, Gunicorn: 21.2.0, Paho-MQTT: installed
[OK] Verifying Python dependencies completed successfully.
```

After the dashboard Python dependencies are installed, the `web_setup.sh` script runs automatically. See the Standalone or Networked sections for what happens next.

#### Final Installation Summary

After all steps complete (and after dashboard setup if selected), you will see the final summary:

```{code-block} text
:caption: Successful installation summary

[INFO] Installation Summary:
[OK] System Upgrade
[OK] Camera Detected
[OK] Camera Test
[OK] Virtual Environment Created
[OK] Global NumPy Version Detected
[OK] OpenCV Installed
[OK] NumPy Versions Aligned
[OK] OWL Dependencies Installed
[OK] OWL Service (systemd) Started
[OK] Desktop Icon Created
[OK] Dashboard Python dependencies installed
[OK] Web Dashboard Configured

[COMPLETE] OWL version installed: X.X.X

Start OWL focusing? (y/n):
```

If you chose not to install the dashboard:

```{code-block} text
:caption: Summary without dashboard

[INFO] Installation Summary:
[OK] System Upgrade
[OK] Camera Detected
[OK] Camera Test
[OK] Virtual Environment Created
[OK] Global NumPy Version Detected
[OK] OpenCV Installed
[OK] NumPy Versions Aligned
[OK] OWL Dependencies Installed
[OK] OWL Service (systemd) Started
[OK] Desktop Icon Created
[SKIPPED] Web Dashboard

[COMPLETE] OWL version installed: X.X.X

Start OWL focusing? (y/n):
```

Enter **y** to start the focusing procedure immediately, or **n** to skip (you can focus later using the desktop icon or command line).

---

## Completing Standalone OWL Setup

When the installer prompts for dashboard setup, choose **yes**:

```{code-block} text
Do you want to add a web dashboard for remote control? (y/n): y
```

After the dashboard Python dependencies are installed, the `web_setup.sh` script launches automatically with `sudo`. This script handles all the networking, MQTT, and dashboard configuration.

### Select Standalone Mode

The dashboard installer will ask you to select a mode:

```{code-block} text
[INFO] OWL Setup Configuration
=======================================

[INFO] Select OWL Operation Mode:
  1) Standalone - Create WiFi hotspot with local MQTT broker and dashboard
  2) Networked  - Connect to existing WiFi network with remote MQTT broker

Select mode (1 or 2): 1
[INFO] Standalone mode selected
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
:caption: Example hotspot configuration

Enter OWL ID number (default: 1): 1
[INFO] Configuring WiFi Hotspot (Standalone Mode)
Enter WiFi hotspot name/SSID (default: OWL-1): OWL-1
Enter WiFi hotspot password (min 8 characters): ********
Re-enter WiFi password to confirm: ********
Confirm and save this password? (y/n): y
```

```{note}
Passwords are masked with `*` characters as you type, similar to entering passwords on websites.
```

### Configuration Summary

After entering your settings, you will see a confirmation summary:

```{code-block} text
:caption: Standalone configuration summary

[INFO] Standalone Configuration Summary:
  Mode: Standalone
  Hostname: owl-1
  WiFi Hotspot SSID: OWL-1
  Hotspot IP: 10.42.0.1/24
  MQTT Broker: localhost:1883 (local)
  Dashboard: https://owl-1.local/

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
    [WARNING] Reconnect under the details entered above. OWL Static IP:
    [WARNING] Make sure you have physical access to the Pi in case of issues
    Do you want to continue? (y/n):

In **Standalone mode**, the Pi will switch from your current WiFi to creating its own hotspot. Your SSH connection **will drop**. After setup completes and the Pi reboots, connect to the new WiFi hotspot (e.g., `OWL-1`) to regain access.
```

### Expected Standalone Setup Output

Below is the step-by-step output you should see during the standalone dashboard setup.

#### Package Installation

```{code-block} text
:caption: System packages

[INFO] Installing required system packages...
[INFO] Installing MQTT broker and clients (standalone mode)...
... (apt-get install output)
[OK] Installing system packages (nginx, ufw, openssl, avahi-daemon, mosquitto, net-tools) completed successfully.
```

#### MQTT Broker Configuration

The installer configures and tests the local MQTT broker:

```{code-block} text
:caption: MQTT broker setup and testing

[INFO] Configuring MQTT broker (standalone mode)...
[INFO] Testing MQTT configuration...
[OK] MQTT configuration syntax is valid
[INFO] Restarting MQTT service...
[INFO] Waiting for MQTT service to stabilize...
[OK] MQTT service is running

[INFO] Testing MQTT broker...
[OK] Mosquitto service is running
[OK] Mosquitto is listening on port 1883
[INFO] Testing local MQTT connection...
[OK] Local MQTT connection successful (attempt 1)
[INFO] Testing network MQTT connection (10.42.0.1)...
[OK] Hotspot interface (10.42.0.1) is configured
[OK] Network MQTT connection successful (attempt 1)
[OK] MQTT configuration file is correct
[OK] MQTT broker core functionality verified
[OK] MQTT broker configuration and testing completed successfully.
```

```{note}
The network MQTT test (10.42.0.1) may show a warning during setup — this is normal because the hotspot isn't fully active yet:

    [WARNING] Network MQTT connection failed - this may be normal during setup

This resolves after the reboot.
```

#### WiFi Hotspot Creation

```{code-block} text
:caption: WiFi hotspot

[INFO] Setting up WiFi hotspot: OWL-1...
[OK] WiFi hotspot configuration completed successfully.
```

#### Firewall Configuration

```{code-block} text
:caption: UFW firewall

[INFO] Configuring firewall (UFW)...
[INFO] Configuring UFW for standalone mode...
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
:caption: Self-signed SSL certificate (valid for 10 years)

[INFO] Generating SSL certificates...
[OK] SSL certificate generation completed successfully.
```

#### Nginx Web Server

```{code-block} text
:caption: Nginx configuration

[INFO] Setting up Nginx web server...
[OK] Nginx configuration is valid
[OK] Nginx configuration completed successfully.
```

#### Avahi (mDNS)

```{code-block} text
:caption: .local domain resolution

[INFO] Configuring Avahi for .local domain resolution...
[OK] Avahi service configuration completed successfully.
```

#### Service Startup

```{code-block} text
:caption: Enabling and starting services

[INFO] Starting and enabling services...
[OK] Starting services completed successfully.
[INFO] Creating systemd service for OWL Dashboard...
[OK] OWL Dashboard service started successfully
[OK] Creating and starting dashboard service completed successfully.
```

#### Configuration Summary File

```{code-block} text
:caption: Config saved to /opt/owl-dash-config.txt

[INFO] Creating configuration summary...
```

The full configuration is saved at `/opt/owl-dash-config.txt`:

```{code-block} text
:caption: /opt/owl-dash-config.txt (Standalone)

OWL Dashboard Configuration
==========================
Mode: Standalone
OWL ID: 1
SSID: OWL-1
WiFi Password: [your password]
IP Address: 10.42.0.1/24
Hostname: owl-1

Access URLs:
- https://owl-1.local/
- https://10.42.0.1/

MQTT Configuration:
- Broker: localhost:1883 (local broker)
- Network Access: 10.42.0.1:1883
- Config: /etc/mosquitto/conf.d/owl.conf
- Main Config: /etc/mosquitto/mosquitto.conf
- Log: /var/log/mosquitto/mosquitto.log

SSL Certificate: /etc/ssl/certs/owl.crt
SSL Private Key: /etc/ssl/private/owl.key
Nginx Config: /etc/nginx/sites-available/owl-dash
Avahi Service: /etc/avahi/services/owl-dash.service
Dashboard Service: /etc/systemd/system/owl-dash.service
```

#### Final Validation

```{code-block} text
:caption: Final checks

[INFO] Performing final system validation...
[INFO] Final MQTT connectivity validation...
[OK] MQTT broker ready for OWL communication
[OK] MQTT broker ready for network clients
[INFO] Testing dashboard service...
[OK] Dashboard service is responding
```

#### MQTT Configuration Reminder

```{code-block} text
:caption: OWL config reminder

[INFO] Checking OWL configuration...
[INFO] Remember to set in OWL config:
  [MQTT]
  enable = True
  broker_ip = localhost
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

[INFO] Standalone Mode - Dashboard Access:
  SSID: OWL-1
  Password: [HIDDEN]
  URLs: https://owl-1.local/ or https://10.42.0.1/
  MQTT: localhost:1883
  Configuration: /opt/owl-dash-config.txt

[INFO] Testing Commands:
  mosquitto_pub -h localhost -t 'owl/test' -m 'hello'
  mosquitto_pub -h 10.42.0.1 -t 'owl/test' -m 'hello'
  mosquitto_sub -h localhost -t 'owl/#'
  mosquitto_sub -h 10.42.0.1 -t 'owl/#'
  systemctl status owl-dash mosquitto
  journalctl -u owl-dash -f

[COMPLETE] OWL setup completed successfully!

[INFO] Setup Complete - Reboot Recommended
======================================
A reboot is recommended to ensure all services start properly.

After reboot:
  • WiFi hotspot 'OWL-1' will be active
  • Dashboard will be available at https://owl-1.local/
  • MQTT broker will be running on port 1883
  • owl.py and dashboard will launch if enabled

Reboot now? (y/n):
```

Enter **y** to reboot immediately (recommended), or **n** to reboot later with `sudo reboot`.

```{admonition} If any steps show [FAIL]
:class: warning

If the summary shows failures, you will see error details:

    [ERROR] Some components failed to install. Check the status above.
    [ERROR] MQTT Broker: MQTT broker configuration and testing failed
    [ERROR] Please fix the above issues before rebooting.

Review the specific error, fix the issue, and re-run `web_setup.sh`:

    sudo ~/owl/web/web_setup.sh
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
For field deployment, focus at your typical operating distance (usually 0.9m for a 1m wide coverage).
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

See [Configuration Guide](../software/configuration/index.md) for detailed explanations.

### Dashboard Configuration (Standalone)

After setup, the full configuration is saved at `/opt/owl-dash-config.txt`. You can view it with:

```bash
cat /opt/owl-dash-config.txt
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
sudo nmcli con up "OWL-1"

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
- [Configuration Guide](../software/configuration/index.md) - Fine-tune detection parameters
- [Operation Guide](../usage/operation/index.md) - Understand detection algorithms
- [Use Cases](../usage/use-cases/index.md) - Mounting and application examples
- [Networked Setup](networked-setup.md) - Connect multiple OWLs or join existing networks
- [Controllers](../controllers/index.md) - Wired and wireless controller options
```
