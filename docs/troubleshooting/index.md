# Troubleshooting

This guide covers common issues and solutions for both software and hardware problems with the OWL system.

```{admonition} Report Issues
:class: tip

If you encounter an error that isn't covered here, please [raise an issue on GitHub](https://github.com/geezacoleman/OpenWeedLocator/issues) so we can update this guide and improve the error handling.
```

---

## Software Errors

The table below includes all current error classes and their hierarchy. All errors include detailed logging, color-formatted terminal output, and standardized error handling. When encountering an error, check the terminal output for specific guidance.

### OWLError

Base exception for all OWL-related errors.

| Error | Common Causes | Solutions |
|-------|---------------|-----------|
| **CameraNotFoundError** | Disconnected camera, damaged ribbon cable, camera not enabled | 1. Check camera connections<br>2. Run `vcgencmd get_camera`<br>3. Enable camera in raspi-config |
| **OWLAlreadyRunningError** | Another OWL instance active, GPIO pins in use | 1. Use `kill <PID>` to stop process<br>2. Check for zombie processes<br>3. Reboot if persists |

### StorageError

Base class for storage-related errors.

| Error | Common Causes | Solutions |
|-------|---------------|-----------|
| **USBMountError** | Device not properly mounted, permission issues | 1. Check physical connection<br>2. Verify mount points<br>3. Check device permissions |
| **USBWriteError** | Write-protected device, full storage, permission issues | 1. Check write protection<br>2. Verify available space<br>3. Check file permissions |
| **NoWritableUSBError** | No USB storage detected, all devices write-protected | 1. Connect USB device<br>2. Check write protection<br>3. Format device if needed |
| **StorageSystemError** | Incompatible platform for storage operation | 1. Use Linux/Raspberry Pi<br>2. Specify a valid local directory in config<br>3. Use `--save-directory` flag |

### OWLControllerError

Base class for controller-related errors.

| Error | Common Causes | Solutions |
|-------|---------------|-----------|
| **ControllerPinError** | Pin conflicts, invalid pin numbers, hardware issues | 1. Check pin configurations<br>2. Verify physical connections<br>3. Check for conflicts |
| **ControllerConfigError** | Missing or invalid configuration | 1. Check config file<br>2. Add missing settings<br>3. Ensure values are appropriate |

### OWLConfigError

Base class for configuration errors.

| Error | Common Causes | Solutions |
|-------|---------------|-----------|
| **ConfigFileError** | Missing config file, invalid file path, corrupt file | 1. Verify file exists<br>2. Check file permissions<br>3. Validate file contents |
| **ConfigSectionError** | Missing required sections in config file | 1. Add missing sections to the config file |
| **ConfigKeyError** | Missing required keys in a section | 1. Add missing keys to the respective config section |
| **ConfigValueError** | Invalid configuration values | 1. Correct values to fit expected ranges |

### Other Errors

| Error | Common Causes | Solutions |
|-------|---------------|-----------|
| **AlgorithmError** | Missing dependencies, invalid model files, Coral device issues | 1. Install required packages<br>2. Verify model files<br>3. Check Coral device connection |
| **OpenCVError** | OpenCV not installed, wrong virtual environment | 1. Run `workon owl`<br>2. Install opencv-python<br>3. Run owl_setup.sh |
| **DependencyError** | Missing Python packages, wrong virtual environment | 1. Activate owl environment<br>2. Run pip install for package<br>3. Install from requirements.txt |

---

## Hardware Issues

Common symptoms and explanations for hardware-related errors.

```{admonition} Update Your Software
:class: warning

If you are using the original disk image without updating, there may be issues that have been fixed. We recommend updating to the latest software using `bash ~/owl/owl_update.sh`.
```

| Symptom | Explanation | Solution |
|---------|-------------|----------|
| **Pi won't start (no green/red lights)** | No power getting to the computer | Check the power source and all downstream components: Bulgin panel/plug connections, fuse connections and fuse, connections to Wago 2-way block, voltage regulator connections, cable into the Raspberry Pi |
| **Pi starts (green light flashing) but no beep** | OWL software has not started | This is likely a configuration/camera connection error. Boot the Pi with a screen connected, open a Terminal (Ctrl + T) and run `~/owl/./owl.py` to see any errors |
| **Beep heard, but no relays activating** | Relays not receiving 12V power, or signal from Pi, or Pi not sending signal | Check all connections with a multimeter for 12V presence. Verify wiring matches the diagram. If connections are correct, run `~/owl/./owl.py` in Terminal to check for errors |

---

## Diagnostic Commands

### Check Camera

```bash
# Check camera is detected
vcgencmd get_camera

# Test camera capture (libcamera)
libcamera-still -o test.jpg
```

### Check OWL Process

```bash
# Check if OWL is running
ps -C owl.py

# Kill existing OWL process
sudo kill <PID>

# View OWL logs
journalctl -u owl -f
```

### Check Virtual Environment

```bash
# Activate OWL environment
workon owl

# Verify packages
pip list | grep opencv
python -c "import cv2; print(cv2.__version__)"
```

### Check Services

```bash
# Check OWL service status
systemctl status owl

# Check dashboard service
systemctl status owl-dash

# Check MQTT broker
systemctl status mosquitto
```

### Check GPIO

```bash
# Check GPIO pin states
gpio readall

# Test relay manually (in Python)
python3 -c "from gpiozero import LED; r = LED(13); r.on(); input('Press Enter'); r.off()"
```

---

## Common Fixes

### Restart OWL Service

```bash
sudo systemctl restart owl
```

### Reboot System

```bash
sudo reboot
```

### Reset Configuration

```bash
# Backup current config
cp ~/owl/config/DAY_SENSITIVITY_2.ini ~/owl/config/DAY_SENSITIVITY_2.ini.backup

# Copy default config
cp ~/owl/config/DAY_SENSITIVITY_2.ini.default ~/owl/config/DAY_SENSITIVITY_2.ini
```

### Reinstall Dependencies

```bash
workon owl
pip install -r ~/owl/requirements.txt
```

### Update OWL Software

```bash
bash ~/owl/owl_update.sh
```

---

## Getting Help

If you're still experiencing issues:

1. **Check the terminal output** - Run `~/owl/./owl.py` directly to see detailed error messages
2. **Search existing issues** - Check [GitHub Issues](https://github.com/geezacoleman/OpenWeedLocator/issues) for similar problems
3. **Ask the community** - Post in [GitHub Discussions](https://github.com/geezacoleman/OpenWeedLocator/discussions)
4. **Report a bug** - [Create a new issue](https://github.com/geezacoleman/OpenWeedLocator/issues/new) with:
   - Error message (full text)
   - Steps to reproduce
   - OWL version (`git log -1` in owl directory)
   - Raspberry Pi model

---

## Next Steps

- [Configuration Guide](../software/configuration/index.md) - Adjust detection parameters
- [Operation Guide](../usage/operation/index.md) - Detection algorithms and solenoid wiring
- [Software Installation](../software/installation/index.md) - Reinstall if needed

