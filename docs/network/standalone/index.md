# Standalone Network Setup

Standalone mode creates a self-contained WiFi hotspot with a local MQTT broker and dashboard. Connect your phone, tablet, or laptop directly to the OWL.

```{admonition} Best For
:class: tip

- Single OWL deployments
- Field operation without network infrastructure
- Simple setup with full dashboard access
```

---

## Overview

In standalone mode, the OWL:
- Creates a WiFi access point (hotspot)
- Runs a local MQTT broker (mosquitto)
- Hosts the full OWL dashboard
- Provides video feed and control interface

| Component | Configuration |
|-----------|---------------|
| WiFi Mode | Access Point (hotspot) |
| Hotspot IP | 10.42.0.1/24 |
| MQTT Broker | localhost:1883 |
| Dashboard | https://owl-{ID}.local/ |

---

## Running the Setup Script

The setup script configures all network services automatically.

```bash
sudo ./web_setup.sh
```

### Configuration Prompts

When you run the script, you'll be asked:

1. **Mode Selection** - Select `1` for Standalone
2. **OWL ID** - Number to identify this OWL (default: 1)
3. **WiFi SSID** - Hotspot name (default: OWL-{ID})
4. **WiFi Password** - Minimum 8 characters

### Example Configuration

```
Select mode (1 or 2): 1
Enter OWL ID number (default: 1): 1
Enter WiFi hotspot name/SSID (default: OWL-1): OWL-1
Enter WiFi hotspot password (min 8 characters): ********
Re-enter WiFi password to confirm: ********
Confirm and save this password? (y/n): y
```

---

## What Gets Installed

The script installs and configures:

| Service | Purpose |
|---------|---------|
| mosquitto | MQTT broker |
| mosquitto-clients | MQTT testing tools |
| nginx | Web server/reverse proxy |
| network-manager | WiFi hotspot management |
| avahi-daemon | .local domain resolution |
| ssl-cert, openssl | SSL certificate generation |
| ufw | Firewall configuration |

---

## Network Configuration

### WiFi Hotspot

The hotspot is configured using NetworkManager:

- **SSID**: User-defined (e.g., OWL-1)
- **Security**: WPA2-PSK (RSN/CCMP)
- **Band**: 2.4 GHz (bg)
- **IP Method**: Shared (NAT for clients)
- **IP Address**: 10.42.0.1/24

### MQTT Broker

The local MQTT broker configuration (`/etc/mosquitto/conf.d/owl.conf`):

```ini
# OWL MQTT Configuration
allow_anonymous true
listener 1883 0.0.0.0
```

---

## Accessing the OWL

After setup and reboot:

### Dashboard Access

1. Connect to the OWL WiFi hotspot (e.g., "OWL-1")
2. Open a browser and navigate to:
   - https://owl-1.local/ (using hostname)
   - https://10.42.0.1/ (using IP)

```{admonition} SSL Certificate Warning
:class: note

You'll see a browser security warning because the SSL certificate is self-signed. This is normal - click "Advanced" and "Proceed" to continue.
```

### Video Feed

Direct video feed available at:
- https://owl-1.local/video_feed
- https://10.42.0.1/video_feed

### SSH Access

```bash
ssh owl@owl-1.local
# or
ssh owl@10.42.0.1
```

---

## Testing the Setup

### Test MQTT Broker

```bash
# Test local connection
mosquitto_pub -h localhost -t "owl/test" -m "hello"

# Test network connection (from hotspot IP)
mosquitto_pub -h 10.42.0.1 -t "owl/test" -m "hello"

# Subscribe to all OWL messages
mosquitto_sub -h localhost -t "owl/#"
```

### Check Services

```bash
# Check all services
systemctl status owl-dash mosquitto nginx avahi-daemon

# View dashboard logs
journalctl -u owl-dash -f

# View MQTT logs
journalctl -u mosquitto -f
```

---

## OWL Configuration

Update the OWL config file to use the local MQTT broker:

**File:** `/home/owl/owl/config/DAY_SENSITIVITY_2.ini`

```ini
[MQTT]
enable = True
broker_ip = localhost
broker_port = 1883
device_id = owl-1
```

---

## Firewall Rules

UFW firewall is configured to allow:

| Port | Service |
|------|---------|
| 22/tcp | SSH |
| 80/tcp | HTTP (redirects to HTTPS) |
| 443/tcp | HTTPS (dashboard) |
| 1883/tcp | MQTT |
| 67/udp | DHCP server |
| 68/udp | DHCP client |
| 10.42.0.0/24 | All traffic from hotspot clients |

---

## Files Created

| File | Purpose |
|------|---------|
| `/etc/mosquitto/conf.d/owl.conf` | MQTT configuration |
| `/etc/nginx/sites-available/owl-dash` | Nginx configuration |
| `/etc/avahi/services/owl-dash.service` | Avahi service definition |
| `/etc/systemd/system/owl-dash.service` | Dashboard service |
| `/etc/ssl/certs/owl.crt` | SSL certificate |
| `/etc/ssl/private/owl.key` | SSL private key |
| `/opt/owl-dash-config.txt` | Configuration summary |

---

## Troubleshooting

### Cannot Connect to Hotspot
- Check that the hotspot is active: `nmcli connection show`
- Restart NetworkManager: `sudo systemctl restart NetworkManager`
- Verify hotspot configuration: `nmcli connection show OWL-1`

### Dashboard Not Loading
- Check nginx status: `sudo systemctl status nginx`
- Check dashboard service: `sudo systemctl status owl-dash`
- View logs: `journalctl -u owl-dash -f`

### MQTT Connection Failed
- Check mosquitto status: `sudo systemctl status mosquitto`
- Test local connection: `mosquitto_pub -h localhost -t test -m test`
- View MQTT logs: `journalctl -u mosquitto -f`

---

## Next Steps

- [Operation Guide](../../usage/operation/index.md) - Start using your OWL
- [Configuration](../../software/configuration/index.md) - Adjust detection parameters
- [Networked Setup](../networked/index.md) - Alternative multi-OWL configuration

