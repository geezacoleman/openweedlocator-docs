# Detailed Installation

This setup approach may take longer (~60 minutes) but you'll be better prepared for problem solving, upgrades or changes. Use this if you want to understand what's happening under the hood.

```{admonition} Prefer the automated installer?
:class: tip

The [Two-Step Install](two-step-install.md) automates all of these steps and takes ~10 minutes.
```

## Step 1: Raspberry Pi Setup

### Step 1a - Raspberry Pi OS

Before powering up the Raspberry Pi, you'll need to install the Raspbian operating system on the SD card.

From your own computer, download and flash the latest **64-bit** version of Raspbian from the official [Raspberry Pi website](https://www.raspberrypi.com/software/operating-systems/#raspberry-pi-os-64-bit) to the empty SD card. The official [Raspberry Pi Imager](https://www.raspberrypi.com/software/) is recommended.

**Configuration during flashing:**
- Leave the hostname as default
- Set the username to `owl`
- Choose a password
- Optionally specify WiFi network settings

| Raspberry Pi Imager | Configuring the OWL |
|---------------------|---------------------|
| ![Raspberry Pi Imager](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/a86a6358-3a8c-4f40-94df-9eeba9c17e4d) | ![Imager](https://github.com/user-attachments/assets/10a74429-fc12-49a6-a9df-cc67a55dab0c) |

### Step 1b - Setting up the OWL

Once the Raspbian OS has been flashed to the SD Card (may take 5-10 minutes), remove the SD card and insert it into the Raspberry Pi. Connect the screen, keyboard and mouse and then power up the Pi.

Alternatively, you can {abbr}`SSH (Secure Shell — remote access to your Pi from another computer over the network)` into your OWL from a separate device and install it remotely. A good guide on how to do that is available [here](https://www.makeuseof.com/how-to-ssh-into-raspberry-pi-remote/).

#### First boot

On the first boot you may be asked to set country, timezone, keyboard, connect to WiFi and look for updates. If you haven't already set the username, set it to `owl` and choose a password. Uninstall the unused browser - this will save space on the Pi. Finally, you will be asked to restart the Pi.

#### Opening terminal

After the restart, open up {abbr}`Terminal (the command-line interface where you type commands to control the Pi)`. You can press `CTRL + ALT + T`, or click the icon in the top left with the `>_` symbol.

```{admonition} Terminal Commands
:class: note

All commands below are provided for easy copy/paste. When using terminal you should see `owl@raspberrypi:~ $` at the start of each line and `(owl) owl@raspberrypi:~ $` when operating within the `owl` virtual environment. Pay close attention to the presence/absence of `(owl)` in front of each line.
```

**Requirements:**
- Raspberry Pi
- Empty SD Card (SanDisk 32GB SDXC recommended)
- Your own computer with SD card reader
- Power supply (if not using the OWL unit)
- Screen and keyboard
- WiFi/Ethernet cable

---

## Step 2: Manual Installation

### Free up space

The Raspberry Pi comes pre-installed with software that can be removed to free up space. These commands use {abbr}`sudo (superuser do — runs a command with administrator privileges)` because they modify system packages:

```bash
sudo apt-get purge wolfram-engine
```

```bash
sudo apt-get purge libreoffice*
```

```bash
sudo apt-get clean
```

### Set up the virtual environment

A {abbr}`virtual environment (an isolated set of Python packages, separate from the system — prevents software conflicts)` contains all the necessary packages in one neat spot. We'll use `virtualenv` and `virtualenvwrapper`.

Update the system:

```bash
sudo apt update && sudo apt full-upgrade
```

Add environment configuration to {abbr}`.bashrc (a shell configuration file that runs every time you open a terminal)`:

```bash
echo "# virtualenv and virtualenvwrapper" >> ~/.bashrc
```

```bash
echo "export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python" >> ~/.bashrc
```

```bash
source ~/.bashrc
```

Install virtualenv packages:

```bash
sudo apt-get install python3-virtualenv
```

```bash
sudo apt-get install python3-virtualenvwrapper
```

Add more configuration:

```bash
echo "export WORKON_HOME=$HOME/.virtualenvs" >> ~/.bashrc
```

```bash
echo "source /usr/share/virtualenvwrapper/virtualenvwrapper.sh" >> ~/.bashrc
```

```bash
source ~/.bashrc
```

Create the `owl` environment:

```bash
mkvirtualenv --system-site-packages -p python owl
```

The command line should now look like `(owl) owl@raspberrypi:~ $`. The `(owl)` means you're in the virtual environment. Use `deactivate` to exit and `workon owl` to re-enter.

### Installing packages

```{admonition} Virtual Environment Required
:class: warning

The `(owl)` prefix MUST be present at the start of each line for this section. Run `workon owl` if unsure.
```

Ensure you're in the `owl` environment:

```bash
workon owl
```

Install OpenCV using {abbr}`pip (Python package installer — downloads and installs Python libraries)`:

```bash
pip3 install opencv-contrib-python
```

Verify the installation:

```bash
python
```

```python
>>> import cv2
>>> import picamera2
>>> exit()
```

### Downloading the OWL repository

Change to the home directory:

```bash
cd ~
```

Clone the repository:

```bash
git clone https://github.com/geezacoleman/OpenWeedLocator owl
```

Verify with `ls` - you should see the `owl` folder.

### Installing OWL Python dependencies

The OWL requires these packages:
- OpenCV (already installed)
- numpy
- imutils
- gpiozero
- pandas
- RPi.GPIO
- tqdm
- blessed

Change to the owl directory:

```bash
cd ~/owl
```

Install all requirements:

```bash
pip install -r requirements.txt
```

Verify the installation:

```bash
python
```

```python
>>> import cv2
>>> import numpy
>>> import gpiozero
>>> import pandas
>>> exit()
```

### Starting OWL on boot

Make the scripts executable with {abbr}`chmod (change file permissions — controls who can read, write, or run a file)`:

```bash
chmod a+x owl.py
```

```bash
chmod a+x owl_boot.sh
```

```bash
chmod a+x owl_boot_wrapper.sh
```

Move boot scripts to the system directory:

```bash
sudo mv owl_boot.sh /usr/local/bin/owl_boot.sh
```

```bash
sudo mv owl_boot_wrapper.sh /usr/local/bin/owl_boot_wrapper.sh
```

Add to {abbr}`crontab (a scheduled task system — used here to run OWL automatically on every boot)` for startup:

```bash
sudo crontab -e
```

Select `1. /bin/nano editor` ({abbr}`nano (a simple terminal-based text editor — save with Ctrl+X, then Y, then Enter)`), then add this line at the bottom:

```
@reboot /usr/local/bin/owl_boot_wrapper.sh > /home/launch.log 2>&1
```

Save with `Ctrl + X`, then `Y`, then `Enter`.

---

## Step 3: Focusing the Camera

```{admonition} Automatic Focus Cameras
:class: note

Cameras with automatic focus such as the Raspberry Pi Camera Module 3 will be automatically focused to 1.2m distance. This guide is for the HQ and Global Shutter cameras which require manual focusing.
```

Run the focus command:

```bash
owl.py --focus
```

A sharpness estimation is provided on the video feed. The higher the value, the better the focus.

| Blurry Image | Clear Image |
|--------------|-------------|
| ![blurry owl](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/34ae71f2-8507-4892-b49a-195e515e56dd) | ![clear owl](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/20db536b-edaf-4085-a613-6ea786747998) |

### Manual focusing (older software)

If needed, stop the background process first:

```bash
ps -C owl.py
```

Note the PID (process ID) from the output, then stop it:

```bash
sudo kill <PID>
```

Launch with display:

```bash
~/owl/./owl.py --show-display
```

Press `Esc` to exit when focusing is complete.

---

## Step 4: Final Reboot

Shut down the Raspberry Pi and unplug the power. Reconnect the camera and all GPIO pins/power. Double check the camera cable is inserted, then reconnect power and wait for a beep.

If you hear a beep, test with something green under the camera. If the relays start clicking, congratulations - your OWL is working!

```{admonition} Lighting Conditions
:class: note

The unit does not perform well under office/artificial lighting. The thresholds have been set for outdoor conditions.
```

---

## Optional: RTC Module Setup

For RTC (Real Time Clock) module setup, follow the [Adafruit instructions](https://learn.adafruit.com/adding-a-real-time-clock-to-raspberry-pi). The RTC uses a CR1220 button cell battery and connects to GPIO pins 1-6.

---

## Next Steps

```{admonition} Set up your dashboard
:class: tip

After installation, set up your dashboard for remote monitoring and control:

- [Standalone Setup](../controllers/wireless/standalone.md) - WiFi hotspot with local dashboard
- [Networked Setup](../controllers/wireless/networked.md) - Join existing network with central controller
```

```{seealso}
- [Configuration Guide](configuration/index.md) - Adjust detection parameters
- [Controllers](../controllers/index.md) - Build a controller for multiple OWLs
- [Troubleshooting](../troubleshooting/index.md) - Common issues and solutions
```
