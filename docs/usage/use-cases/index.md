# Use Cases

The OWL can be adapted for various weed control and data collection applications.

## Vehicle-Mounted Spot Spraying

The primary use case for the OWL is site-specific herbicide application in fallow fields.

![Vehicle-mounted OWL](https://user-images.githubusercontent.com/51358498/152991630-fe343f37-5a45-43b0-900c-bb3cad4f1b80.JPG)

The OWL team designed and assembled a 2m spot spraying boom using two OWLs to control four 12V solenoids each. The boom was mounted on a ute/utility vehicle with:
- Spray tank in the tray
- Powered by 12V car battery
- Indicator lights for each nozzle (for demonstration/testing)

### Specifications

| Parameter | Details | Notes |
|-----------|---------|-------|
| Mounting gap | 0 cm | Mounted directly to same bar as nozzles, 32cm higher |
| Forward Speed | 6-8 km/h | Image blur/activation time limiting. Moving OWL forward improves speed for large weeds |
| Solenoids | Goyen 3QH/3662 with Teejet body | Many alternatives exist - see [GitHub Issue #2](https://github.com/geezacoleman/OpenWeedLocator/issues/2) |
| Spray tips | Teejet TP4003E-SS | 40 degree, flat fan nozzles, stainless steel |
| Strainer | TeeJet 50 mesh | Protects spray tip from clogging/damage |
| Pump/tank | Northstar 12V 60L ATV Sprayer | 8.3 LPM 12V pump, 60L capacity, tray mounted |

---

## Robot-Mounted Spot Spraying

A second system was developed for the University of Sydney's Digifarm robot, the Agerris Digital Farm Hand.

![Robot-mounted OWL](https://user-images.githubusercontent.com/51358498/152990627-0f89bf92-87bc-4808-a748-33f0742068e4.jpg)

**Key differences:**
- Powered by 24V robot system
- Uses 24-12V DC/DC converter
- In frequent use for site-specific weed control in trial areas

---

## Image Data Collection

The OWL can act as a high-quality image data collection tool for developing training datasets in realistic agricultural environments.

### Collection Methods

| Method | Code | Example |
|--------|------|---------|
| Whole image | `whole` | ![Whole image](https://user-images.githubusercontent.com/51358498/178902742-45952737-ee3e-4a36-b9b3-216a19e78eb7.png) |
| Crop to bounding box | `bbox` | ![Bounding box](https://user-images.githubusercontent.com/51358498/178902795-96bb8068-cf58-4f5a-8819-8ca538add384.png) |
| Crop to square around weed centre | `square` | ![Square crop](https://user-images.githubusercontent.com/51358498/178903171-af7f8f1b-9caf-435e-96d0-4f01e76c53fb.png) |
| Deactivated (default) | `None` | No images saved |

### Configuration

Settings are updated in `config.ini`:

```ini
[DataCollection]
sample_images = True
sample_method = whole
sample_frequency = 30
save_directory = /media/owl/SanDisk
disable_detection = False
```

| Parameter | Description |
|-----------|-------------|
| `sample_images` | Enable/disable collection (True/False) |
| `sample_method` | `whole`, `bbox`, `square`, or `None` |
| `sample_frequency` | Save every N frames |
| `save_directory` | USB drive path for saving images |
| `disable_detection` | Set True for data collection only (improves frame rate) |

```{admonition} Storage Warning
:class: warning

Do not leave sampling on for long periods or the SD card/USB drive will fill up and stop working.
```

---

## Other Applications

The OWL relay outputs can control any 12V device, enabling:

- **Targeted tillage** - Mechanical weed control
- **Spot flaming** - Thermal weed control
- **Variable rate application** - Fertiliser or other inputs
- **Custom automation** - Any detection-triggered action

---

## Share Your Build

As more OWLs are built and fallow weed control systems developed, we would love to share the results!

- Post in the [OWL Community](https://community.openweedlocator.org)
- Share images of your finished systems
- Describe your specific application and setup

---

## Next Steps

- [Operation Guide](../operation/index.md) - Detection algorithms and solenoid wiring
- [Configuration](../../software/configuration/index.md) - Adjust parameters for your setup
- [Hardware Assembly](../../hardware/index.md) - Build your own OWL
