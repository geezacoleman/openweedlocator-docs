# Networked Setup

Networked mode connects the OWL to an existing WiFi network with a remote MQTT broker. Ideal for multi-OWL deployments with central monitoring.

```{admonition} Best For
:class: tip

- Multiple OWL systems working together
- Central monitoring and control
- Integration with existing farm networks
- Internet access on the OWL
```

---

## Overview

In networked mode, the OWL:
- Joins an existing WiFi network as a client
- Connects to a remote MQTT broker (on a controller)
- Provides video feed via HTTPS
- Uses a static IP address

| Component | Configuration |
|-----------|---------------|
| WiFi Mode | Client (joins network) |
| IP Address | Static (user-defined) |
| MQTT Broker | Remote (controller IP) |
| Dashboard | Video feed only |

---

## Prerequisites

Before running the setup script, you need:

1. **WiFi Network Details**
   - SSID (network name)
   - Password

2. **Network Planning**
   - Static IP address for this OWL
   - Gateway IP (usually router)
   - Controller/MQTT broker IP

3. **Central Controller**
   - Raspberry Pi or server running MQTT broker
   - Accessible on the same network

---

## Running the Setup Script

```bash
sudo ./web_setup.sh
```

### Configuration Prompts

When you run the script, you'll be asked:

1. **Mode Selection** - Select `2` for Networked
2. **OWL ID** - Number to identify this OWL
3. **WiFi SSID** - Network name to join
4. **WiFi Password** - Network password
5. **Static IP** - IP address for this OWL (e.g., 192.168.1.11)
6. **Gateway IP** - Router IP (default: 192.168.1.1)
7. **Controller IP** - MQTT broker IP (default: 192.168.1.2)

### Example Configuration

```
Select mode (1 or 2): 2
Enter OWL ID number (default: 1): 1
Enter WiFi network name (SSID) to join: FarmNetwork
Enter WiFi network password: ********
Re-enter WiFi password to confirm: ********
Enter static IP for this OWL (e.g., 192.168.1.11): 192.168.1.11
Enter gateway IP (default: 192.168.1.1): 192.168.1.1
Enter central controller IP (MQTT broker; default: 192.168.1.2): 192.168.1.2
```

### IP Validation

The script validates that all IPs are in the same subnet:
- OWL static IP, gateway, and controller must share the same base (e.g., 192.168.1.x)
- Host octet cannot be .0 or .255 (reserved)

---

## What Gets Installed

The script installs and configures:

| Service | Purpose |
|---------|---------|
| mosquitto-clients | MQTT testing tools (no broker) |
| nginx | Web server for video feed |
| network-manager | WiFi client management |
| avahi-daemon | .local domain resolution |
| ssl-cert, openssl | SSL certificate generation |
| ufw | Firewall configuration |

```{admonition} Note
:class: note

Unlike standalone mode, networked mode does NOT install the mosquitto broker - it uses the remote broker on the controller.
```

---

## Network Configuration

### WiFi Client

The WiFi client connection is configured using NetworkManager:

- **Connection Type**: WiFi client
- **Security**: WPA2-PSK
- **IP Method**: Manual (static)
- **DNS**: 8.8.8.8, 8.8.4.4 (Google DNS)
- **Autoconnect**: Yes (priority 100)

### Example nmcli Configuration

```bash
nmcli con add type wifi con-name "FarmNetwork" ifname wlan0 ssid "FarmNetwork"
nmcli con modify "FarmNetwork" wifi-sec.key-mgmt wpa-psk
nmcli con modify "FarmNetwork" wifi-sec.psk "password"
nmcli con modify "FarmNetwork" ipv4.addresses 192.168.1.11/24
nmcli con modify "FarmNetwork" ipv4.gateway 192.168.1.1
nmcli con modify "FarmNetwork" ipv4.dns "8.8.8.8 8.8.4.4"
nmcli con modify "FarmNetwork" ipv4.method manual
nmcli con modify "FarmNetwork" connection.autoconnect yes
```

---

## Accessing the OWL

After setup and reboot:

### Video Feed

Connect from any device on the same network:
- https://owl-1.local/video_feed
- https://192.168.1.11/video_feed

```{admonition} SSL Certificate Warning
:class: note

You'll see a browser security warning because the SSL certificate is self-signed. This is normal - click "Advanced" and "Proceed" to continue.
```

### SSH Access

```bash
ssh owl@owl-1.local
# or
ssh owl@192.168.1.11
```

---

## Testing the Setup

