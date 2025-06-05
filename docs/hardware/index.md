# Hardware Assembly Guide

Complete guides for building OpenWeedLocator (OWL) hardware systems. Choose between the Original OWL design for educational purposes or the Compact OWL for production applications.

## OWL Hardware Variants

::::{grid} 1 1 2 2
:gutter: 4

:::{grid-item-card} 📚 Original OWL
:img-top: https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/accae1b1-b00d-40f9-ab95-743b732df2a0
:class-card: sd-border-primary

**Educational Layout**
- All components clearly visible
- Great for learning and understanding
- Proven field performance
- More assembly time required

**Best For**: Education, prototyping, understanding system architecture

[Build Original OWL →](original-owl.md)
:::

:::{grid-item-card} 🏭 Compact OWL  
:img-top: https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/a9771aa2-355d-40db-ac15-f6da037b63ed
:class-card: sd-border-success

**Production Ready**
- Improved water/dust resistance  
- Easier assembly with fewer parts
- More compact and robust design
- Official hardware available

**Best For**: Production deployment, field operations, commercial use

[Build Compact OWL →](compact-owl.md)
:::
::::

## Required Tools

Before starting any OWL build, ensure you have these tools:

::::{grid} 1 1 3 3
:gutter: 2

:::{grid-item-card} 🔧 Basic Tools
- Wire strippers & cutters
- Pliers (needle-nose recommended)
- Screwdrivers (Phillips & flathead)
- Hex key set (metric)
:::

:::{grid-item-card} ⚡ Electronics
- Soldering iron & solder
- Heat shrink tubing
- Multimeter (recommended)
- Crimping tool (for connectors)
:::

:::{grid-item-card} 🖨️ 3D Printing
- 3D printer or printing service
- PLA/PETG filament
- Heat-set insert tool
- Calipers for measurements
:::
::::

## Safety Guidelines

```{admonition} Important Safety Notes
:class: warning

⚠️ **Electrical Safety**
- Never make changes while connected to 12V power
- Always double-check connections before powering on
- Use appropriate fuses for your system
- Verify polarity before connecting power

⚠️ **Soldering Safety**  
- Use proper ventilation and safety equipment
- Allow components to cool before handling
- Use heat shrink tubing to prevent short circuits

⚠️ **Mounting Safety**
- Ensure secure mounting to prevent vibration damage
- Use appropriate hardware for your vehicle/platform
- Consider accessibility for maintenance
```

## Common Components

Both OWL variants share these core components:

### Computing Platform

| Component | Recommendation | Notes |
|-----------|----------------|--------|
| **Raspberry Pi** | Pi 5 4GB (preferred) or Pi 4 | Pi 5 offers better performance for higher resolutions |
| **SD Card** | 64GB Class 10 or better | SanDisk Extreme recommended |
| **Camera** | Global Shutter Camera + 6mm lens | Best performance, especially at speed |

```{admonition} Camera Options
:class: note

**Recommended**: Raspberry Pi Global Shutter Camera
- Best performance at vehicle speeds
- Reduced motion blur
- Requires 6mm wide-angle lens

**Supported Alternatives**:
- Raspberry Pi HQ Camera (12MP) + lens
- Raspberry Pi Camera Module 3  
- Raspberry Pi V2 Camera (not recommended for field use)
```

### Power & Control

Both designs require 12V input power and relay control capabilities:

- **Input**: 12V DC (vehicle power or battery)
- **Pi Power**: 5V regulated (3-5A depending on Pi model)
- **Relay Control**: 4-channel capability for multiple actuators
- **Protection**: Fused input, proper grounding

## 3D Printing Guidelines

### Print Settings

All OWL enclosures are designed for standard FDM printing:

```{code-block} yaml
Layer Height: 0.2mm (0.16mm for better finish)
Infill: 25%
Supports: Not required (but improve surface finish)
Material: PLA or PETG
Nozzle Temp: 200-220°C (PLA), 240-260°C (PETG)
Bed Temp: 60°C (PLA), 80°C (PETG)
```

### Post-Processing

1. **Remove supports** if used
2. **Install heat-set inserts** where required
3. **Test fit components** before final assembly
4. **Deburr holes** and clean surfaces

### File Downloads

All STL files are available in the main repository:

