# Configuration Guide

OWL uses two configuration files to separate detection settings from infrastructure settings. Both are standard INI files that can be edited with any text editor or adjusted through the web dashboard.

## Config File Overview

| File | Location | Purpose |
|------|----------|---------|
| `GENERAL_CONFIG.ini` | `~/owl/config/` | Detection parameters, camera, sensitivity presets, tracking, relay mapping |
| `CONTROLLER.ini` | `~/owl/config/` | MQTT, network mode, GPS, web dashboard, actuation timing |

An `active_config.txt` file in the same directory points to the current detection config (defaults to `config/GENERAL_CONFIG.ini`).

```{admonition} Copy-on-write protection
:class: note

`GENERAL_CONFIG.ini` and `CONTROLLER.ini` are protected defaults. When changes are made through the dashboard, a timestamped copy is created automatically (e.g. `GENERAL_CONFIG_20260318_1430.ini`) so the originals are never corrupted.
```

## Sensitivity Presets

Instead of separate config files for each sensitivity level, OWL embeds sensitivity presets directly in `GENERAL_CONFIG.ini`:

```ini
[Sensitivity]
active = medium

[Sensitivity_Low]
exg_min = 25
exg_max = 200
hue_min = 41
hue_max = 80
...

[Sensitivity_Medium]
exg_min = 25
exg_max = 200
hue_min = 39
hue_max = 83
...

[Sensitivity_High]
exg_min = 22
exg_max = 210
hue_min = 35
hue_max = 85
...
```

Each preset stores the 9 GreenOnBrown threshold values. The `[Sensitivity] active` key determines which preset is loaded at startup. You can switch presets from the dashboard, the wired controller sensitivity switch, or the AI assistant.

Custom presets can be saved from the dashboard and are stored as additional `[Sensitivity_YourName]` sections in the config file.

## Changing Settings

There are several ways to adjust OWL settings:

**Dashboard sliders (recommended)**
: The web dashboard provides range sliders for all detection parameters. Changes take effect immediately and are persisted to the config file.

**AI assistant**
: Open the Agent tab in the dashboard and describe what you want in plain language — e.g. "make detection more sensitive" or "switch to the exg algorithm". See the [AI Assistant guide](../agent/index.md).

**Direct INI editing**
: Edit the config file directly with a text editor:
```bash
nano ~/owl/config/GENERAL_CONFIG.ini
```
Save the file and restart OWL for changes to take effect.

**Command line flags**
: Override the config file or enable display mode at startup:
```bash
# Use a specific config file
python owl.py --config config/my_custom.ini

# Show display for threshold adjustment
python owl.py --show-display

# Camera focus mode
python owl.py --focus

# Process a video or image directory
python owl.py --input path/to/media
```

## Complete GENERAL_CONFIG.ini Template

```ini
[System]
algorithm = exhsv
input_file_or_directory =
relay_num = 4
actuation_duration = 0.15
delay = 0
actuation_zone = 100

[Controller]
controller_type = none
status_led_pin = 40
gps_led_pin = 38
switch_purpose = recording
switch_pin = 36
detection_mode_pin_up = 36
detection_mode_pin_down = 35
recording_pin = 33
sensitivity_pin = 32

[Visualisation]
image_loop_time = 5

[Camera]
resolution_width = 1456
resolution_height = 1088
exp_compensation = -2
crop_factor_horizontal = 0.02
crop_factor_vertical = 0.02
camera_type = auto

[GreenOnGreen]
model_path = models
confidence = 0.5
detect_classes =
actuation_mode = centre
min_detection_pixels = 50
inference_resolution = 320
crop_buffer_px = 20

[GreenOnBrown]
exg_min = 25
exg_max = 200
hue_min = 39
hue_max = 83
saturation_min = 50
saturation_max = 220
brightness_min = 60
brightness_max = 190
min_detection_area = 10
invert_hue = False

[DataCollection]
image_sample_enable = False
detection_enable = True
sample_method = whole
sample_frequency = 30
save_directory = /media/owl/SanDisk
log_fps = False
camera_name = cam1

[Relays]
0 = 13
1 = 15
2 = 16
3 = 18

[Tracking]
tracking_enabled = False
track_class_window = 5
track_crop_persist = 3

[Sensitivity]
active = medium

[Sensitivity_Low]
exg_min = 25
exg_max = 200
hue_min = 41
hue_max = 80
saturation_min = 52
saturation_max = 218
brightness_min = 62
brightness_max = 188
min_detection_area = 20

[Sensitivity_Medium]
exg_min = 25
exg_max = 200
hue_min = 39
hue_max = 83
saturation_min = 50
saturation_max = 220
brightness_min = 60
brightness_max = 190
min_detection_area = 10

[Sensitivity_High]
exg_min = 22
exg_max = 210
hue_min = 35
hue_max = 85
saturation_min = 40
saturation_max = 225
brightness_min = 50
brightness_max = 200
min_detection_area = 5
```

