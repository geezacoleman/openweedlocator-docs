# Standalone Setup

```{warning}
**Development Branch — Subject to Change**

The wireless dashboard features described on this page are currently on the `wireless-display` branch and have not yet been merged into `main`. The setup process and behaviour may change before the final release.

To use these features, you must clone from the branch:

    git clone -b wireless-display https://github.com/geezacoleman/OpenWeedLocator owl
```

Standalone mode turns a single OWL into a self-contained unit — it creates its own WiFi hotspot and runs its own dashboard. Connect your phone, tablet, or laptop to the OWL's WiFi to monitor and control it. No existing network or router required.

```{admonition} Haven't run the installer yet?
:class: tip

Complete the [Two-Step Install](../../software/two-step-install.md) first, then return here when prompted for dashboard setup.
```

## How it works

The OWL creates a WiFi hotspot (like a mobile phone sharing its connection). You connect your device to this hotspot and open the dashboard in a browser. Everything runs locally on the OWL Pi — no internet connection needed.

| Component | What it does |
|-----------|-------------|
| WiFi hotspot | Creates a network at 10.42.0.1 that your phone/laptop connects to |
| MQTT broker | Local message system for communication between detection and dashboard |
| Dashboard | Web interface with live video, detection stats, start/stop controls, and configuration |
| Nginx + SSL | Secure web server that serves the dashboard and video feed |

```{note}
For managing **multiple OWLs** from a single screen, see [Networked Setup](networked.md) instead.
```

## Run the setup

### Choose standalone mode

During the OWL installation (`bash owl_setup.sh`), the installer will ask if you want a web dashboard. Say **yes**, then select **Standalone** mode:

```{code-block} text
Do you want to add a web dashboard for remote control? (y/n): y
```

```{code-block} text
[INFO] Select OWL Operation Mode:
  1) Standalone - Create WiFi hotspot with local MQTT broker and dashboard
  2) Networked  - Connect to existing WiFi network with remote MQTT broker

Select mode (1 or 2): 1
[INFO] Standalone mode selected
```

Then configure your hotspot:

```{code-block} text
Enter OWL ID number (default: 1): 1
[INFO] Configuring WiFi Hotspot (Standalone Mode)
Enter WiFi hotspot name/SSID (default: OWL-1): OWL-1
Enter WiFi hotspot password (min 8 characters): ********
Re-enter WiFi password to confirm: ********
Confirm and save this password? (y/n): y
```

| Setting | Default | Description |
|---------|---------|-------------|
| OWL ID | 1 | Unique identifier — sets the hostname to `owl-1` |
| Hotspot SSID | OWL-1 | WiFi network name others will see |
| Hotspot Password | (none) | Minimum 8 characters |

### Review and confirm

Check the configuration summary and confirm:

```{code-block} text
[INFO] Standalone Configuration Summary:
  Mode: Standalone
  Hostname: owl-1
  WiFi Hotspot SSID: OWL-1
  Hotspot IP: 10.42.0.1/24
  MQTT Broker: localhost:1883 (local)
  Dashboard: https://owl-1.local/

Continue with these settings? (y/n): y
```

```{warning}
**If you're connected via SSH:** The Pi will switch from your current WiFi to creating its own hotspot. Your SSH connection will drop. After setup completes and the Pi reboots, connect to the new hotspot (e.g., `OWL-1`) to regain access.
```

The installation runs automatically. Watch for `[OK]` messages — if everything passes, you'll see:

```{code-block} text
[INFO] OWL Setup Summary:
[OK] System Packages
[OK] MQTT Configuration
[OK] Network Configuration
[OK] Hostname Configuration
[OK] UFW Firewall Configuration
[OK] Fan Control Permissions
[OK] Service Control Permissions
[OK] Nginx Configuration
[OK] SSL Certificate Generation
[OK] Avahi Service Configuration
[OK] Service Management
[OK] OWL Config Files

[COMPLETE] OWL setup completed successfully!
```

<details>
<summary>What to expect during installation (click to expand)</summary>

The script installs and configures each component in order:

