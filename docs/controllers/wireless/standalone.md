# Standalone Setup

When the installer prompts for dashboard setup, choose **yes**:

```{code-block} text
Do you want to add a web dashboard for remote control? (y/n): y
```

After the dashboard Python dependencies are installed, the `web_setup.sh` script launches automatically with `sudo`. This script handles all the networking, MQTT, and dashboard configuration.

```{admonition} Haven't run the installer yet?
:class: tip

Complete the [Two-Step Install](../../software/two-step-install.md) first, then return here when prompted for dashboard setup.
```

## Select Standalone Mode

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

## Configure Your Hotspot

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

## Configuration Summary

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

## Network Change Warning

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

## Expected Standalone Setup Output

Below is the step-by-step output you should see during the standalone dashboard setup.

### Package Installation

```{code-block} text
:caption: System packages

[INFO] Installing required system packages...
[INFO] Installing MQTT broker and clients (standalone mode)...
... (apt-get install output)
[OK] Installing system packages (nginx, ufw, openssl, avahi-daemon, mosquitto, net-tools) completed successfully.
```

### MQTT Broker Configuration

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

### WiFi Hotspot Creation

```{code-block} text
:caption: WiFi hotspot

[INFO] Setting up WiFi hotspot: OWL-1...
[OK] WiFi hotspot configuration completed successfully.
```

### Firewall Configuration

```{code-block} text
:caption: UFW firewall

[INFO] Configuring firewall (UFW)...
[INFO] Configuring UFW for standalone mode...
[OK] UFW firewall configuration completed successfully.
```

### Hostname and Permissions

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

### SSL Certificate

```{code-block} text
:caption: Self-signed SSL certificate (valid for 10 years)

[INFO] Generating SSL certificates...
[OK] SSL certificate generation completed successfully.
```

### Nginx Web Server

```{code-block} text
:caption: Nginx configuration

[INFO] Setting up Nginx web server...
[OK] Nginx configuration is valid
[OK] Nginx configuration completed successfully.
```

### Avahi (mDNS)

```{code-block} text
:caption: .local domain resolution

[INFO] Configuring Avahi for .local domain resolution...
[OK] Avahi service configuration completed successfully.
```

### Service Startup

```{code-block} text
:caption: Enabling and starting services

[INFO] Starting and enabling services...
[OK] Starting services completed successfully.
[INFO] Creating systemd service for OWL Dashboard...
[OK] OWL Dashboard service started successfully
[OK] Creating and starting dashboard service completed successfully.
```

### Configuration Summary File

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

### Final Validation

```{code-block} text
:caption: Final checks

[INFO] Performing final system validation...
[INFO] Final MQTT connectivity validation...
[OK] MQTT broker ready for OWL communication
[OK] MQTT broker ready for network clients
[INFO] Testing dashboard service...
[OK] Dashboard service is responding
```

### MQTT Configuration Reminder

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

### Setup Complete Summary

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
  * WiFi hotspot 'OWL-1' will be active
  * Dashboard will be available at https://owl-1.local/
  * MQTT broker will be running on port 1883
  * owl.py and dashboard will launch if enabled

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

---

## What Gets Configured

The standalone dashboard setup installs and configures:

| Component | Purpose |
|-----------|---------|
| **NetworkManager Hotspot** | Creates WiFi network at 10.42.0.1/24 |
| **Mosquitto** | Local MQTT broker for OWL communication |
| **Nginx** | Web server with SSL for the dashboard |
| **Avahi** | mDNS for `owl-1.local` hostname resolution |
| **Gunicorn** | Python WSGI server for the Flask dashboard |
| **UFW** | Firewall configured to allow required ports |


## Accessing the Dashboard

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

## Dashboard Features

The web dashboard provides:
- Live video feed with detection overlay
- Real-time statistics (detections per minute, relay activations)
- Configuration controls
- System status monitoring
- Start/stop controls
- Ability to upload/view data saved on the USB drive

---

## Troubleshooting

### Dashboard Not Accessible

```bash
# Check if services are running
sudo systemctl status owl-dash nginx mosquitto

# Check hotspot is active
nmcli con show --active

# Restart network
sudo systemctl restart NetworkManager
```

### WiFi Hotspot Not Appearing

```bash
# Check NetworkManager connections
nmcli con show

# If not active, try:
sudo nmcli con up "OWL-1"

# Or restart NetworkManager
sudo systemctl restart NetworkManager
```

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
# Interface Options > Camera > Enable
```

For more troubleshooting help, see the [full Troubleshooting Guide](../../troubleshooting/index.md).

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

### Dashboard Services

```bash
# Restart dashboard
sudo systemctl restart owl-dash.service

# View dashboard logs
journalctl -u owl-dash.service -f

# MQTT broker
sudo systemctl status mosquitto
```

### MQTT Testing

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

```{seealso}
- [Configuration Guide](../../software/configuration/index.md) - Fine-tune detection parameters
- [Operation Guide](../../usage/operation/index.md) - Understand detection algorithms
- [Use Cases](../../usage/use-cases/index.md) - Mounting and application examples
- [Networked Setup](networked.md) - Connect multiple OWLs or join existing networks
- [Controllers](../../controllers/index.md) - Wired and wireless controller options
```