## Complete CONTROLLER.ini Reference

```ini
[MQTT]
enable = True
broker_ip = localhost
broker_port = 1883
device_id = auto

[WebDashboard]
port = 8000

[Network]
mode = networked
static_ip = localhost
controller_ip = localhost

[GPS]
# GPS data source for owl.py (none / serial / tcp)
source = none
# Serial GPS settings (only when source = serial)
port = /dev/ttyUSB1
baudrate = 115200
# Networked controller GPS server (Teltonika NMEA-over-TCP)
enable = False
nmea_port = 8500
boom_width = 12.0
track_save_directory = tracks

[Actuation]
# Relay timing — used as fallback when no GPS speed data
actuation_duration = 0.15
delay = 0.0
# Speed-adaptive actuation geometry (networked controller)
actuation_length_cm = 10
offset_cm = 30
speed_avg_window = 5.0
```

## Parameter Reference — GENERAL_CONFIG.ini

### System

| Parameter | Default | Description |
|-----------|---------|-------------|
| `algorithm` | `exhsv` | Detection algorithm: `exg`, `exgr`, `maxg`, `nexg`, `exhsv`, `hsv`, `gndvi`, `gog`, `gog-hybrid` |
| `input_file_or_directory` | *(empty)* | Path to image, video, or directory for offline processing. Leave empty for live camera. |
| `relay_num` | `4` | Number of relay lanes (1-4). |
| `actuation_duration` | `0.15` | Relay activation time in seconds. |
| `delay` | `0` | Delay between detection and actuation in seconds. |
| `actuation_zone` | `100` | Percentage of the frame width used for relay lane mapping (1-100). |

### Controller

| Parameter | Default | Description |
|-----------|---------|-------------|
| `controller_type` | `none` | Wired controller type: `none`, `ute`, or `advanced`. |
| `status_led_pin` | `40` | BOARD pin for status indicator LED (shared by Ute and Advanced). |
| `gps_led_pin` | `38` | BOARD pin for GPS status LED (shared by Ute and Advanced). |
| `switch_purpose` | `recording` | Ute controller switch function: `recording` or `detection`. |
| `switch_pin` | `36` | BOARD pin for Ute controller toggle switch. Avoid BOARD 37 if using Sixfab HAT. |
| `detection_mode_pin_up` | `36` | BOARD pin for detection mode up (Advanced controller). |
| `detection_mode_pin_down` | `35` | BOARD pin for detection mode down (Advanced controller). |
| `recording_pin` | `33` | BOARD pin for recording toggle (Advanced controller). |
| `sensitivity_pin` | `32` | BOARD pin for sensitivity switch (Advanced controller). |

### Camera

| Parameter | Default | Description |
|-----------|---------|-------------|
| `resolution_width` | `1456` | Camera capture width in pixels. |
| `resolution_height` | `1088` | Camera capture height in pixels. |
| `exp_compensation` | `-2` | Exposure compensation (-8 to 8). Negative values give faster shutter speed. |
| `crop_factor_horizontal` | `0.02` | Fraction of width to crop from each side (0.0-0.5). |
| `crop_factor_vertical` | `0.02` | Fraction of height to crop from each side (0.0-0.5). |
| `camera_type` | `auto` | Camera selection: `auto` (auto-detect), `rpi` (force Pi camera), `usb` (force USB webcam). |

### Visualisation

| Parameter | Default | Description |
|-----------|---------|-------------|
| `image_loop_time` | `5` | Seconds between display frame updates when using `--show-display`. |

### GreenOnGreen

| Parameter | Default | Description |
|-----------|---------|-------------|
| `model_path` | `models` | Directory containing YOLO model files (NCNN or PyTorch). |
| `confidence` | `0.5` | Minimum confidence threshold for detections (0.0-1.0). |
| `detect_classes` | *(empty)* | Comma-separated class IDs to detect. Empty means all classes. |
| `actuation_mode` | `centre` | How detections map to relays: `centre` (bounding box centre) or `zone` (segmentation mask pixel count, requires seg model). |
| `min_detection_pixels` | `50` | Minimum pixel count for valid segmentation detections (zone mode). |
| `inference_resolution` | `320` | Input image size for YOLO inference. Smaller is faster, larger is more accurate. |
| `crop_buffer_px` | `20` | Pixel buffer added around crop mask regions (gog-hybrid mode). |

### GreenOnBrown