```text
[INFO] Installing required system packages...
[INFO] Installing MQTT broker and clients (standalone mode)...
[OK] Installing system packages completed successfully.
[INFO] Configuring MQTT broker (standalone mode)...
[INFO] Testing MQTT configuration...
[OK] MQTT configuration syntax is valid
[INFO] Restarting MQTT service...
[OK] MQTT service is running
[INFO] Testing MQTT broker...
[OK] Mosquitto service is running
[OK] Mosquitto is listening on port 1883
[INFO] Testing local MQTT connection...
[OK] Local MQTT connection successful (attempt 1)
[OK] MQTT configuration file is correct
[OK] MQTT broker core functionality verified
[OK] MQTT broker configuration and testing completed successfully.
[INFO] Setting up WiFi hotspot: OWL-1...
[OK] WiFi hotspot configuration completed successfully.
[INFO] Configuring firewall (UFW)...
[OK] UFW firewall configuration completed successfully.
[INFO] Setting hostname to owl-1...
[OK] Setting hostname completed successfully.
[INFO] Configuring sudo permissions for Pi 5 fan control...
[OK] Fan control sudo permissions completed successfully.
[INFO] Configuring sudo permissions for OWL service control...
[OK] Service control sudo permissions completed successfully.
[INFO] Generating SSL certificates...
[OK] SSL certificate generation completed successfully.
[INFO] Setting up Nginx web server...
[OK] Nginx configuration is valid
[OK] Nginx configuration completed successfully.
[INFO] Configuring Avahi for .local domain resolution...
[OK] Avahi service configuration completed successfully.
[INFO] Starting and enabling services...
[OK] Starting services completed successfully.
[INFO] Creating systemd service for OWL Dashboard...
[OK] OWL Dashboard service started successfully
[OK] Creating and starting dashboard service completed successfully.
[INFO] Updating OWL configuration files with network settings...
[OK] OWL config files updated.
[INFO] Performing final system validation...
[INFO] Final MQTT connectivity validation...
[OK] MQTT broker ready for OWL communication
[OK] MQTT broker ready for network clients
[INFO] Testing dashboard service...
[OK] Dashboard service is responding
```

The network MQTT test (`10.42.0.1`) may show a warning during setup — this is normal because the hotspot isn't fully active yet. It resolves after the reboot.

</details>

When prompted, reboot the OWL:

```text
Reboot now? (y/n): y
```

```{tip}
If you need to re-run just the network/dashboard setup later (without reinstalling everything), use:

    sudo bash ~/owl/controller/shared/setup.sh
```

```{admonition} If any steps show [FAIL]
:class: warning

The summary will show error details. Review the specific error, fix the issue, and re-run:

    sudo bash ~/owl/controller/shared/setup.sh
```

## Connect to the dashboard

After the reboot:

1. On your phone, tablet, or laptop, look for the WiFi network (e.g., `OWL-1`)
2. Connect using the password you set during setup
3. Open a browser and go to `https://owl-1.local/` or `https://10.42.0.1/`

The actual address uses your OWL ID — so `owl-2` would be at `https://owl-2.local/`.

```{note}
Your browser will show a security warning because the SSL certificate is self-generated. This is normal and safe to click through — the connection is encrypted.
```

The dashboard provides live video with detection overlay, real-time statistics, start/stop controls, configuration adjustments, and wireless data downloads.

## Using the dashboard

### Controls

The Dashboard tab has large toggle buttons for the main functions:

- **Detection** / **Tracking** — tap to start or stop. Shows ON/OFF state
- **Recording** — shows a blinking red dot when active (like a camera record indicator). Tap to toggle
- **All Nozzles** — turns green when engaged (blanket spray mode). Tap to toggle
- **Sensitivity** — switch between Low, Medium, and High detection presets
- **Fan** — Auto or 100% manual override

### Using a wired controller

If you have a [wired controller](../wired/index.md) (UTE or Advanced) connected, the dashboard only locks the controls that the hardware switch manages. Everything else stays interactive:

| Controller | What the hardware controls | What you can still use on the dashboard |
|------------|--------------------------|----------------------------------------|
| UTE | Recording | Detection, tracking, nozzles, sensitivity, fan |
| Advanced | Recording, detection, sensitivity | Tracking, nozzles, fan |

Locked controls show a small lock icon. Use the physical switch to change them.

### GPS and image tagging

If you open the dashboard on a phone with GPS enabled, captured images are automatically tagged with your location. This is useful for mapping weed hotspots — you can plot geotagged images on a map later.

To use GPS:

1. Open the dashboard on your phone (GPS must be allowed in the browser)
2. The GPS toggle in the dashboard shows your accuracy
3. While GPS is active, every saved image includes location coordinates

