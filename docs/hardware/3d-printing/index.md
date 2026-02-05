# 3D Printing

All OWL enclosures and mounts can be 3D printed. This page provides the STL files, print settings, and guidance for both the Original OWL and Compact OWL designs.

## Original OWL

There are seven total items that need printing for the Original OWL unit. All items with links to the STL files are listed below. There are two options for Original OWL base:

1. **Single connector (Bulgin) panel mount**
    - Pros: Easy/quick attach/detach from whatever you have connected, more water resistant.
    - Cons: More connections to make, more expensive
2. **Cable gland**
    - Pros: Fewer connections to make, cheaper, faster to build.
    - Cons: More difficult to remove, less water resistant.

We also provide a link to the [3D models on TinkerCAD](https://www.tinkercad.com/things/fhfUCsPEn5q), an online and free 3D modelling software package, allowing for further customisation to cater for individual user needs.

### Original OWL Parts List

| Description | Image (click for link) |
|:-------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| **Original OWL** | |
| OWL base, onto which all components are mounted. The unit can be fitted using the M6 bolt holes on the rear panel. | [![screenshot](https://user-images.githubusercontent.com/51358498/166176068-989cc69b-43c1-48ef-942d-b273fc2f4d98.png)](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Original%20OWL/Enclosure%20-%20single%20connector.stl) |
| OPTIONAL: OWL base with cable glands instead of single Bulgin connector. | [![screenshot](https://user-images.githubusercontent.com/51358498/166175980-e1fcc526-c835-4ea1-88b5-d28a1ab747b7.png)](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Original%20OWL/Enclosure%20-%20cable%20gland.stl) |
| OWL cover, slides over the base and is fitted with 4 x M3 bolts/nuts. Provides basic splash protection. | [![OWL Cover](https://user-images.githubusercontent.com/51358498/132754464-8bfe62aa-4487-42ea-a507-71e0b4a4d1a2.png)](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Original%20OWL/Tall%20enclosure%20cover.stl) |
| OWL base port cover, covers the cable port on the rear panel. | [![OWL base port cover](https://media.github.sydney.edu.au/user/3859/files/12b7f000-cb87-11eb-980b-564e7b4324f6)](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Original%20OWL/Tall%20enclosure%20plug.stl) |
| Raspberry Pi mount, fixes to the Raspberry Pi for easy attachment to OWL base. | [![Raspberry Pi mount](https://media.github.sydney.edu.au/user/3859/files/5d396c80-cb87-11eb-948c-d60efe433ac8)](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Original%20OWL/Raspberry%20Pi%20mount.stl) |
| Raspberry Pi Camera mount, fixes to the HQ or V2 Camera for simple attachment to the base. | [![Screenshot 2022-03-04 180036](https://user-images.githubusercontent.com/40649348/156715282-bea91301-ac6d-4421-b071-4a4304eb02b0.png)](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Original%20OWL/Camera%20mount.stl) |
| Relay board mount, fixes to the relay board for simple attachment to the base. | [![Relay board mount](https://media.github.sydney.edu.au/user/5402/files/d421aa00-d04c-11eb-9191-bcad7b51c1a4)](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Original%20OWL/Relay%20control%20board%20mount.stl) |
| Voltage regulator mount, fixes to the voltage regulator and onto the relay board for simple attachment to the base. | [![Voltage regulator mount](https://media.github.sydney.edu.au/user/5402/files/8147f280-d04c-11eb-89ec-4af125a8f232)](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Original%20OWL/Voltage%20regulator%20mount.stl) |

### Print Settings - Original OWL

Ideally supports should be used for the base, and were tested at 0.2mm layer heights with 25% infill on a Prusa MK3S.

| Setting | Value |
|---------|-------|
| Layer height | 0.2mm |
| Infill | 25% |
| Supports | Yes (for base) |
| Tested printer | Prusa MK3S |

```{admonition} Update 02/05/2022
:class: note

- Improved camera mounts
- Space for 40mm lens cover
- More compact design
- Version tracking
```

---

## Compact OWL

The Compact OWL has fewer parts to print than the Original OWL and is both more durable and water resistant. A complete unit requires printing of only 5 parts.

All 3D model files are available to edit and download on [TinkerCAD](https://www.tinkercad.com/things/id1FMJrWtJp-compact-owl) or [Printables](https://www.printables.com/model/875853-raspberry-pi-rugged-imaging-enclosure). The 3D printing .stl files are provided under the 3D Models and through the links in the table below.

The backplate comes in three options:
1. Amphenol EcoMate Aquarius receptacle only
2. Amphenol EcoMate Aquarius receptacle + Adafruit RJ45 waterproof ethernet connector
3. 16mm cable gland only

Pick one of these backplates when printing.

### Compact OWL Parts List

| Description | Image (click for link) |
|:-------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| **Compact OWL** | |
| Enclosure body: houses all components on tray | [![image](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/dc5d4a38-3a76-42b6-bb2b-96e6cae29a8e)](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Compact%20OWL/Main%20Body.stl) |
| Frontplate: covers the front of the enclosure. Incorporates a 37 mm lens cover to seal the enclosure. | [![image](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/54113656-8688-4c58-a6b6-dfd3b35736b9)](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Compact%20OWL/Frontplate.stl) |
| Lens mount: Securely mounts the 37 mm UV lens filter to the frontplate. | [![image](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/b5c9e4a7-5bd9-4c22-8d42-8134f0f96f6f)](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Compact%20OWL/Lens%20Mount.stl) |
| Backplate: 1 x Amphenol EcoMate Aquarius Receptacle size 10 shell, 1 x size 12 shell | [![image](https://github.com/user-attachments/assets/57e4c45a-d0b1-4500-8cb6-55c4fb957973)](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Compact%20OWL/Backplate%20-%202%20x%20Amphenol%20receptacle.stl) |
| Backplate: 1 x Amphenol EcoMate Aquarius Receptacle | [![image](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/a80eb501-f681-4298-a6e1-2fb1595a859a)](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Compact%20OWL/Backplate%20-%20receptacle%20only.stl) |
| Backplate: 1 x Amphenol EcoMate Aquarius Receptacle, 1 x Adafruit Ethernet Connector | [![image](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/4424e47e-f92c-4db2-b20f-26daec9babe0)](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Compact%20OWL/Backplate%20-%20receptacle%20and%20ethernet.stl) |
| Backplate: blank | [![image](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/f724822e-be85-47ee-9ab8-968efd161124)](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Compact%20OWL/Backplate%20-%20blank.stl) |
| Backplate: 1 x 16mm Cable Gland | [![image](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/1f318499-fe28-4b97-9e7f-57c53fac8173)](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Compact%20OWL/Backplate%20-%20gland.stl) |
| Tray: Mounts all required hardware and fits into the enclosure body on the second rail. Use M3 heat-set threaded inserts for the lens holder. | [![image](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/83c7d31d-1b93-4d04-8cff-349998394b2a)](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Compact%20OWL/Tray%20-%20base.stl) |
| Lens holder: Secures the lens with two M3 x 6mm screws. | [![image](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/25a44e01-18cc-44de-a36b-b396d1216653)](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Compact%20OWL/Tray%20-%20lens%20holder.stl) |
| OPTIONAL: Camera Module 3/V2 Camera mounting plate | [![image](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/38baf7e4-b05a-48e7-958e-9e8374bc8990)](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Compact%20OWL/Camera%20Mount.stl) |

### Print Settings - Compact OWL

All .stl files for the 3D printed components of this build are available in the 3D Models directory. Supports are not required but do improve print quality.

| Setting | Value |
|---------|-------|
| Layer height | 0.16mm |
| Infill | 25% |
| Supports | Optional (improves quality) |
| Tested printer | Bambu Labs P1S |

---

## Controller Enclosures

3D printed enclosures are also available for the OWL controllers. See the Controller Setup Guide (coming soon in the Software section) for more details on building controllers.

### Ute Controller

| Part | STL File |
|------|----------|
| Ute Controller Base | [STL File](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Controller/Ute%20Controller%20-%20Base.stl) |
| Ute Controller Top | [STL File](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Controller/Ute%20Controller%20-%20Top.stl) |

### Advanced Controller

| Part | STL File |
|------|----------|
| Advanced Controller (1 OWL) | [STL File](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Controller/Advanced%20Controller%20-%201%20OWL.stl) |
| Advanced Controller (2 OWL) | [STL File](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Controller/Advanced%20Controller%20-%202%20OWL.stl) |
| Advanced Controller (4 OWL) | [STL File](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Controller/Advanced%20Controller%20-%204%20OWL.stl) |

---

## General Printing Tips

```{admonition} 3D Printing Recommendations
:class: tip

- **Material**: PLA or PETG recommended for enclosure parts
- **Orientation**: Print bases with the open side facing up
- **Supports**: Required for base pieces, optional for other parts
- **Post-processing**: Sand mounting surfaces for better fit
- **Threaded inserts**: Use a soldering iron to set heat-set inserts
```

## Next Steps

After printing your enclosure parts:

- [Original OWL Assembly Guide](../original-owl/index.md) - Complete build instructions for the Original OWL
- [Compact OWL Assembly Guide](../compact-owl/index.md) - Complete build instructions for the Compact OWL
- [Software Installation](../../software/two-step-install.md) - Install and configure OWL software
