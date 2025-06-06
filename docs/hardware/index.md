```{toctree}
:maxdepth: 1
:caption: Hardware variants
:titlesonly:

compact-owl/index
original-owl/index
```

# Hardware Requirements

The specific hardware requirements and details for each OWL format are provided below. There are two designs developed 
to ensure improved performance without compromising on the original simplicity of the OWL:

1. Education layout (original OWL)
2. Compact OWL
   * extruded aluminium enclosure
   * 3D printed enclosure

| Original OWL | Compact OWL - Extruded Aluminium Enclosure | Compact OWL - 3D Printed Enclosure |
|--------------|-----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| ![Finished OWL - small](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/accae1b1-b00d-40f9-ab95-743b732df2a0) | ![3D Printed OWL](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/a9771aa2-355d-40db-ac15-f6da037b63ed) | ![Extruded OWL](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/d153db2d-624b-427e-832e-599a3a841623) |

All 3D models and hardware assembly guides are provided in subsequent sections. The quantities of each item below are for 
one OWL detection unit for each respective design.

*Please note links provided in tables below to an example online retailer of each component for convenience only. There are
certainly many other retailers that may be better suited and priced to your purposes and we encourage you to find local
suppliers. Other types of connector, layout and design are also possible, which may change the parts required.*

## Choose Your OWL Design

::::{grid} 1 1 2 2
:gutter: 4

:::{grid-item-card} 📚 Original OWL (Educational)
:img-top: https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/accae1b1-b00d-40f9-ab95-743b732df2a0
:link: original-owl.html

**Educational Layout**

The original OWL lays out all components in a flat design. It makes the connections and interactions within the system
clear. It's a great educational tool to learn the parts required for a weed detection system and has served in the field 
as a functional weed detection system for a number of years.

**Best for:** Education, prototyping, understanding system architecture
:::

:::{grid-item-card} 🏭 Compact OWL (Production)
:img-top: https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/a9771aa2-355d-40db-ac15-f6da037b63ed
:link: compact-owl.html

**Production Ready**

The new OWL design is more compact, inside either an extruded aluminium enclosure or 3D printed housing. It offers
improved water and dust resistance, plus ease of assembly and longevity. This design is recommended for production use.

**Best for:** Production deployment, field operations, commercial use
:::
::::

## Official OWL Hardware

We now have a range of official OWL hardware available to build or purchase.

### OWL Enclosure
The Official OWL Enclosure is an extruded aluminium enclosure with rubber seals and a glued with 2mm thick glass lens.
It provides a more production friendly, durable and water/chemical resisant option over 3D printed plastic.

### OWL Driver Board
The [Official OWL driver board](https://github.com/geezacoleman/owl-driver-board) combines the relay control board, power supply and wiring. It will be available for
purchase soon, or you can use the files provided to order/make your own.

## Required Tools

Before starting any OWL build, ensure you have these tools:

::::{grid} 1 1 3 3
:gutter: 2

:::{grid-item-card} 🔧 Basic Tools
- Wire strippers
- Wire cutters
- Pliers
:::

:::{grid-item-card} ⚡ Electronics
- Soldering iron/solder (only for Original OWL)
- Heat shrink tubing
- Multimeter (recommended)
:::

:::{grid-item-card} 🖨️ 3D Printing
- 3D printer or printing service
- PLA/PETG filament
- Heat-set insert tool
:::
::::

## Safety Guidelines

```{admonition} Important Safety Notes
:class: warning

⚠️ **NOTE** All components listed above are relatively "plug and play" with minimal soldering or complex electronics required.
Follow these instructions carefully and triple check your connections before powering anything on to avoid losing
the [magic smoke](https://en.wikipedia.org/wiki/Magic_smoke) and potentially a few hundred dollars. Never make changes
to the wiring on the detection unit while it is connected to 12V and always remain within the safe operating voltages of
any component.
```

## Getting Started

```{admonition} Ready to Build?
:class: success

Choose your OWL variant based on your needs:

- **New to OWL?** Start with [Compact OWL](compact-owl.html) for easier assembly and production-ready design
- **Want to learn?** Try [Original OWL](original-owl.html) for educational value and clear component visibility

Both designs use similar core components but differ in assembly complexity and enclosure design.
```

## Community & Support

- 💬 **Questions**: Ask in [GitHub Discussions](https://github.com/geezacoleman/OpenWeedLocator/discussions)
- 🔧 **Build Tips**: Share your assembly experience with the community
- 📸 **Show Your Build**: We love seeing OWL systems in action!
- 🐛 **Hardware Issues**: Report problems on [GitHub Issues](https://github.com/geezacoleman/OpenWeedLocator/issues)