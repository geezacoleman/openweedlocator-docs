# Glossary

A reference for terminal commands, Linux concepts, and OWL-specific terms. If you're new to the command line or Raspberry Pi, start here.

---

## Terminal Basics

The **terminal** (also called the **command line**) is a text-based interface for controlling your Raspberry Pi. Instead of clicking icons, you type commands and press Enter.

**Opening a terminal:**
- If you have a screen and keyboard connected, press `CTRL + ALT + T` or click the `>_` icon in the taskbar.
- If connecting remotely, use SSH from another computer.

**What the prompt looks like:**

```text
owl@raspberrypi:~ $
```

This tells you:
- `owl` — your username
- `raspberrypi` — the hostname of the Pi
- `~` — your current directory (home folder)
- `$` — ready for a command

**When you see `(owl)` at the start:**

```text
(owl) owl@raspberrypi:~ $
```

The `(owl)` prefix means the OWL virtual environment is active. Many installation commands require this — if it's missing, run `workon owl` to activate it.

---

## Essential Commands

:::{glossary}
:sorted: false

`cd`
    **Change directory.** Moves you into a different folder.
    ```text
    cd ~/owl        # go to the owl folder
    cd ..           # go up one level
    cd ~            # go to your home folder
    ```

`ls`
    **List files.** Shows the files and folders in your current directory.
    ```text
    ls              # list contents
    ls -la          # show hidden files and details
    ```

`pwd`
    **Print working directory.** Shows the full path of where you are right now.

`sudo`
    **Superuser do.** Runs a command with administrator privileges. Required for system-level changes like installing software or managing services.
    ```text
    sudo apt update
    sudo systemctl restart owl.service
    ```

`nano`
    **Text editor.** A simple terminal-based editor for modifying files. Save with `Ctrl + X`, then `Y`, then `Enter`.
    ```text
    nano config.ini
    sudo nano /etc/hosts
    ```

`cat`
    **Display file contents.** Prints the entire contents of a file to the terminal.
    ```text
    cat config.ini
    ```

`chmod`
    **Change file permissions.** Controls who can read, write, or execute a file.
    ```text
    chmod a+x owl.py       # make owl.py executable by everyone
    ```

`pip` / `pip3`
    **Python package installer.** Installs Python libraries. Inside a virtual environment, `pip` and `pip3` are interchangeable.
    ```text
    pip install opencv-contrib-python
    pip install -r requirements.txt
    ```

`source`
    **Reload shell configuration.** Re-reads a configuration file (like `.bashrc`) without restarting the terminal.
    ```text
    source ~/.bashrc
    ```

`reboot`
    **Restart the Raspberry Pi.** Usually run with `sudo`.
    ```text
    sudo reboot
    ```
:::

---

## Git Commands

**Git** is a version control system. For the OWL, you mainly use it to download and update the software.

:::{glossary}
:sorted: false

`git clone`
    **Download a repository.** Copies the entire OWL codebase from GitHub to your Pi.
    ```text
    git clone https://github.com/geezacoleman/OpenWeedLocator owl
    ```

`git pull`
    **Update to the latest version.** Downloads the newest changes from GitHub into your existing copy.
    ```text
    cd ~/owl
    git pull
    ```
:::

---

## Linux & Raspberry Pi Concepts

:::{glossary}
:sorted: false

File paths
    Locations on disk are written as paths separated by `/`:
    - `~/owl/` — the OWL folder in your home directory
    - `/etc/` — system configuration files
    - `/home/owl/` — your full home directory path

Home directory
    Your personal folder, represented by `~`. For the `owl` user, this is `/home/owl/`. When you open a terminal, you start here.

Permissions
    Linux controls who can read, write, or run files. Use `sudo` to run commands as administrator, and `chmod` to change file permissions.

systemd
    The service manager on modern Linux. It handles starting, stopping, and monitoring background programs (called *services*).
    ```text
    sudo systemctl start owl.service     # start the OWL
    sudo systemctl stop owl.service      # stop the OWL
    sudo systemctl status owl.service    # check if it's running
    sudo systemctl enable owl.service    # start automatically on boot
    ```

journalctl
    **View service logs.** Shows output and error messages from systemd services.
    ```text
    journalctl -u owl.service -f        # follow OWL logs in real time
    ```

crontab
    **Scheduled tasks.** A system for running commands automatically at specific times or on events like startup.
    ```text
    sudo crontab -e                      # edit the root cron schedule
    @reboot /usr/local/bin/owl_boot_wrapper.sh   # run on every boot
    ```

`.bashrc`
    **Shell configuration file.** A script that runs every time you open a terminal. Used to set up environment variables and the virtual environment.

Virtual environment
    An isolated copy of Python packages, separate from the system Python. Prevents conflicts between different projects. The OWL uses a virtual environment called `owl`.
    - Activate: `workon owl`
    - Deactivate: `deactivate`
    - When active, you see `(owl)` at the start of the prompt.
