# Configuration Guide

Changing detection settings is easy using config files and command line flags. Use the `config.ini` file in the config folder to set parameters.

The default config file is `DAY_SENSITIVITY_2.ini`. Save any changes before restarting `owl.py`.

## Sensitivity Presets

Three sensitivity levels are provided to get you started:

| Config File | Description |
|-------------|-------------|
| `DAY_SENSITIVITY_1.ini` | Least sensitive - minimises false positives, only detects large weeds. Minimum detection size increased. |
| `DAY_SENSITIVITY_2.ini` | Default OWL parameters - balanced detection. |
| `DAY_SENSITIVITY_3.ini` | Most sensitive - reduces missed detections with lower minimum detection size and wider detection ranges. |

## Command Line Flags

Command line flags let you specify options in Terminal without editing code:

```bash
usage: owl.py [-h] [--input] [--show-display] [--focus]
  --input               path to image directory, single image or video file
  --show-display        show display windows
  --focus               focus the camera
  --help                display all flags
```

## Creating Custom Config Files

Create your own config files to meet specific conditions. In `owl.py`, update the path to your config file:

| Navigate to the `owl` directory | Open the `owl.py` file |
|:-------------------------------:|:----------------------:|
| ![owl_dir](https://user-images.githubusercontent.com/51358498/221152779-46c78fe2-92e6-4e65-9ebd-234ae02c33f6.png) | ![open_greenonbrown_py](https://user-images.githubusercontent.com/51358498/221153072-922d9ed6-8120-4c2d-9bd2-a999030b4723.png) |

Scroll to the bottom and update the config file path:

```python
owl = Owl(config_file='config/ENTER_YOUR_CONFIG_FILE_HERE.ini')
```

## Complete Config Template

```ini
[System]
# select your algorithm
algorithm = exhsv
# operate on a video, image or directory of media
input_file_or_directory =
# choose how many relays are connected to the OWL
relay_num = 4
actuation_duration = 0.15
delay = 0

[Controller]
# choose between 'None', 'ute' or 'advanced'
controller_type = None

# for advanced controller
detection_mode_pin_up = 35
detection_mode_pin_down = 36
recording_pin = 38
sensitivity_pin = 40
low_sensitivity_config = config/DAY_SENSITIVITY_2.ini
high_sensitivity_config = config/DAY_SENSITIVITY_3.ini

# for UteController
switch_purpose = recording
switch_pin = 37

[Visualisation]
image_loop_time = 5

[Camera]
resolution_width = 640
resolution_height = 480
exp_compensation = -2

[GreenOnGreen]
# parameters related to green-on-green detection
model_path = models
confidence = 0.5
class_filter_id = None

[GreenOnBrown]
# parameters related to green-on-brown detection
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
# all data collection related parameters
sample_images = False
sample_method = whole
sample_frequency = 30
save_directory = /media/owl/SanDisk
disable_detection = False
log_fps = False
camera_name = cam1

[Relays]
# defines the relay ID (left) that matches to a boardpin (right) on the Pi.
0 = 13
1 = 15
2 = 16
3 = 18
```

## Parameter Reference

### System Parameters

| Parameter | Options | Description |
|-----------|---------|-------------|
| `algorithm` | `gog`, `exg`, `exgr`, `exgs`, `exhu`, `hsv`, `exhsv` | Detection algorithm. Most sensitive: `exg`. Least sensitive/most precise: `exgr`, `exhu`, `hsv`, `exhsv`. |
| `actuation_duration` | Float (decimal) | Length of time relay is activated (seconds). |
| `input_file_or_directory` | Path | Path to image, video, or directory of media. |
| `relay_num` | Integer | Number of relay lanes. Set to 1 for single relay. |
| `delay` | Float | Delay between detection and actuation. Default: 0. |

### Controller Parameters

| Parameter | Options | Description |
|-----------|---------|-------------|
| `controller_type` | `None`, `ute`, `advanced` | Controller type. `advanced` enables extra features, `ute` for simpler use. |
| `detection_mode_pin_up` | Integer | GPIO pin for "detection mode up" (advanced). |
| `detection_mode_pin_down` | Integer | GPIO pin for "detection mode down" (advanced). |
| `recording_pin` | Integer | GPIO pin to activate/deactivate image recording. |
| `sensitivity_pin` | Integer | GPIO pin to switch between low and high sensitivity. |
| `low_sensitivity_config` | Path | Config file path for low sensitivity settings. |
| `high_sensitivity_config` | Path | Config file path for high sensitivity settings. |
| `switch_purpose` | `recording` or other | Switch purpose in UteController setups. |
| `switch_pin` | Integer | GPIO pin for switch functionality (ute). |

### Camera Parameters

| Parameter | Options | Description |
|-----------|---------|-------------|
| `resolution_width` | Integer | Camera width (default: 640). |
| `resolution_height` | Integer | Camera height (default: 480). |
| `exp_compensation` | Integer (-8 to 8) | Exposure compensation. Default: -2 for faster shutter. |

### GreenOnGreen Parameters

| Parameter | Options | Description |
|-----------|---------|-------------|
| `model_path` | Path | Path to the model file. |
| `confidence` | Float | Cutoff confidence for detection. Default: 0.5 (50%). |
| `class_filter_id` | Integer | Filter to target specific classes. |

### GreenOnBrown Parameters

| Parameter | Options | Description |
|-----------|---------|-------------|
| `exg_min` | 0-255 | Minimum threshold for ExG algorithm. 10=very sensitive, 25=not sensitive. |
| `exg_max` | 0-255 | Maximum threshold for ExG. Keep above 180. |
| `hue_min` | 0-128 | Minimum hue threshold. Typically 39-83. |
| `hue_max` | 0-128 | Maximum hue threshold. Typically 39-83. |
| `saturation_min` | 0-255 | Minimum saturation threshold. Typically 50-220. |
| `saturation_max` | 0-255 | Maximum saturation threshold. Typically 50-220. |
| `brightness_min` | 0-255 | Minimum brightness threshold. Typically 60-190. |
| `brightness_max` | 0-255 | Maximum brightness threshold. Typically 60-190. |
| `min_detection_area` | Integer | Minimum pixel area for valid detection. |
| `invert_hue` | Boolean | Inverts detected hue - detects outside thresholds instead of inside. |

### DataCollection Parameters

| Parameter | Options | Description |
|-----------|---------|-------------|
| `sample_images` | True/False | Enable/disable image data collection. |
| `sample_method` | `bbox`, `square`, `whole` | Image sampling method. |
| `sample_frequency` | Integer | Sample every N frames. |
| `save_directory` | Path | Where to save images. Default: `/media/owl/SanDisk`. |
| `disable_detection` | True/False | Disable detection for data collection only. |
| `log_fps` | True/False | Save FPS to a file. |
| `camera_name` | String | Camera name for saved recordings. |

### Relay Mapping

| Parameter | Description |
|-----------|-------------|
| `0 = 13` | Relay 0 maps to GPIO boardpin 13 |
| `1 = 15` | Relay 1 maps to GPIO boardpin 15 |
| `2 = 16` | Relay 2 maps to GPIO boardpin 16 |
| `3 = 18` | Relay 3 maps to GPIO boardpin 18 |

---

## Next Steps

- [Controller Setup](../../controllers/index.md) - Build a controller for managing OWLs
- [Green-on-Green](../green-on-green/index.md) - Experimental in-crop detection
- [Troubleshooting](../../troubleshooting/index.md) - Common issues and solutions
