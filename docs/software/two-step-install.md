# Two-Step Install

This guide covers setting up an OWL unit using the automated installer:

1. **Step 1** — Flash Raspberry Pi OS onto an SD card
2. **Step 2** — Download and run the setup script

The installer handles everything: system updates, camera check, Python environment, OpenCV, dependencies, and boot configuration. It takes around 20-30 minutes.

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Hardware | Fully assembled OWL with Raspberry Pi and camera |
| Camera | Connected Raspberry Pi camera module or USB camera |
| Internet | WiFi or Ethernet connection (for initial setup only) |

## Step 1: Prepare the Raspberry Pi

### Flash the operating system

1. Download and install [Raspberry Pi Imager](https://www.raspberrypi.com/software/)
2. Select **Raspberry Pi OS (64-bit)** as the operating system
3. Click the **settings cog** before writing to configure:

```{important}
**Required settings:**
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

### Connect to your Pi

**Option A: Direct connection** — Connect a monitor and keyboard directly to the Pi. Simplest approach, avoids any SSH dropout issues during network changes.

**Option B: SSH** — Find the Pi's IP address and connect from another device on the same network:

```bash
ssh owl@<your-pi-ip-address>
```

```{tip}
It's often convenient to connect the Pi to a phone hotspot for internet access. If your computer is on the same hotspot, you can SSH in easily — check your phone's hotspot settings for the Pi's IP address.
```

## Step 2: Run the installer

Open a terminal (press Ctrl+Alt+T if using a monitor) and run:

```bash
git clone https://github.com/geezacoleman/OpenWeedLocator owl
cd owl
bash owl_setup.sh
```

```{warning}
**Dashboard features require the `wireless-display` branch.** If you plan to set up a Standalone or Networked dashboard, clone from this branch instead:

    git clone -b wireless-display https://github.com/geezacoleman/OpenWeedLocator owl

For a **Basic OWL** (no dashboard), cloning from `main` is fine.
```

```{warning}
**Do not run with sudo!** The installer will request elevated permissions only when needed.
```

The installer will work through system updates, camera checks, Python environment setup, OpenCV, and dependencies. You'll see `[OK]` for each successful step. If a step fails, you'll see `[FAIL]` with an error message.

When the installer reaches the dashboard prompt, choose your setup path:

```{code-block} text
Do you want to add a web dashboard for remote control? (y/n):
```

```{admonition} Choosing your setup type
:class: important

**Basic OWL** — Enter **n**. The installer finishes and you're done.

**Standalone OWL** — Enter **y**, then select option 1. This creates a WiFi hotspot with a local dashboard. See [Standalone Setup](../controllers/wireless/standalone.md) for the dashboard configuration steps.

**Networked OWL** — Enter **y**, then select option 2. This connects to an existing WiFi network with a central controller. See [Networked Setup](../controllers/wireless/networked.md) for the dashboard configuration steps.
```

After all steps complete, you'll see the final summary:

```{code-block} text
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

Enter **y** to start the focusing procedure immediately, or **n** to focus later using the desktop icon.

<details>
<summary>Full installation output step-by-step (click to expand)</summary>

**System update:**

```text
[INFO] Updating and upgrading the system...
[OK] System upgrade completed successfully.
```

**Camera check and test:**

```text
[INFO] Checking for connected Raspberry Pi camera...
[INFO] Camera detected successfully.
[INFO] Testing camera functionality...
[INFO] Camera is working correctly.
```

If no camera is found, the installer will pause and ask you to connect one. If the camera test fails, it will attempt a full system upgrade to resolve driver issues and retry automatically.

**Space cleanup:**

```text
[INFO] Freeing up space by removing unnecessary packages...
[OK] Cleaning up completed successfully.
```

**Python environment:**

```text
[INFO] Setting up the virtual environment...
[OK] Installing virtualenv packages completed successfully.
[OK] Virtualenv configuration completed successfully.
[INFO] Creating the 'owl' virtual environment...
[OK] Creating virtual environment 'owl' completed successfully.
[INFO] Checking NumPy consistency (system vs venv) ...
[OK] System NumPy: 1.24.2 at /usr/lib/python3/dist-packages/numpy/__init__.py.
[INFO] Venv NumPy: 1.24.2 at /usr/lib/python3/dist-packages/numpy/__init__.py
[OK] NumPy versions match: 1.24.2
```

If the NumPy versions differ between system and virtual environment, the installer aligns them automatically.

**OpenCV and dependencies:**

```text
[INFO] Installing opencv-contrib-python in the 'owl' virtual environment...
[OK] Installing opencv-contrib-python completed successfully.
[OK] Final check: NumPy 1.24.2, OpenCV 4.9.0
[INFO] Installing the OWL Python dependencies...
[OK] Installing dependencies from requirements.txt completed successfully.
```

**Service and desktop setup:**

```text
[INFO] Setting up OWL to start on boot with systemd...
[INFO] Creating systemd service for OWL...
[INFO] Starting OWL service...
[OK] OWL systemd service is active
[OK] Creating OWL systemd service completed successfully.
[INFO] Setting desktop background...
[OK] Setting desktop background completed successfully.
[INFO] Creating OWL Focusing desktop icon...
[OK] Creating desktop icon completed successfully.
```

**Dashboard setup (if selected):**

```text
[INFO] Setting up OWL Dashboard...
[INFO] Installing dashboard Python dependencies...
[OK] Installing dashboard Python dependencies completed successfully.
[INFO] Verifying Python package installations...
[OK] Flask: 3.0.0, Gunicorn: 21.2.0, Paho-MQTT: installed
[OK] Verifying Python dependencies completed successfully.
```

After the dashboard dependencies install, the `controller/shared/setup.sh` script runs automatically. See the [Standalone](../controllers/wireless/standalone.md) or [Networked](../controllers/wireless/networked.md) pages for what happens next.

</details>

```{admonition} If any steps show [FAIL]
:class: warning

The summary will show error details. Review the specific error and re-run the installer:

    cd ~/owl
    bash owl_setup.sh

If only the dashboard setup needs re-running:

    sudo bash ~/owl/controller/shared/setup.sh
```

```{admonition} If OWL is already running
:class: note

If you're re-running the installer and `owl.service` is already active, you'll be prompted to stop it first. Enter **y** to continue.
```

## After installation

### Focus your camera

Proper focus is critical for accurate weed detection.

If you said **y** to the focusing prompt at the end of installation, the focus tool is already running. Otherwise, start it using the **Focus** desktop icon, or from the command line:

```bash
~/owl/./owl.py --focus
```

1. Point the camera at vegetation or a focus target
2. Observe the **sharpness value** displayed on screen
3. Slowly rotate the lens focus ring to find the **highest sharpness value**
4. Lock the focus ring (if your lens has a lock screw)

```{tip}
For field deployment, focus at your typical operating distance (usually 0.9 m for 1 m wide coverage).
```

### Verify the installation

```bash
# Check the OWL detection service is running
sudo systemctl status owl.service

# Check the dashboard service (Standalone only)
sudo systemctl status owl-dash

# View live detection logs
journalctl -u owl.service -f

# Run with on-screen display for testing
~/owl/./owl.py --show-display
```

## Next steps

```{admonition} Set up your dashboard
:class: tip

If you chose Standalone or Networked mode during installation, continue with your dashboard setup:

- [Standalone Setup](../controllers/wireless/standalone.md) — WiFi hotspot with local dashboard
- [Networked Setup](../controllers/wireless/networked.md) — Join existing network with central controller
```

```{seealso}
- [Configuration Guide](configuration/index.md) - Fine-tune detection parameters
- [Operation Guide](../usage/operation/index.md) - Understand detection algorithms
- [Use Cases](../usage/use-cases/index.md) - Mounting and application examples
- [Controllers](../controllers/index.md) - Wired and wireless controller options
```
