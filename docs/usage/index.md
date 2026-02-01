# Usage

```{toctree}
:maxdepth: 1
:caption: Usage
:titlesonly:
:hidden:

operation/index
use-cases/index
```

This section covers how to operate your OWL in the field and the various applications it can be used for.

## Quick Navigation

::::{grid} 1 1 2 2
:gutter: 3

:::{grid-item-card} Operation Guide
:link: operation/index
:link-type: doc

How the OWL detects weeds, algorithm details, solenoid wiring, and field results.
:::

:::{grid-item-card} Use Cases
:link: use-cases/index
:link-type: doc

Vehicle-mounted spraying, robot integration, and image data collection.
:::
::::

## Overview

The OWL is designed for site-specific weed control in fallow fields. It uses computer vision to detect green vegetation against brown/bare soil backgrounds and triggers solenoids for targeted herbicide application.

### Key Applications

- **Spot spraying** - Site-specific herbicide application
- **Targeted tillage** - Mechanical weed control
- **Spot flaming** - Thermal weed control
- **Image data collection** - Building training datasets for machine learning

### Detection Algorithms

| Algorithm | Sensitivity | Description |
|-----------|-------------|-------------|
| `exg` | Most sensitive | Excess Green - more false positives |
| `exhsv` | Balanced | Combined ExG and HSV - default |
| `hsv` | Least sensitive | HSV thresholding only - most precise |

---

## Community

As more OWLs are built and fallow weed control systems developed, we would love to share the end results. Please get in contact and we can upload images of finished systems.

- Check the [Discussion page](https://github.com/geezacoleman/OpenWeedLocator/discussions) for questions, suggestions, ideas or feedback
- If there's a bug or improvement, please [raise an issue](https://github.com/geezacoleman/OpenWeedLocator/issues)
- Review the [contribution guidelines](https://github.com/geezacoleman/OpenWeedLocator/blob/main/CONTRIBUTING.md) for details on how to contribute
