# Quick Start Guide

Get your OpenWeedLocator (OWL) up and running quickly with this streamlined guide. This covers the essential steps to build and deploy your first OWL system.

```{admonition} What You'll Need
:class: tip

- **Time**: ~2-4 hours for complete setup
- **Skill Level**: Basic electronics and 3D printing knowledge helpful
- **Prerequisites**: Raspberry Pi experience recommended
```

## Choose Your OWL Type

There are two main OWL designs to choose from:

::::{grid} 1 1 2 2
:gutter: 3

:::{grid-item-card} 📚 Original OWL (Educational)
:class-card: sd-border-primary

**Best for**: Learning, education, experimentation

- Clear component layout for understanding
- Educational value - see all connections
- Proven field performance
- More assembly time required

[View Hardware Guide →](../hardware/original-owl.md)
:::

:::{grid-item-card} 🏭 Compact OWL (Production)
:class-card: sd-border-success

**Best for**: Production use, durability, weather resistance

- Improved water/dust resistance
- Easier assembly with fewer parts
- More compact design
- Official OWL driver board available

[View Hardware Guide →](../hardware/compact-owl.md)
:::
::::

## Step 1: Prepare Your Raspberry Pi

### Option A: Quick Software Installation (Recommended)

1. **Flash Raspberry Pi OS** (64-bit) to SD card using [Raspberry Pi Imager](https://www.raspberrypi.com/software/)
   - Set username to `owl` during setup
   - Enable SSH and WiFi if needed

2. **Two-line installation** after first boot:

   ```bash
   git clone https://github.com/geezacoleman/OpenWeedLocator owl
   bash owl/owl_setup.sh
   ```

   This automatically installs all dependencies and configures the system.

### Option B: Manual Installation

For detailed step-by-step installation, see our [complete software guide](../software/installation.md).

## Step 2: Choose Your Hardware Path

### Compact OWL (Recommended for New Builds)

```{admonition} Recommended Components
:class: note

**Core Components:**
- Raspberry Pi 5 (4GB) or Pi 4
- Raspberry Pi Global Shutter Camera + 6mm lens
- 64GB SD Card (minimum 16GB)
- Official OWL driver board (or relay HAT alternative)

**Enclosure Options:**
- Official OWL extruded aluminum enclosure, OR
- 3D printed enclosure with required hardware
```

**Essential Parts for Compact OWL:**

| Component | Quantity | Purpose |
|-----------|----------|---------|
| Raspberry Pi 5 4GB | 1 | Main computer |
| Global Shutter Camera | 1 | Image capture |
| 6mm Wide Angle Lens | 1 | Lens for camera |
| 64GB SD Card | 1 | Storage |
| OWL Driver Board | 1 | Power & relay control |
| Amphenol Connector Set | 1 | Weatherproof connection |

[Complete parts list →](../hardware/compact-owl.md#hardware-lists)

### Original OWL (Educational/Learning)

Best for understanding how the system works, but requires more assembly time.

[Complete parts list →](../hardware/original-owl.md#hardware-lists)

## Step 3: 3D Print Your Enclosure

### Download STL Files

::::{grid} 1 1 2 2
:gutter: 2

:::{grid-item-card} Compact OWL Files
- [Main Body](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Compact%20OWL/Main%20Body.stl)
- [Frontplate](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Compact%20OWL/Frontplate.stl)
- [Tray](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Compact%20OWL/Tray.stl)
- [Backplate Options](https://github.com/geezacoleman/OpenWeedLocator/tree/main/3D%20Models/Compact%20OWL)
:::

:::{grid-item-card} Original OWL Files
- [Enclosure Base](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Original%20OWL/Enclosure%20-%20single%20connector.stl)
- [Cover](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Original%20OWL/Enclosure%20-%20cover.stl)
- [Component Mounts](https://github.com/geezacoleman/OpenWeedLocator/tree/main/3D%20Models/Original%20OWL)
:::
::::

### Print Settings
- **Layer Height**: 0.2mm (0.16mm for better quality)
- **Infill**: 25%
- **Supports**: Not required but improve quality
- **Material**: PLA or PETG

```{admonition} Alternative Options
:class: tip

Don't have a 3D printer? Download files from [Printables](https://www.printables.com/model/875853-raspberry-pi-rugged-imaging-enclosure) or use online printing services.
```

## Step 4: Assembly Overview

### Compact OWL Assembly

1. **Prepare Components**
   - Install heat-set inserts in 3D printed parts
   - Mount camera to tray with standoffs
   - Install Raspberry Pi on tray

2. **Electronics Assembly**
   - Connect OWL driver board or relay HAT
   - Wire Amphenol connector
   - Test connections

3. **Final Assembly**
   - Install tray in enclosure
   - Attach front and back plates
   - Add waterproofing seals

### Original OWL Assembly

1. **Component Mounting**
   - Mount all components to 3D printed mounts
   - Install in base enclosure

2. **Wiring**
   - Connect GPIO pins to relay board
   - Wire power system with voltage regulator
   - Add indicators and buzzer

3. **Testing & Sealing**

[Detailed assembly guides →](../hardware/index.md)

## Step 5: Configuration & Testing

### Camera Focus

Run the focus utility to ensure sharp images:

```bash
~/owl/./owl.py --focus
```

Adjust the lens focus while watching the sharpness value on screen. Higher values = better focus.

### Test Detection

1. **Basic Test**:
   ```bash
   ~/owl/./owl.py --show-display
   ```

2. **Field Test**: Take your OWL outside and test with real vegetation

### Configuration

Edit the config file for your specific needs:

```bash
nano ~/owl/config/DAY_SENSITIVITY_2.ini
```

Key settings to adjust:
- Detection sensitivity
- Relay assignments  
- Camera resolution
- Actuation timing

## Step 6: Mounting & Deployment

### Vehicle Mounting

![Vehicle mounted OWL](https://user-images.githubusercontent.com/51358498/130522810-bb19e6ca-5019-4de4-83cc-858eca358ef8.jpg)

- Mount at appropriate height for your application
- Ensure stable, vibration-resistant mounting
- Connect to 12V power supply
- Add solenoids/nozzles as needed

### Power Requirements

- **OWL Unit**: 12V, ~2A
- **Solenoids**: Varies by type (typically 1-3A each)
- **Total System**: Size fuse accordingly

## Troubleshooting Quick Fixes

| Issue | Quick Solution |
|-------|----------------|
| No beep on startup | Check camera connection, run `~/owl/./owl.py` for errors |
| Relays not activating | Verify 12V power connections and GPIO wiring |
| Poor detection | Adjust focus, check lighting conditions, tune sensitivity |
| SD card errors | Use high-quality SD card, check for corruption |

## Next Steps

```{admonition} Ready for More?
:class: success

🎉 **Congratulations!** You now have a working OWL system.

**What's Next:**
- Explore [advanced configuration options](../software/configuration.md)
- Learn about [different detection algorithms](../software/algorithms.md)  
- Join the [community discussions](https://github.com/geezacoleman/OpenWeedLocator/discussions)
- Share your setup and results!
```

## Getting Help

```{admonition} Need Support?
:class: important

- 📖 **Detailed Guides**: Check our comprehensive [hardware](../hardware/index.md) and [software](../software/index.md) documentation
- 💬 **Community**: Ask questions in [GitHub Discussions](https://github.com/geezacoleman/OpenWeedLocator/discussions)
- 🐛 **Issues**: Report bugs on [GitHub Issues](https://github.com/geezacoleman/OpenWeedLocator/issues)
- 📺 **Video**: Watch the [complete installation guide](https://www.youtube.com/watch?v=lH5b8tXYmDw&t=62s) on YouTube
```

---

**Estimated Total Time**: 2-4 hours for complete build and setup
**Estimated Cost**: $200-400 USD depending on options chosen