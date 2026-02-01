# Operation Guide

This guide explains how the OWL detects weeds and the image processing workflow.

## Image Processing Workflow

How does OWL detect weeds and trigger the relay control board?

### Step 1: Image Capture

The OWL captures a colour image from the camera using OpenCV and splits it into component channels:
- **RGB**: Red (R), Green (G), Blue (B)
- **HSV**: Hue, Saturation, Value (converted from RGB)

### Step 2: Green Detection

Computer vision algorithms differentiate green vegetation from the background:

**Excess Green (ExG):**
```
ExG = 2 * G - R - B
```

**HSV Thresholding:** Filters based on hue, saturation, and brightness ranges.

![Image Processing](https://user-images.githubusercontent.com/51358498/152990324-d315672c-fb4b-42d2-b4df-363f702c473d.png)

### Step 3: Contour Detection

Once green locations are identified and a binary (black/white) mask is generated:

1. A contouring process outlines each detection
2. If detection pixel area > `minArea` (default: 10), coordinates are recorded
3. Central pixel coordinates relate to an activation zone
4. Zone connects to a specific GPIO pin on the Raspberry Pi
5. GPIO pin drives high → Relay switches → Solenoid activates

![OWL Workflow](https://user-images.githubusercontent.com/51358498/152990264-ddce7eb4-0e2e-4f98-ac77-bc2e535c5c54.png)

---

## Detection Algorithms

| Algorithm | Sensitivity | Best For |
|-----------|-------------|----------|
| `exg` | Most sensitive | Maximum weed detection, accepts more false positives |
| `exgr` | Medium | Balanced detection |
| `exhsv` | Balanced (default) | Good precision with reasonable recall |
| `hsv` | Least sensitive | Minimum false positives, may miss smaller weeds |

### Algorithm Selection

Configure in `config.ini`:

```ini
[System]
algorithm = exhsv
```

---

## Field Results

Performance of each algorithm was tested on 7 different day/night fields:

![Results Boxplot](https://user-images.githubusercontent.com/51358498/152990178-a53256c0-cfda-46d3-83c8-3ae018b4a40e.png)

**Key findings:**
- No significant differences (P > 0.05) for recall and precision between algorithms
- ExHSV was less sensitive (fewer false detections) and more precise
- ExHSV missed more smaller/discoloured weeds compared to ExG

### Detection Performance

![Detection Results](https://user-images.githubusercontent.com/51358498/152989906-bcc47ad5-360a-414c-8e25-d9b99875f361.png)

**What gets detected:**
- Large, green weeds - consistently found
- Small, discoloured weeds - often missed
- Grasses with thin leaves - tend to blur into background

**Improving performance:**
- Faster shutter speed helps reduce motion blur
- Adjust sensitivity parameters for your conditions
- Mount OWL closer to target height

---

## Operating Parameters

Key parameters affecting field operation:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `actuation_duration` | 0.15s | How long relay stays activated |
| `delay` | 0 | Delay between detection and actuation |
| `min_detection_area` | 10 | Minimum pixel area for valid detection |
| `relay_num` | 4 | Number of relay channels |

See [Configuration Guide](../../software/configuration/index.md) for full parameter reference.

---

## Next Steps

- [Wiring & Connections](../wiring/index.md) - Connect solenoids, lights, and other 12V devices
- [Use Cases](../use-cases/index.md) - Example applications and setups
- [Configuration](../../software/configuration/index.md) - Adjust detection parameters
- [Troubleshooting](../../troubleshooting/index.md) - Common issues and solutions
