# Wired Controllers

GPIO-based hardware controllers provide physical switch control for OWL units. These connect directly to the Raspberry Pi GPIO pins and allow tactile control of detection, recording, and sensitivity settings.

A CAN FD-based controller is also in development for better scalability.

| Ute Controller | Advanced Controller |
|----------------|---------------------|
| ![Ute Controller](https://github.com/user-attachments/assets/2df7819f-79cc-4803-a7b8-e83000add7af) | ![Advanced Controller](https://github.com/user-attachments/assets/d3ff9365-9296-47e8-8dd5-cf2ba59d7657) |

```{admonition} USB Drive Required
:class: warning

You MUST connect a USB drive when using a controller, otherwise it will not start. The [SanDisk Ultra Fit Flash Drive](https://www.amazon.com/SanDisk-256GB-Ultra-Flash-Drive/dp/B07857Y17V) fits within the enclosure.
```

## Tools Required

1. Crimping tool for Amphenol crimped connections
2. Pliers
3. Wire strippers/cutters
4. Soldering iron/solder

---

## Ute Controller

Suitable for connecting a single OWL device. TinkerCAD model available [here](https://www.tinkercad.com/things/1s5gWD7wiJv-ute-controller).

### Parts List

| Component | Quantity | Link |
|-----------|----------|------|
| Car cigarette lighter socket | 1 | [Link](https://www.amazon.com/dp/B0BM9LP3R2/) |
| 7 strand, 3mm (7.5A) trailer cable | As needed | [Link](https://perthpro.com.au/products/3mm-or-4mm-7-core-trailer-cable) |
| M12 Cable gland | 2 | [Link](https://au.mouser.com/ProductDetail/546-1427NCGM12B) |
| Off-On SPST Toggle Switch | 2 | [Link](https://au.element14.com/arcolectric-bulgin-limited/c3900baaaa/switch-spst-16a-250vac/dp/7674244) |
| Rubber boot for switch | 2 | [Link](https://au.element14.com/arcolectric/a1080mo/sealing-boot-toggle-15-32-x-32ns/dp/678144) |
| Amphenol Fathom Lock - 6 pin plug | 1 | [Link](https://au.mouser.com/ProductDetail/Amphenol-SINE-Systems/FLS6BS10N3W3P03) |
| #16 Contacts (13A rated) | 3 | [Link](https://au.mouser.com/ProductDetail/Amphenol-SINE-Systems/SP16M2F) |
| #20 Contacts (5A rated) | 3 | [Link](https://au.mouser.com/ProductDetail/Amphenol-SINE-Systems/SP20W2F) |
| Dialight 12V Green LED Panel Mount | 1 | [Link](https://au.mouser.com/ProductDetail/645-559-0203-001F) |
| Dialight 5V Red LED Panel Mount | 2 | [Link](https://au.mouser.com/ProductDetail/645-559-0102-001F) |
| M3 Heatset inserts + screws | 3 + 3 | [Link](https://www.mcmaster.com/products/threaded-inserts/) |

### Ute Controller Wiring

| Purpose | Colour | GPIO Pin | Connector Pin |
|---------|--------|----------|---------------|
| Power +12V | Red | N/A - connect to 12V of OWL Driver Board | A (#16) |
| Power GND | Black | N/A - connect to GND of OWL Driver Board | B (#16) |
| Recording/Detection Toggle Switch | White | BOARD 37 | C (#16) |
| Recording status LED (blinks on image save) | Green | BOARD 38 | D (#20) |
| Storage status indicator | Yellow | BOARD 40 | E (#20) |
| GPIO GND | Brown | BOARD 39 | F (#20) |

---

## Advanced Controller

Suitable for connecting up to four OWLs. As OWL count increases, increase current ratings accordingly. For four OWLs, use four-pole switches and input power rated at least 40A @ 12V.

TinkerCAD models (1, 2, and 4 OWLs) available [here](https://www.tinkercad.com/things/e3JOeuyfLNO-advanced-owl-controller).

### Parts List (Core Components)

| Component | Quantity | Link |
|-----------|----------|------|
| In-line fuse + holder (10A per OWL) | 1 | [30A MAX](https://www.narva.com.au/products/54406BL/) / [60A MAX](https://www.narva.com.au/products/54414/) |
| 7 strand, 3mm trailer cable (comms) | As needed | [Link](https://perthpro.com.au/products/3mm-or-4mm-7-core-trailer-cable) |
| Output power cable (min 10A) | As needed | [Link](https://www.narva.com.au/products/5823-30TW/) |
| Input power cable (10A per OWL) | As needed | [10A](https://www.narva.com.au/products/5823-30TW/) / [25A](https://www.narva.com.au/products/5825-30TW/) / [50A](https://www.narva.com.au/products/5826-30TW/) |
| M16 Cable gland | 1 | [Link](https://au.element14.com/pro-power/m16db/gland-m16-4-8mm-pk10/dp/1621070) |
| Rubber boot for switch | 4 | [Link](https://au.element14.com/arcolectric/a1080mo/) |
| Amphenol Fathom Lock - 8 pin plug | 2 per OWL | [Link](https://au.element14.com/amphenol-sine-tuchel/fls6bs12n8p03/) |
| Amphenol Fathom Lock - 8 pin receptacle | 1 (+ 1 for OWL backcover) | [Link](https://au.element14.com/amphenol-sine-tuchel/fls712n8s03/) |
| #16 Contacts male (13A) | 16 per OWL | [Link](https://au.mouser.com/ProductDetail/Amphenol-SINE-Systems/SP16M2F) |
| #16 Contacts female (13A) | 8 (+ 8 for backcover) | [Link](https://au.mouser.com/ProductDetail/Amphenol-SINE-Systems/SS16M2F) |
| Dialight 12V Green LED | 1 | [Link](https://au.mouser.com/ProductDetail/645-559-0203-001F) |
| Dialight 5V Red LED | 1 per OWL | [Link](https://au.mouser.com/ProductDetail/645-559-0102-001F) |

### Switches by OWL Count

**1 OWL Controller:**
- Off-On SPST Toggle Switch (16A MAX) x 3
- On-Off-On SPST Toggle Switch x 1

**4 OWL Controller:**
- POWER SWITCH: Off-On SPST Toggle Switch (50A MAX) x 1
- Off-On 4PST toggle switch x 2
- On-Off-On 4PST toggle switch x 1

### Advanced Controller Wiring

| Purpose | Colour | GPIO Pin | Connector Pin |
|---------|--------|----------|---------------|
| Power +12V | Red (separate cable) | N/A - connect to 12V of OWL Driver Board | A (#16) |
| Power GND | Black (separate cable) | N/A - connect to GND of OWL Driver Board | B (#16) |
| All nozzles on | Blue (trailer cable) | BOARD 36 | C (#16) |
| Recording toggle | Green (trailer cable) | BOARD 38 | D (#16) |
| Sensitivity toggle | Yellow/Orange (trailer cable) | BOARD 40 | E (#16) |
| Status LED | White (trailer cable) | BOARD 37 | F (#16) |
| Spot spray enable | Red (trailer cable) | BOARD 35 | G (#16) |
| GPIO GND | Brown (trailer cable) | BOARD 39 | H (#16) |

---

## 3D Printed Enclosures

| File | Image | STL |
|------|-------|-----|
| Ute Controller Base | ![image](https://github.com/user-attachments/assets/d8ef7d9a-3832-46e0-b59e-0499ae439311) | [Link](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Controllers/Ute%20Controller%20-%20Base.stl) |
| Ute Controller Top | ![image](https://github.com/user-attachments/assets/2fe56f86-46ed-47ac-9765-461fa061802a) | [Link](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Controllers/Ute%20Controller%20-%20Top.stl) |
| Advanced Controller Base | ![image](https://github.com/user-attachments/assets/600ed3c3-28f4-4dd0-a64d-c67924f8aa41) | [Single](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Controllers/Advanced%20Controller%20-%20Base%20-%20Single%20OWL.stl) / [Double](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Controllers/Advanced%20Controller%20-%20Base%20-%20Double%20OWL.stl) / [4 OWL](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Controllers/Advanced%20Controller%20-%20Base%20-%204%20OWL.stl) |
| Advanced Controller Top | ![image](https://github.com/user-attachments/assets/56b64d4f-27a8-40ee-9052-79cc86fe0e90) | [Single](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Controllers/Advanced%20Controller%20-%20Top%20-%20Single%20OWL.stl) / [Double](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Controllers/Advanced%20Controller%20-%20Top%20-%20Double%20OWL.stl) / [4 OWL](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Controllers/Advanced%20Controller%20-%20Top%20-%204%20OWL.stl) |

---

## Making Connections

Connections can be either soldered with heat shrink or connected with automotive-style blade fittings.

LEDs should be carefully soldered and covered with heat shrink.

Crimp connections for Amphenol Fathomlock connectors work best with a crimping tool. Check quality by tugging gently. Improperly crimped connections can cause problems and/or create fire risk.

```{admonition} Cable Protection
:class: tip

A [Nylon Hose Protector](https://www.amazon.com/nylon-hose-sleeve/) sleeve will increase the lifetime of cabling without adding too much expense.
```

---

## Config File Settings

Update the controller section of `config.ini`:

```ini
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
```

**Ute Controller:** The toggle switch can be used for either toggling recording or detection. Select this mode with `switch_purpose`.

**Advanced Controller:** The sensitivity files switched with the sensitivity switch can be adjusted with `low_sensitivity_config` and `high_sensitivity_config`.

```{admonition} Final Steps
:class: success

With config files set, save them to the OWL, reboot, and you should be ready to go!
```

---

## Next Steps

- [Configuration Guide](../../software/configuration/index.md) - Detailed parameter reference
- [3D Printing Guide](../../hardware/3d-printing/index.md) - Print controller enclosures