### Test Network Connectivity

```bash
# Ping the controller
ping 192.168.1.2

# Ping the gateway
ping 192.168.1.1

# Check WiFi connection
nmcli connection show --active
```

### Test MQTT Connection

```bash
# Publish to remote broker
mosquitto_pub -h 192.168.1.2 -t "owl/test" -m "hello from owl-1"

# Subscribe to OWL messages (on controller)
mosquitto_sub -h 192.168.1.2 -t "owl/#"
```

### Check Services

```bash
# Check services
systemctl status nginx avahi-daemon

# Check video feed
curl -k https://localhost/video_feed
```

---

## OWL Configuration

Update the OWL config file to use the remote MQTT broker:

**File:** `/home/owl/owl/config/DAY_SENSITIVITY_2.ini`

```ini
[MQTT]
enable = True
broker_ip = 192.168.1.2
broker_port = 1883
device_id = owl-1
```

---

## Multi-OWL Network Example

For a farm with 4 OWLs and a central controller:

| Device | Hostname | Static IP | Role |
|--------|----------|-----------|------|
| Controller | controller | 192.168.1.2 | MQTT broker, central dashboard |
| OWL 1 | owl-1 | 192.168.1.11 | Weed detection unit |
| OWL 2 | owl-2 | 192.168.1.12 | Weed detection unit |
| OWL 3 | owl-3 | 192.168.1.13 | Weed detection unit |
| OWL 4 | owl-4 | 192.168.1.14 | Weed detection unit |
| Router | router | 192.168.1.1 | Network gateway |

---

## Firewall Rules

UFW firewall is configured to allow:

| Port | Service |
|------|---------|
| 22/tcp | SSH |
| 80/tcp | HTTP (redirects to HTTPS) |
| 443/tcp | HTTPS (video feed) |
| 1883/tcp | MQTT (outgoing to controller) |

---

## Files Created

| File | Purpose |
|------|---------|
| `/etc/nginx/sites-available/owl-dash` | Nginx configuration (video only) |
| `/etc/avahi/services/owl-dash.service` | Avahi service definition |
| `/etc/ssl/certs/owl.crt` | SSL certificate |
| `/etc/ssl/private/owl.key` | SSL private key |
| `/opt/owl-dash-config.txt` | Configuration summary |

---

## Nginx Configuration (Networked Mode)

In networked mode, nginx only serves the video feed:

```nginx
server {
    listen 443 ssl;
    server_name owl-1.local 192.168.1.11;

    ssl_certificate /etc/ssl/certs/owl.crt;
    ssl_certificate_key /etc/ssl/private/owl.key;

    location = / {
        return 200 "<html>...</html>";
        add_header Content-Type text/html;
    }

    location /video_feed {
        proxy_pass http://127.0.0.1:8001/stream.mjpg;
        proxy_buffering off;
        proxy_cache off;
    }
}
```

---

## Troubleshooting

### Cannot Connect to WiFi
- Verify SSID and password are correct
- Check WiFi signal strength
- View connection status: `nmcli connection show`
- Check logs: `journalctl -u NetworkManager -f`

### Cannot Reach Controller
- Verify IPs are on same subnet
- Ping the controller: `ping 192.168.1.2`
- Check firewall on controller allows port 1883
- Verify MQTT broker is running on controller

### MQTT Connection Failed
- Test with: `mosquitto_pub -h 192.168.1.2 -t test -m test`
- Check controller MQTT config allows anonymous connections
- Verify network connectivity to controller

### Video Feed Not Working
- Check nginx status: `sudo systemctl status nginx`
- Verify owl.py is running: `systemctl status owl`
- Check video stream port: `curl http://localhost:8001/stream.mjpg`

---

## Controller Setup

The central controller needs an MQTT broker installed. On a Raspberry Pi:

```bash
# Install mosquitto broker
sudo apt-get install mosquitto mosquitto-clients

# Configure for network access
sudo tee /etc/mosquitto/conf.d/owl.conf > /dev/null <<EOF
allow_anonymous true
listener 1883 0.0.0.0
EOF

# Restart mosquitto
sudo systemctl restart mosquitto
```

---

## Next Steps

- [Operation Guide](../../usage/operation/index.md) - Start using your OWL
- [Configuration](../../software/configuration/index.md) - Adjust detection parameters
- [Controller Setup](../../software/controller/index.md) - Advanced controller hardware
- [Standalone Setup](../standalone/index.md) - Alternative single-OWL configuration