:::

---

## Networking Concepts

:::{glossary}
:sorted: false

IP address
    A number that identifies a device on a network (e.g. `192.168.4.1`). Each device on the same network has a unique IP address.

Static IP
    An IP address that doesn't change. The OWL sets a static IP so you can always find it at the same address.

Subnet
    A range of IP addresses that form a local network. Devices on the same subnet can talk to each other directly.

Gateway
    The device (usually a router) that connects your local network to the internet or other networks.

SSH
    **Secure Shell.** A way to control your Raspberry Pi remotely from another computer's terminal. Requires the Pi's IP address and your password.
    ```text
    ssh owl@192.168.4.1
    ssh owl@owl.local
    ```

WiFi hotspot
    A wireless access point created by the OWL itself. In Standalone mode, the OWL broadcasts its own WiFi network you can connect to from a phone or laptop.

SSID
    The name of a WiFi network. The OWL's default hotspot name is `OWL`.

mDNS
    **Multicast DNS.** Lets you use friendly names like `owl.local` instead of IP addresses. Powered by the Avahi service on the Pi.

SSL certificate
    A security certificate that encrypts web traffic (HTTPS). The OWL dashboard uses a self-signed certificate, so your browser may show a warning — this is normal and safe to proceed through.

Firewall
    Software that controls which network connections are allowed. The OWL uses **UFW** (Uncomplicated Firewall) to open only the ports it needs.

Ports
    Numbered channels for network traffic. Key ports used by the OWL:
    - **1883** — MQTT messaging
    - **443** — HTTPS (dashboard)
    - **80** — HTTP (redirects to HTTPS)
:::

---

## OWL-Specific Terms

:::{glossary}
:sorted: false

MQTT
    **Message Queuing Telemetry Transport.** A lightweight messaging protocol used for communication between OWL units and the dashboard. Messages are published to *topics* and received by *subscribers*.

MQTT broker
    The central message server. In Standalone mode, the broker runs on the OWL itself (Mosquitto). In Networked mode, it runs on a central controller.

MQTT topics
    Named channels for messages. For example, the OWL publishes detection data to specific topics that the dashboard subscribes to.

Dashboard
    The web-based control panel for monitoring and adjusting your OWL. Access it from a browser on your phone, tablet, or computer.

OpenCV
    **Open Computer Vision.** The image processing library that powers weed detection. Installed in the OWL virtual environment.

ExG
    **Excess Green Index.** A vegetation detection algorithm that emphasises green pixels. The default detection method for the OWL.

ExHSV
    **Excess Green minus Excess Red, in HSV colour space.** An alternative detection algorithm.

HSV
    **Hue, Saturation, Value.** A colour model used by some detection algorithms. Allows filtering by colour ranges rather than simple green intensity.

GPIO
    **General Purpose Input/Output.** Physical pins on the Raspberry Pi used to control external hardware like relays and solenoids.

Relay
    An electrically operated switch. The OWL activates relays via GPIO pins to trigger solenoid valves for spot spraying.

Solenoid
    An electrically activated valve that controls liquid flow. Connected to the OWL via relays and GPIO pins.

`owl.service`
    The systemd service that runs the main OWL detection program. Starts automatically on boot.

`owl-dash.service`
    The systemd service that runs the web dashboard (Gunicorn + Flask). Only present after Standalone or Networked setup.

Nginx
    A web server used as a reverse proxy for the OWL dashboard. Handles HTTPS encryption and forwards requests to Gunicorn.

Gunicorn
    **Green Unicorn.** A Python web server that runs the Flask dashboard application behind Nginx.

Avahi
    A service that provides mDNS, allowing you to reach the OWL at `owl.local` instead of an IP address.

Mosquitto
    The MQTT broker software installed on the OWL. Handles message routing between OWL units and the dashboard.

`config.ini`
    The main OWL configuration file. Contains detection parameters, camera settings, and GPIO mappings. Located at `~/owl/config.ini`.

`DAY_SENSITIVITY_2.ini`
    A preset sensitivity configuration file. Alternative configurations can be loaded to adjust detection thresholds for different conditions.

NumPy
    A Python library for numerical computing. Used by OpenCV for image processing. Must be version-aligned between the system and virtual environment.
:::

---

```{seealso}
- [Two-Step Install](../../software/two-step-install.md) — Automated OWL setup
- [Detailed Install](../../software/detailed-install.md) — Step-by-step manual setup
- [Standalone Setup](../../controllers/wireless/standalone.md) — WiFi hotspot configuration
- [Networked Setup](../../controllers/wireless/networked.md) — Multi-OWL network configuration
- [Troubleshooting](../../troubleshooting/index.md) — Common issues and solutions
```
