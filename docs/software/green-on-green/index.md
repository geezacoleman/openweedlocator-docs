# Green-on-Green Detection

```{admonition} Experimental Feature
:class: warning

Green-on-Green capability is experimental and under active development.
```

## Overview

Green-on-Green (GoG) detection enables the OWL to identify weeds growing within crops, rather than just on bare soil (Green-on-Brown).

While we previously implemented in-crop detection models with the Google Coral and Pycoral, the lack of support has made us reconsider that approach. Running detection models like YOLO is in the works to run on:

- Base Raspberry Pi 5
- Raspberry Pi AI Kit with Hailo 8L

If you would like to try the Google Coral, you can by following the instructions in the `models` directory.

## Model Training

Effective models need training data. If you're interested in using Green-on-Green functionality, you will need to:

1. **Collect images** of relevant weeds in your specific conditions
2. **Annotate images** to identify weed locations
3. **Train a model** using the annotated dataset

Alternatively, check [Weed-AI](https://weed-ai.sydney.edu.au/explore?is_head_filter=%5B%22latest+version%22%5D) to see if existing image datasets may be relevant for your purposes.

## Training Tools

[YOLOv8](https://github.com/ultralytics/ultralytics) and [YOLOv5](https://github.com/ultralytics/yolov5) currently provide the most user-friendly methods of:

- Training models
- Optimisation
- Exporting as `.tflite` files for use with Google Coral

There is also a Weed-AI Google Colab Notebook for training models directly from Weed-AI data:

<a target="_blank" href="https://colab.research.google.com/github/Weed-AI/Weed-AI/blob/master/weed_ai_yolov5.ipynb">
<img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>

```{admonition} Known Issue
:class: warning

There appear to be some issues with the exporting functionality of YOLOv5/v8 to `.tflite` models for use with the Coral. The issue has been raised on the Ultralytics repository and should hopefully be resolved soon. You can follow the updates [here](https://github.com/ultralytics/ultralytics/issues/1312).
```

## Configuration

Green-on-Green parameters in `config.ini`:

```ini
[GreenOnGreen]
# parameters related to green-on-green detection
model_path = models
confidence = 0.5
class_filter_id = None
```

| Parameter | Description |
|-----------|-------------|
| `model_path` | Path to the model file |
| `confidence` | Cutoff confidence for detection (0.5 = 50%) |
| `class_filter_id` | Filter to target specific classes |

---

## Next Steps

- [Configuration Guide](../configuration/index.md) - Full parameter reference
- [Weed-AI](https://weed-ai.sydney.edu.au/) - Access training datasets