- **Compact OWL**: [3D Models/Compact OWL/](https://github.com/geezacoleman/OpenWeedLocator/tree/main/3D%20Models/Compact%20OWL)
- **Original OWL**: [3D Models/Original OWL/](https://github.com/geezacoleman/OpenWeedLocator/tree/main/3D%20Models/Original%20OWL)
- **Controllers**: [3D Models/Controllers/](https://github.com/geezacoleman/OpenWeedLocator/tree/main/3D%20Models/Controllers)

Alternative: Download from [Printables](https://www.printables.com/model/875853-raspberry-pi-rugged-imaging-enclosure)

## Assembly Process Overview

### 1. Component Preparation

- **3D print** all required parts
- **Install heat-set inserts** in printed components  
- **Prepare electronics** - test components before assembly
- **Organize hardware** - sort screws, standoffs, etc.

### 2. Electronics Assembly

- **Mount computing components** to appropriate mounts/tray
- **Connect power system** - voltage regulation and distribution
- **Wire relay control** - GPIO connections and relay board
- **Add indicators** - LEDs, buzzer for status feedback

### 3. System Integration

- **Install in enclosure** - mount assembled components
- **Connect external interfaces** - power, solenoid connections
- **Seal enclosure** - weather protection measures
- **Final testing** - verify all functions before deployment

### 4. Calibration & Setup

- **Camera focus** - critical for detection performance
- **Software configuration** - detection parameters
- **Field testing** - verify performance in actual conditions

## Official OWL Hardware

```{admonition} Official Components Available
:class: tip

**OWL Driver Board v2.1**
- Combines relay control, power management, and wiring
- Simpler assembly than discrete components
- More robust performance
- Available for purchase (details TBD)

**Official Enclosure**  
- Extruded aluminum construction
- Improved durability and weather resistance
- Glass lens window
- Production-ready design
```

## Connecting Actuators

### Solenoid Connections

Both OWL designs can control up to 4 solenoids (12V):

![Solenoid Wiring Diagram](https://user-images.githubusercontent.com/40649348/156698481-3d4fec4e-567a-4a18-b72e-b26d35c8d1c7.png)

**Common Connection Pattern**:
- Relay 1-4: Individual solenoid control lines
- Common Ground: Shared between all solenoids and power supply
- 12V Supply: Fused connection to vehicle power

### Typical Applications

::::{grid} 1 1 2 2
:gutter: 3

:::{grid-item-card} 🚜 Vehicle Spot Spraying
:img-top: https://user-images.githubusercontent.com/51358498/152991630-fe343f37-5a45-43b0-900c-bb3cad4f1b80.JPG

**Components**:
- 2-4m spray boom
- Multiple OWL units (typically 2)
- Solenoid-controlled nozzles
- Tank and pump system

**Operating Speed**: 6-8 km/h
:::

:::{grid-item-card} 🤖 Robot Integration  
:img-top: https://user-images.githubusercontent.com/51358498/152990627-0f89bf92-87bc-4808-a748-33f0742068e4.jpg

**Components**:
- Single OWL unit
- Integration with robot power (24V → 12V converter)
- Smaller boom setup
- Autonomous operation capability

**Operating Speed**: 3-6 km/h
:::
::::

## Troubleshooting Hardware Issues

### Common Problems

| Symptom | Likely Cause | Solution |
|---------|--------------|----------|
| **No power LEDs** | Power supply issue | Check fuse, connections, voltage regulator |
| **Pi starts but no beep** | Software/camera issue | Check camera cable, review software logs |
| **Relays clicking but no actuation** | Solenoid power issue | Verify 12V to solenoids, check connections |
| **Intermittent operation** | Loose connections | Review all wire connections, especially GPIO |

### Testing Procedure

1. **Visual Inspection**: Check all connections match wiring diagram
2. **Power Test**: Verify correct voltages at key points  
3. **Component Test**: Test each relay/solenoid individually
4. **Software Test**: Run OWL with display to verify detection
5. **Integration Test**: Full system test with real vegetation

## Next Steps

```{admonition} Ready to Build?
:class: success

Choose your OWL variant and start building:

- **New to OWL?** Start with [Compact OWL](compact-owl.md) for easier assembly
- **Want to learn?** Try [Original OWL](original-owl.md) for educational value  
- **Need controllers?** Check out our [controller options](controllers.md)

**After building**, proceed to [software installation](../software/installation.md) and [configuration](../software/configuration.md).
```

## Community & Support

- 💬 **Questions**: Ask in [GitHub Discussions](https://github.com/geezacoleman/OpenWeedLocator/discussions)
- 🔧 **Build Tips**: Share your assembly experience with the community
- 📸 **Show Your Build**: We love seeing OWL systems in action!
- 🐛 **Hardware Issues**: Report problems on [GitHub Issues](https://github.com/geezacoleman/OpenWeedLocator/issues)

---

**Need help?** The OWL community is here to support your build. Don't hesitate to ask questions!