```{tip}
GPS tagging relies on your phone's browser sending location updates. If you close the browser, switch to another app, or lose signal, tagging stops within a few seconds. Reopen the dashboard to resume.
```

If you have a wired controller connected, a GPS status LED on the controller box shows the current state:

| LED pattern | Meaning |
|-------------|---------|
| Solid on | GPS lock — images are being tagged |
| Regular flashing | Acquiring — waiting for signal |
| Double flash, pause | Error or stale — phone disconnected or no signal |
| Off | GPS not active |

## Downloading recorded images

```{important}
You need a USB drive plugged into the OWL to record images. See [USB drive requirements](../wired/index.md) for recommended drives.
```

When recording is enabled, the OWL saves images to the USB drive in date-based folders (e.g., `20260315/`). You can download these wirelessly without unplugging the drive.

### The downloads page

Open `https://owl-1.local/downloads` in your browser, or tap "Download sessions as ZIP" at the bottom of the Storage tab.

The page lists each recording session by date, with image count and total size. From here you can:

- **Preview images** — tap a session to expand a thumbnail grid. Tap any thumbnail to see the full image
- **Download as ZIP** — downloads all images from that session as a single file
- **Delete a session** — permanently removes the images from the USB drive

A storage bar at the bottom shows how full the USB drive is.

```{warning}
Deleting a session permanently removes the images from the USB drive. There is no undo. Download the data first if you need it.
```

## Troubleshooting

### Hotspot or dashboard not working

```bash
# Check if the hotspot is active
nmcli con show --active

# If the hotspot isn't listed, start it manually
sudo nmcli con up "OWL-1"

# Check all services are running
sudo systemctl status owl-dash nginx mosquitto

# Restart everything
sudo systemctl restart NetworkManager
sudo systemctl restart owl-dash nginx mosquitto

# View dashboard logs
journalctl -u owl-dash -f
```

### OWL service or camera problems

```bash
# Check the detection service
sudo systemctl status owl.service
journalctl -u owl.service -f

# Test the camera
rpicam-hello --list-cameras

# If "No cameras available":
# 1. Check the ribbon cable connection
# 2. Enable camera in raspi-config:
sudo raspi-config
# Interface Options > Camera > Enable
```

For more help, see the [full Troubleshooting Guide](../../troubleshooting/index.md).

## Reference

### Configuration files

The setup script writes these automatically — you should not need to edit them manually.

| File | Location | Purpose |
|------|----------|---------|
| `GENERAL_CONFIG.ini` | `~/owl/config/` | Detection parameters, sensitivity presets, relay mapping |
| `CONTROLLER.ini` | `~/owl/config/` | MQTT settings, network mode, dashboard port |
| Network config summary | `/opt/owl-dash-config.txt` | Human-readable record of your setup choices |

### System services

| Service | Purpose |
|---------|---------|
| `owl.service` | Weed detection and camera |
| `owl-dash` | Dashboard web application |
| `mosquitto` | MQTT message broker |
| `nginx` | Web server (SSL, video proxy) |

Common commands:

```bash
# Check status
sudo systemctl status owl.service owl-dash mosquitto

# Restart detection or dashboard
sudo systemctl restart owl.service
sudo systemctl restart owl-dash

# View live logs
journalctl -u owl.service -f
journalctl -u owl-dash -f
```

### MQTT topics

In standalone mode, topics use a simple structure (no device ID prefix):

| Topic | Purpose |
|-------|---------|
| `owl/state` | Full device state (detection mode, algorithm, settings) |
| `owl/commands` | Control commands (start, stop, config changes) |
| `owl/status` | Heartbeat and connectivity |
| `owl/detection` | Weed detection events |

To test MQTT:

```bash
# Subscribe to all OWL messages
mosquitto_sub -h localhost -t "owl/#" -v

# Send a test message
mosquitto_pub -h localhost -t "owl/test" -m "hello"
```

## Next steps

```{seealso}
- [Networked Setup](networked.md) - Connect multiple OWLs to a shared network
- [Configuration Guide](../../software/configuration/index.md) - Fine-tune detection parameters
- [Operation Guide](../../usage/operation/index.md) - Understand detection algorithms
- [Use Cases](../../usage/use-cases/index.md) - Mounting and application examples
- [Controllers](../../controllers/index.md) - Wired and wireless controller options
```
