# Original OWL

The original OWL lays out all components in a flat design. It makes the connections and interactions within the system
clear. It's a great educational tool to learn the parts required for a weed detection system and has served in the field 
as a functional weed detection system for a number of years.

![Original OWL](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/accae1b1-b00d-40f9-ab95-743b732df2a0)

## Hardware List

| **Component**                                                                 | **Quantity**      | **Link**                                                                                                                                                                                                                                                                                                                                                                                                          |
|-------------------------------------------------------------------------------|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Enclosure**                                                                 |                   |                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Main Case (single Bulgin connector)                                           | 1                 | [STL File](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Original%20OWL/Enclosure%20-%20single%20connector.stl)                                                                                                                                                                                                                                                                           |
| *Main Case (cable glands)*                                                    | 1                 | [STL File](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Original%20OWL/Enclosure%20-%20cable%20gland.stl)                                                                                                                                                                                                                                                                                |
| Main Cover                                                                    | 1                 | [STL File](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Original%20OWL/Enclosure%20-%20cover.stl)                                                                                                                                                                                                                                                                                        |
| Raspberry Pi Mount                                                            | 1                 | [STL File](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Original%20OWL/Raspberry%20Pi%20mount.stl)                                                                                                                                                                                                                                                                                       |
| Relay Control Board Mount                                                     | 1                 | [STL File](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Original%20OWL/Relay%20control%20board%20mount.stl)                                                                                                                                                                                                                                                                              |
| Voltage Regulator Mount                                                       | 1                 | [STL File](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Original%20OWL/Voltage%20regulator%20mount.stl)                                                                                                                                                                                                                                                                                  |
| Camera Mount                                                                  | 1                 | [STL File](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Original%20OWL/Camera%20mount.stl)                                                                                                                                                                                                                                                                                               |
| Enclosure Plug                                                                | 1                 | [STL File](https://github.com/geezacoleman/OpenWeedLocator/blob/main/3D%20Models/Original%20OWL/Enclosure%20plug.stl)                                                                                                                                                                                                                                                                                             |
| **Computing**                                                                 |                   |                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Raspberry Pi 5 4GB (or Pi 4 or 3B+)                                           | 1                 | [Link](https://core-electronics.com.au/raspberry-pi-5-model-b-4gb.html)                                                                                                                                                                                                                                                                                                                                           |
| *Green-on-Green ONLY - Google Coral USB Accelerator                           | 1                 | [Link](https://coral.ai/products/accelerator)                                                                                                                                                                                                                                                                                                                                                                     |
| 64GB SD Card (min. 16 GB)                                                     | 1                 | [Link](https://core-electronics.com.au/extreme-sd-microsd-memory-card-64gb-class-10-adapter-included.html)                                                                                                                                                                                                                                                                                                        |
| **Camera** (choose one)                                                       |                   |                                                                                                                                                                                                                                                                                                                                                                                                                   |
| RECOMMENDED: Raspberry Pi Global Shutter Camera                               | 1                 | [Link](https://core-electronics.com.au/raspberry-pi-global-shutter-camera.html)                                                                                                                                                                                                                                                                                                                                   |
| CCTV 6mm Wide Angle Lens                                                      | 1 (GS or HQ only) | [Link](https://core-electronics.com.au/raspberry-pi-6mm-wide-angle-lens.html)                                                                                                                                                                                                                                                                                                                                     |
| SUPPORTED: Raspberry Pi 12MP HQ Camera                                        | 1                 | [Link](https://core-electronics.com.au/raspberry-pi-hq-camera.html)                                                                                                                                                                                                                                                                                                                                               |
| SUPPORTED: Raspberry Pi Camera Module 3                                       | 1                 | [Link](https://core-electronics.com.au/raspberry-pi-camera-3.html)                                                                                                                                                                                                                                                                                                                                                |
| SUPPORTED: Raspberry Pi V2 Camera (NOT RECOMMENDED)                           | 1                 | [Link](https://core-electronics.com.au/raspberry-pi-camera-board-v2-8-megapixels-38552.html)                                                                                                                                                                                                                                                                                                                      |
| ⚠️NOTE⚠️ If you use the RPi 5, make sure you have the right camera cable | 1                 | [Link](https://core-electronics.com.au/raspberry-pi-camera-fpc-adapter-cable-200mm.html)                                                                                                                                                                                                                                                                                                                          |
| **Power**                                                                     |                   |                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 5V 5A Step Down Voltage Regulator                                             | 1                 | [Link](https://core-electronics.com.au/pololu-5v-5a-step-down-voltage-regulator-d24v50f5.html)                                                                                                                                                                                                                                                                                                                    |
| 4 Channel, 12V Relay Control Board                                            | 1                 | [Link](https://www.jaycar.com.au/arduino-compatible-4-channel-12v-relay-module/p/XC4440?gclid=Cj0KCQjwvYSEBhDjARIsAJMn0ljQf_l5tRY0D4UyDRlaNBFV6-XAj_UGQzC029d-wiwoCyD6Rzy7x2MaAinhEALw_wcB)                                                                                                                                                                                                                       |
| M205 Panel Mount Fuse Holder                                                  | 1                 | [Link](https://www.jaycar.com.au/round-10a-240v-m205-panel-mount-fuse-holder/p/SZ2028?pos=17&queryId=11c21fd77c75a11725bd0f093a0fc862&sort=relevance)                                                                                                                                                                                                                                                             |
| Jumper Wire                                                                   | 1                 | [Link](https://core-electronics.com.au/solderless-breadboard-jumper-cable-wires-female-female-40-pieces.html)                                                                                                                                                                                                                                                                                                     |
| WAGO 2-way Terminal Block                                                     | 2                 | [Link](https://au.rs-online.com/web/p/splice-connectors/8837544/)                                                                                                                                                                                                                                                                                                                                                 |
| Bulgin Connector - Panel Mount                                                | 1                 | [Link](https://au.rs-online.com/web/p/industrial-circular-connectors/8068625/)                                                                                                                                                                                                                                                                                                                                    |
| Bulgin Connector - Plug                                                       | 1                 | [Link](https://au.rs-online.com/web/p/industrial-circular-connectors/8068565/)                                                                                                                                                                                                                                                                                                                                    |
| Micro USB to USB-C adaptor                                                    | 1                 | [Link](https://core-electronics.com.au/usb-micro-b-to-usb-c-adapter-black.html)                                                                                                                                                                                                                                                                                                                                   |
| Micro USB Cable                                                               | 1                 | [Link](https://core-electronics.com.au/micro-usb-cable.html)                                                                                                                                                                                                                                                                                                                                                      |
| **Miscellaneous**                                                             |                   |                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 12V Chrome LED                                                                | 2                 | [Link](https://www.jaycar.com.au/12v-mini-chrome-bezel-red/p/SL2644)                                                                                                                                                                                                                                                                                                                                              |
| 3 - 16V Piezo Buzzer                                                          | 1                 | [Link](https://www.jaycar.com.au/mini-piezo-buzzer-3-16v/p/AB3462?pos=8&queryId=404751ef55b1d6b8adef8b031d16576f&sort=relevance)                                                                                                                                                                                                                                                                                  |
| Brass Standoffs - M2/3/4                                                      | Kit               | [Link](https://www.amazon.com/Hilitchi-360pcs-Female-Standoff-Assortment/dp/B013ZWM1F6/ref=sr_1_5?dchild=1&keywords=standoff+kit&qid=1623697572&sr=8-5)                                                                                                                                                                                                                                                           |
| M3 Bolts/Nuts                                                                 | 4 each or Kit     | [Link](https://www.amazon.com/DYWISHKEY-Pieces-Stainless-Socket-Assortment/dp/B07VNDFYNQ/ref=sr_1_4?crid=2X7QROKBF9F4D&dchild=1&keywords=m3+hex+bolt&qid=1623697718&sprefix=M3+hex%2Caps%2C193&sr=8-4)                                                                                                                                                                                                            |
| Wire - 20AWG (red/black/green/blue/yellow/white)                              | 1 roll each       | [Link](https://www.amazon.com/Electronics-different-Insulated-Temperature-Resistance/dp/B07G2GLKMP/ref=sr_1_1_sspa?dchild=1&keywords=20+awg+wire&qid=1623697639&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyMUNVM1BBQUNKSFNBJmVuY3J5cHRlZElkPUEwNjQ4MTQ5M0dRTE9ZR0MzUFE5VyZlbmNyeXB0ZWRBZElkPUExMDMwNTIwODM5OVVBOTFNRjdSJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==) |
| *Optional*                                                                    |                   |                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Real-time clock module                                                        | 1                 | [Link](https://core-electronics.com.au/adafruit-pirtc-pcf8523-real-time-clock-for-raspberry-pi.html)                                                                                                                                                                                                                                                                                                              |

## Original OWL - Hardware Assembly

```{admonition} Safety Warning
:class: warning

⚠️**NOTE**⚠️ All components listed above are relatively "plug and play" with minimal soldering or complex electronics required.
Follow these instructions carefully and triple check your connections before powering anything on to avoid losing
the [magic smoke](https://en.wikipedia.org/wiki/Magic_smoke) and potentially a few hundred dollars. Never make changes
to the wiring on the detection unit while it is connected to 12V and always remain within the safe operating voltages of
any component.
```

A [video guide](https://www.youtube.com/watch?v=vZqNKogzz8k) is available for the Original OWL assembly.

Before starting, have a look at the complete wiring diagram below to see how everything fits together. The LEDs, fuse and Bulgin connector are all mounted on the rear of the OWL unit, rather than where they are located in the diagram. If you prefer not to use or can't access a Bulgin connector, there is a separate 3D model design that uses cable glands instead.

![wiring diagram-01](https://user-images.githubusercontent.com/40649348/156698009-a58ed01b-258f-462a-9524-ba3f8d7ec246.png)

### Step 1 - enclosure and mounts

Assembling the components for an OWL unit requires the enclosure and mounts as a minimum. These can be 3D printed on
your own printer or printed and delivered from one of the many online stores that offer a 3D printing service.
Alternatively, you could create your own enclosure using a plastic electrical box and cutting holes in it, if that's
easier. We'll be assuming you have printed out the enclosure and associated parts for the rest of the guide, but please
share your finished designs however they turn out!

The first few steps don't require the enclosure so you can make a start right away, but while you're working on getting
that assembled, make sure you have the pieces printing, they'll be used from Step 4. For a complete device, you'll need:
1 x base, 1 x cover, 1 x RPi mount, 1 x relay mount, 1 x regulator mount, 1 x camera mount and 1 x plug.

### Step 2 - soldering

There are only a few components that need soldering, including the fuse and voltage regulator:

* Soldering of voltage regulator pins
* Soldering of 12V input wires to voltage regulator pins
* Soldering of 5V output wires to voltage regulator pins (micro USB cable)
* Soldering of red wire to both fuse terminals

Carefully check which pins on the voltage regulator correspond to 12V in, GND in, 5V out and GND out prior to soldering.

To solder the Micro USB cable to the voltage regulator output, you'll need to cut off the USB A end so you are left with
approximately 10cm of cable. Using the wire strippers or a sharp box cutter/knife, remove the rubber sheath around the
wires. If you have a data + charging cable you should see red, green, white and black wires. The charging only cables
will likely only have the red and black wires. Isolate the red (+5V) and black (GND) wires and strip approximately 5mm
off the end. Solder the red wire to the positive output on the voltage regulator and black wire to the GND pin. Once you
have finished, it should look like the first panel in the figure below.

```{admonition} Soldering Safety
:class: warning

⚠️**NOTE**⚠️ Soldering can burn you and generates potentially hazardous smoke! Use appropriate care, fume extractors and
PPE to avoid any injury. If you're new to soldering, read
through [this guide](https://www.makerspaces.com/how-to-solder/), which explains in more detail how to perfect your
skills and solder safely.

⚠️**NOTE**⚠️ When soldering, it's best to cover the exposed terminals with glue lined heat shrink to reduce the risk of
electrical short circuits.
```

| Voltage regulator | Voltage regulator pins | Fuse |
|:-------------:|:-------------:|:-------------:|
| ![Vreg](https://media.github.sydney.edu.au/user/5402/files/12c53200-ce9e-11eb-812b-52c51a0c6263) | ![Vregpins](https://media.github.sydney.edu.au/user/5402/files/85abe580-d023-11eb-87ee-c3cad42406fe)| ![Fuse](https://media.github.sydney.edu.au/user/5402/files/240e3e80-ce9e-11eb-8c0f-25e296720072) |

Once the two red wires are soldered to the fuse, the fuse can be mounted on the rear panel of the OWL base. One wire
will be connected to the Bulgin plug (next step) and the other to the Wago 2-way block.

For neater wiring you can also solder jumpers between all the normally open (NO) pins on the base of the relay board,
but this is optional. If you don't solder these connections, make sure you connect wire using the screw terminals
instead. Photos of both are provided below.

| Soldered | Screw terminals |
|:-------------:|:-------------:|
| ![Relayboardunderside](https://media.github.sydney.edu.au/user/5402/files/e5938500-cf6c-11eb-91a2-75685a6d948d) | ![Relayboardalternative](https://media.github.sydney.edu.au/user/5402/files/e88e7580-cf6c-11eb-8e26-7bbce2fb3f71) |

The other wires requiring soldering are joins between the buzzer and jumper wires for easy connection to the GPIO pins
and from the LEDs to the power in/jumper wires.

### Step 3 - wiring up Bulgin connector

Next we'll need to wire the output relay control and input 12V wires to the Bulgin panel mount connector. Fortunately
all pins are labelled, so follow the wire number table below. This will need to be repeated for the Bulgin plug as well,
which will connect your solenoids or other devices to the relay control board.

The process is:

1. Connect all wires to Bulgin connector using the screw terminals
2. Mount the connector to the rear panel
3. Leave at least 10cm of wire so it can be connected to the relay board and other connections later.

| Bulgin terminal number | Wire connection |
|:-------------:|:-------------:|
| 1 | Blue wire - connects to centre terminal (common) on relay 1 |
| 2 | Green wire - connects to centre terminal (common) on relay 2 |
| 3 | Orange wire - connects to centre terminal (common) on relay 3 |
| 4 | White wire - connects to centre terminal (common) on relay 4 |
| 5 | Red 12VDC - connects to fuse wire already soldered. Make sure wire is the right length when mounted. |
| 6 | Black GND - connects to Wago 2-way terminal |

```{admonition} Cable Gland Alternative
:class: note

⚠️**NOTE**⚠️ Skip this step if you're using cable glands.
```

Once all the wires have been connected you can now mount the Bulgin connector to the OWL base.

### Step 4 - mounting the relay control board and voltage regulator

Attach the relay control board to the 3D printed relay control board mount using 2.5 mm standoffs. Attach the voltage
regulator to the 3D printed voltage regulator mount with 2 mm standoffs. The mounted voltage regulator can then be
mounted to one corner of the relay control board. The relay board and voltage regulator can then be installed in the
raised slots in the OWL base.

```{admonition} Standoff Sizes
:class: note

⚠️**NOTE**⚠️ Use **2.5 mm** standoffs for mounting the relay control board to its base. Use **2 mm** standoffs to mount the
voltage regulator to its base.
```

![Relaymount](https://media.github.sydney.edu.au/user/5402/files/964c5500-cf6a-11eb-8d2f-e1282b6411c3)

### Step 5 - wiring the relay control board, voltage regulator, Wago 2-way blocks and Bulgin connector

Connect the relay control board to the Bulgin connector using the table in step 3 as a guide.

```{admonition} Relay Board Types
:class: warning

⚠️**NOTE**⚠️ Some relay control boards such
as [this](https://www.amazon.com/ELEGOO-Channel-Optocoupler-Arduino-Raspberry/dp/B01HEQF5HU/ref=asc_df_B01HEQF5HU/?tag=hyprod-20&linkCode=df0&hvadid=198076677096&hvpos=&hvnetw=g&hvrand=5997956897740931812&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9027902&hvtargid=pla-350609711896&psc=1)
on Amazon are ACTIVE on LOW. This means that the signal provided by the Raspberry Pi (a higher voltage) to activate a
relay will instead turn the relay off. While this can be changed in the code, please consider purchasing HIGH level
trigger (
e.g [the board specified in the parts list](https://www.jaycar.com.au/arduino-compatible-4-channel-12v-relay-module/p/XC4440))
or adjustable trigger (
e.g. [this board](https://www.amazon.com/DZS-Elec-Optocoupler-Isolation-Triggered/dp/B07BDJJTLZ/ref=asc_df_B07BDJJTLZ/?tag=hyprod-20&linkCode=df0&hvadid=241912880102&hvpos=&hvnetw=g&hvrand=5997956897740931812&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9027902&hvtargid=pla-438273746158&psc=1)).
```

Next, connect red and black jumper wires to the VCC and GND header pins on the relay control board. Now choose one Wago
block to be a 12V positive block and the second to be the negative or ground. To the positive block, connect the 12 V
wire from the fuse (12V input from source), the 12 V input to the voltage regulator, the 12 V solenoid line from the
relay board and the VCC line from the relay board to one of the two WAGO terminal blocks, twisting the wires together if
necessary. Repeat with the second, negative WAGO terminal block, connecting the input ground line from the Bulgin
connector, ground line from the voltage regulator and the GND black wire from the relay board.

| Installed relay board | Relay board wiring diagram | Relay board wiring |
|:-------------:|:-------------:|:-------------:|
| ![Relayboardinstalled](https://media.github.sydney.edu.au/user/5402/files/54c7a400-cf82-11eb-9fb3-250199227384) | ![OWL - relay board diagram](https://media.github.sydney.edu.au/user/3859/files/431ed600-cf5b-11eb-94df-87f01e0a41a4) | ![relayinputs](https://media.github.sydney.edu.au/user/5402/files/cad01780-d023-11eb-98e0-bfcc1c2c03e0) |

### Step 6 - mounting Raspberry Pi and connecting power

Attach the Raspberry Pi to the 3D printed mount using 2.5 mm standoffs. Install in the raised slots in the OWL base.
Connect to micro USB power from the voltage regulator, using a micro USB to USB-C adaptor. Alternatively, the Raspberry
Pi can be powered over the GPIO, however, this has not yet been implemented.

| Raspberry Pi mount | Raspberry Pi in OWL base |
|:----------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------:|
| ![RPimount](https://media.github.sydney.edu.au/user/5402/files/263dcf00-cf6a-11eb-9781-1c2d79c9b96d) | ![1T7A9540](https://user-images.githubusercontent.com/40649348/156697656-df60257b-773a-425c-9c56-33f6e48013b5.jpeg) |

### Step 7 - connecting GPIO pins

Connect the Raspberry Pi GPIO to the relay control board header pins, using the table below and the wiring diagram above
as a guide:

The GPIO pins on the Raspberry Pi are not clearly labelled, so use this guide to help. Be careful when connecting these
pins as incorrect wiring can shortcircuit/damage your Pi.

![GPIO Guide](https://user-images.githubusercontent.com/51358498/152514046-37d5bcf5-348b-4e39-8810-c877acfed852.png)

| RPi GPIO pin | Relay header pin |
|:------------:|:----------------:|
|      13      |       IN1        |
|      14      |       COM        |
|      15      |       IN2        |
|      16      |       IN3        |
|      18      |       IN4        |

| Raspberry Pi GPIO pins | Relay control board header pins |
|:-------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------:|
| ![GPIOtorelay](https://media.github.sydney.edu.au/user/5402/files/6adb7000-d027-11eb-81b9-5fecfe0c2c4e) | ![relayheaderpins](https://media.github.sydney.edu.au/user/5402/files/2bf8ea80-d026-11eb-8c5c-685563db7691) |

![1T7A9541](https://user-images.githubusercontent.com/40649348/156697725-9a99ba10-b79c-4963-ab15-b07bb95c7d3a.jpeg)

### Step 8 - mounting and connecting camera

Connect one end of the CSI ribbon cable to the camera. We provide a mounting plate that can be used with both the HQ, Global Shutter or
V2 cameras, however, we recommend the use of the HQ camera for improved image clarity. Attach the HQ camera to the 3D
printed mount using 2.5 mm standoffs (or 2 mm standoffs if using the V2 camera). Ensuring that the CSI cable port on the
camera is directed towards the Raspberry Pi, mount the camera inside the OWL case using four M3 standoffs (50 mm long
for HQ camera; 20 mm long for V2 camera). Connect the other end of the CSI cable to the Raspberry Pi CSI camera port.

Before connecting the lens, please be aware the HQ camera comes with fitted a C-CS mount adapter which needs to be
removed before fitting the 6mm lens. The image won't focus unless the adapter is removed. More information is available
below and in the [HQ Camera Datasheet](https://datasheets.raspberrypi.com/hq-camera/cs-mount-lens-guide.pdf)

How to remove the C-CS mount adapter:

| HQ camera C-CS mount adapter | Camera and adapter separated | Lens fitted without adapter |
|:-------------:|:-------------:|:-------------:|
| ![adapter1](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/3ab35c57-77c1-4ce0-b627-410a3598db93)|![adapter2](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/7f50e5c8-9dd7-4e29-94d7-8bf8e907e011)|![adapter3](https://github.com/geezacoleman/OpenWeedLocator/assets/51358498/322d6409-8509-4895-8896-5959a5f529bc) |

Mounting the HQ camera to the 3D printed mount:

| HQ camera and mount | HQ camera mounted in case |
|:-------------:|:-------------:|
| ![1T7A9544](https://user-images.githubusercontent.com/40649348/156695569-ded4679b-f94f-433a-a81f-08a5c409e61c.jpeg) | ![1T7A9545](https://user-images.githubusercontent.com/40649348/156695635-9fd58bb7-303c-4aa8-b5c7-c16b818a51f0.jpeg) |

Mounting the V2 camera to the 3D printed mount:

| V2 camera and mount | V2 camera mounted in case | Raspberry Pi camera port |
|:-------------:|:-------------:|:-------------:|
| ![1T7A9558](https://user-images.githubusercontent.com/40649348/156695701-49598e62-fdba-4416-88d1-fbf158fe99ef.jpeg) | ![1T7A9559](https://user-images.githubusercontent.com/40649348/156695786-c34f84e3-26db-4198-80e3-96a5da4b52d3.jpeg) | ![Cameracable](https://media.github.sydney.edu.au/user/5402/files/7ed2a200-d026-11eb-93cb-26a91d727094) |

The HQ lens will need to be focused, details below, once the software is correctly set up.

### Step 9 - adding buzzer and LEDs

Mount the buzzer inside the OWL base using double sided mounting tape and connect the 5 V and ground wires to Raspberry
Pi GPIO pins 7 and 9, respectively.

For simplicity we have used two 12V LEDs (which are just normal LEDs with a current limiting resistor included) for both
the 5V TX/GND connection for Raspberry Pi status indication and also the 12V power connection. While 12 V will work fine
on both, the 5 V connection will be dimmer. If you want to use a non-prepackaged, 3 mm LED for the 5V connection, you
should solder a current limiting resistor to the LED to prevent damage to either the LED or the Rasperry Pi as
described [here](https://howchoo.com/g/ytzjyzy4m2e/build-a-simple-raspberry-pi-led-power-status-indicator). Install the
5 V LED inside the OWL base and connect the 5V and ground wire to GPIO pins 8 (TX pin) and 20 (GND pin), respectively.
Install the 12 V LED inside the OWL base and connect the 12 V and GND wires to their respective WAGO terminal blocks.

| Buzzer location | LEDs in OWL base | GPIO pins |
|:-------------:|:-------------:|:-------------:|
| ![1T7A9546](https://user-images.githubusercontent.com/40649348/156696065-177d675e-a0c1-45f8-8e17-acf90ef13314.jpeg) | ![LEDs](https://media.github.sydney.edu.au/user/5402/files/79bc1700-cf82-11eb-80b2-646f2c74fcc9) | ![GPIOpins](https://media.github.sydney.edu.au/user/5402/files/e0474080-d027-11eb-93fd-8c7b7c783eea) |

### OPTIONAL STEP - adding real time clock module

Although optional, we recommend that you use a real time clock (RTC) module with the OWL system. This will enable the
Raspberry Pi to hold the correct time when disconnected from power and the internet, and will be useful for debugging
errors if they arise. The RTC uses a CR1220 button cell battery and sits on top of the Raspberry Pi using GPIO pins 1-6.

| PiRTC module | RTC installed on Raspberry Pi |
|:-------------:|:-------------:|
| ![RTC](https://media.github.sydney.edu.au/user/5402/files/a59bd300-d03c-11eb-847a-d0813f44fcb2) | ![1T7A9550](https://user-images.githubusercontent.com/40649348/156696142-8dd8aaa7-756a-4ff2-a638-7ebfb68165e6.jpeg) |

### Step 10 - connecting mounting hardware and OWL cover

There are four 6.5 mm holes on the OWL base for mounting to a boom. Prior to installing the OWL cover, decide on a
mounting solution suitable to your needs. In the photo below, we used 4 x M6 bolts. The cover of the OWL unit is secured
with 4 x M3 nuts and bolts. Place M3 nuts into the slots in the OWL base. This can be fiddly and we suggest using
tweezers, as shown below. Place the cover onto the base and secure using M3 bolts.

| Mounting hardware | Cover nuts | Completed OWL unit |
|:-------------:|:-------------:|:-------------:|
| ![1T7A9551](https://user-images.githubusercontent.com/40649348/156698150-f23571cd-867e-42c7-96ea-125304551d8a.jpeg) | ![1T7A9553](https://user-images.githubusercontent.com/40649348/156698184-464bbded-8e53-4ebc-b6aa-242d8c96ae6e.jpeg) | ![1T7A9554](https://user-images.githubusercontent.com/40649348/156698342-4b3ebba5-337e-469c-bd0e-c34985d57b83.jpeg) |

## Connecting Solenoids for Spot Spraying

### Optional Step - connecting 12V solenoids

Once you have completed the setup, you now have the opportunity to wire up your own solenoids for spot spraying,
targeted tillage, spot flaming or any other targeted weed control you can dream up. To do this, wire the GND wire of
your device (it can be any wire if it's a solenoid) to the ground pin on the Bulgin plug (the same wire used for the GND
from the 12V power source) and wire the other to one of the blue, green, orange or white wires on pins 1 - 4. A wiring
diagram is provided below. The easiest way to wire them together to the same GND wire is to create a six-way harness,
where one end is connected to the plug, one of the five other wires to the source power GND and the remaining four to
the solenoids or whatever devices you are driving.

![solenoid wiring-01](https://user-images.githubusercontent.com/40649348/156698481-3d4fec4e-567a-4a18-b72e-b26d35c8d1c7.png)

| Bulgin plug | Ground wiring harness |
|:-------------:|:-------------:|
| ![Bulginplug](https://media.github.sydney.edu.au/user/5402/files/7f753380-d03a-11eb-8d9b-658db73d3408) | ![Groundharness](https://media.github.sydney.edu.au/user/5402/files/7e440680-d03a-11eb-9af1-67132f4cc36f) |

---

## Next Steps

Congratulations on completing your Original OWL hardware assembly! Here's what to do next:

::::{grid} 1 1 2 2
:gutter: 3

:::{grid-item-card} 💻 Software Installation
:link: ../../software/two-step-install.html

Install the OWL software on your Raspberry Pi to get your detection unit operational.
:::

:::{grid-item-card} ⚙️ Configuration
:link: ../../software/configuration/index.html

Configure detection sensitivity, relay timing, and other parameters for your specific use case.
:::

:::{grid-item-card} 🎯 Operation Guide
:link: ../../usage/operation/index.html

Learn how to operate your OWL in the field, including mounting, alignment, and best practices.
:::

:::{grid-item-card} 🖨️ 3D Printing
:link: ../3d-printing/index.html

Need replacement parts or want to print your own enclosure? Find all STL files and print settings here.
:::
::::