| Parameter | Default | Description |
|-----------|---------|-------------|
| `exg_min` | `25` | Minimum Excess Green threshold (0-255). Lower = more sensitive. |
| `exg_max` | `200` | Maximum Excess Green threshold (0-255). Keep above 180. |
| `hue_min` | `39` | Minimum hue threshold (0-179). Green vegetation is typically 39-83. |
| `hue_max` | `83` | Maximum hue threshold (0-179). |
| `saturation_min` | `50` | Minimum saturation threshold (0-255). |
| `saturation_max` | `220` | Maximum saturation threshold (0-255). |
| `brightness_min` | `60` | Minimum brightness threshold (0-255). |
| `brightness_max` | `190` | Maximum brightness threshold (0-255). |
| `min_detection_area` | `10` | Minimum pixel area for a valid detection. Increase to ignore small noise. |
| `invert_hue` | `False` | When True, detects colours outside the hue range instead of inside. Useful for detecting non-green targets. |

### DataCollection

| Parameter | Default | Description |
|-----------|---------|-------------|
| `image_sample_enable` | `False` | Enable image data collection to USB drive. |
| `detection_enable` | `True` | Enable weed detection and relay actuation. Set False for data collection only. |
| `sample_method` | `whole` | Image sampling method: `bbox` (bounding boxes only), `square` (square crops), `whole` (full frame). |
| `sample_frequency` | `30` | Save an image every N frames. |
| `save_directory` | `/media/owl/SanDisk` | Directory for saved images. Typically a USB drive mount point. |
| `log_fps` | `False` | Log frame processing times to file. |
| `camera_name` | `cam1` | Camera identifier used in saved file names. |

### Tracking

| Parameter | Default | Description |
|-----------|---------|-------------|
| `tracking_enabled` | `False` | Enable ByteTrack multi-object tracking for persistent weed IDs across frames. |
| `track_class_window` | `5` | Number of frames to smooth class predictions over. Reduces class flickering. |
| `track_crop_persist` | `3` | Number of frames a crop mask region persists after the crop leaves frame (gog-hybrid mode). |

### Relays

| Parameter | Description |
|-----------|-------------|
| `0 = 13` | Relay 0 maps to GPIO board pin 13 |
| `1 = 15` | Relay 1 maps to GPIO board pin 15 |
| `2 = 16` | Relay 2 maps to GPIO board pin 16 |
| `3 = 18` | Relay 3 maps to GPIO board pin 18 |

### Sensitivity

| Parameter | Default | Description |
|-----------|---------|-------------|
| `active` | `medium` | Active sensitivity preset name. Built-in presets: `low`, `medium`, `high`. Custom presets can be saved from the dashboard. |

## Parameter Reference — CONTROLLER.ini

### MQTT

| Parameter | Default | Description |
|-----------|---------|-------------|
| `enable` | `True` | Enable MQTT communication with the dashboard. |
| `broker_ip` | `localhost` | MQTT broker IP address. `localhost` for standalone, controller IP for networked. |
| `broker_port` | `1883` | MQTT broker port. |
| `device_id` | `auto` | Unique device identifier. `auto` generates from hostname. |

### WebDashboard

| Parameter | Default | Description |
|-----------|---------|-------------|
| `port` | `8000` | Gunicorn listening port (behind Nginx reverse proxy). |

### Network

| Parameter | Default | Description |
|-----------|---------|-------------|
| `mode` | `networked` | Network mode: `standalone` (creates WiFi hotspot) or `networked` (joins existing network). |
| `static_ip` | `localhost` | Static IP for the OWL on the network. |
| `controller_ip` | `localhost` | IP address of the networked controller (networked mode only). |

### GPS

| Parameter | Default | Description |
|-----------|---------|-------------|
| `source` | `none` | GPS data source for owl.py: `none`, `serial`, or `tcp`. |
| `port` | `/dev/ttyUSB1` | Serial GPS device path (when source = serial). Use `/dev/ttyUSB1` for Sixfab 4G HAT GNSS. |
| `baudrate` | `115200` | Serial GPS baud rate. Sixfab modem uses 115200. |
| `enable` | `False` | Enable GPS server on the networked controller. |
| `nmea_port` | `8500` | TCP port for incoming NMEA data (Teltonika router). |
| `boom_width` | `12.0` | Spray boom width in metres (for track recording). |
| `track_save_directory` | `tracks` | Directory for saved GPS track files. |

### Actuation

| Parameter | Default | Description |
|-----------|---------|-------------|
| `actuation_duration` | `0.15` | Relay activation time in seconds (fallback when no GPS speed data). |
| `delay` | `0.0` | Delay between detection and actuation in seconds. |
| `actuation_length_cm` | `10` | Physical spray patch length in cm (speed-adaptive calculation). |
| `offset_cm` | `30` | Distance from camera to nozzle in cm (speed-adaptive calculation). |
| `speed_avg_window` | `5.0` | Time window in seconds for GPS speed averaging. |

---

## Next Steps

- [Controller Setup](../../controllers/index.md) - Build a controller for managing OWLs
- [Green-on-Green](../green-on-green/index.md) - In-crop weed detection using YOLO
- [AI Assistant](../agent/index.md) - Control OWL through natural language
- [Troubleshooting](../../troubleshooting/index.md) - Common issues and solutions
