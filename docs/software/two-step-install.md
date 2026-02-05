# Two-Step Install

This guide covers setting up an OWL unit using the automated installer. The main steps are:

1. Step 1: Install Raspbian onto an SD card
2. Step 2: Download and run the setup script

After the installer completes, you'll [focus the camera](#step-3-focus-your-camera) and [verify the installation](#step-4-verify-installation).

## Prerequisites

Before starting, ensure you have:

| Requirement | Details                                                        |
|-------------|----------------------------------------------------------------|
| Hardware | Fully assembled OWL with Raspberry Pi and camera               |
| Camera | Connected and enabled Raspberry Pi camera module or USB camera |
| Internet | WiFi or Ethernet connection (for initial setup only)           |
| Time | Approximately 20-30 minutes                                    |

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
Respond YES, and then select 1 (standalone OWL) - setup instructions are provided under [Standalone Setup](../controllers/wireless/standalone.md).

**Networked OWL**
Respond YES, and then select 2 (Networked OWL) - setup instructions are provided under [Networked Setup](../controllers/wireless/networked.md).
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

If you choose **n**, the installer will install the dashboard Python dependencies and then proceed to the final summary. For Standalone setup, see [Standalone Setup](../controllers/wireless/standalone.md). For Networked setup, see [Networked Setup](../controllers/wireless/networked.md).

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

After the dashboard Python dependencies are installed, the `web_setup.sh` script runs automatically. See the [Standalone](../controllers/wireless/standalone.md) or [Networked](../controllers/wireless/networked.md) sections for what happens next.

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

## Next Steps

```{admonition} Set up your dashboard
:class: tip

If you chose Standalone or Networked mode during installation, continue with your dashboard setup:

- [Standalone Setup](../controllers/wireless/standalone.md) - WiFi hotspot with local dashboard
- [Networked Setup](../controllers/wireless/networked.md) - Join existing network with central controller
```

```{seealso}
- [Configuration Guide](configuration/index.md) - Fine-tune detection parameters
- [Operation Guide](../usage/operation/index.md) - Understand detection algorithms
- [Use Cases](../usage/use-cases/index.md) - Mounting and application examples
- [Controllers](../controllers/index.md) - Wired and wireless controller options
```
