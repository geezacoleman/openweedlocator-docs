# Green-on-Green Detection

Green-on-Green (GoG) detection enables the OWL to identify weeds growing within crops, where traditional colour-based detection cannot distinguish weed from crop.

## Overview

GoG uses YOLO object detection models to identify weeds directly, regardless of background. Two inference backends are supported:

| Backend | Format | Best for |
|---------|--------|----------|
| **NCNN** (recommended) | Directory with `.param` + `.bin` files | Production on Raspberry Pi — fast, no GPU needed |
| **PyTorch** | Single `.pt` file | Development and training |

Models are loaded automatically from the `models/` directory. The OWL auto-detects the model format.

## Detection Modes

OWL supports two GoG detection strategies, selected by the `algorithm` config key:

**`gog` — Direct detection**
: The YOLO model detects weeds directly. Each detection bounding box is mapped to a relay lane for actuation. Use this when your model is trained specifically on weeds.

**`gog-hybrid` — Crop masking + colour detection**
: The YOLO model identifies and masks crop regions. The remaining (non-crop) areas are then processed with the ExHSV colour algorithm to find weeds. Use this when you have a crop model but not a weed-specific model.

## Actuation Modes

How YOLO detections are mapped to relay lanes:

**`centre` (default)**
: The horizontal centre of each bounding box determines which relay lane fires. Works with both detection and segmentation models.

**`zone`**
: Uses the segmentation mask to count pixels in each relay lane. Only fires if the pixel count exceeds `min_detection_pixels`. Requires a segmentation model (trained with `-seg` suffix).

Set the mode with the `actuation_mode` key in `[GreenOnGreen]`.

## Model Management

### Placing models manually

Copy model files to `~/owl/models/` on the Raspberry Pi:

- **NCNN**: A directory containing a `.param` and `.bin` file pair
- **PyTorch**: A single `.pt` file

```bash
# Example: copy an NCNN model
scp -r my_model_ncnn/ owl@owl.local:~/owl/models/
```

### Upload and deploy via dashboard

The networked controller includes a model management page for uploading and deploying models wirelessly:

1. Open the controller's `/models` page from a laptop browser
2. Upload a `.pt` file or `.zip` containing NCNN `.param` + `.bin` files
3. Select target OWL devices
4. Click Deploy — the model is transferred to each OWL over the network

### Hot-swap via AI tab

The dashboard AI tab lets you switch between models without restarting:

1. Open the **AI** tab in the dashboard
2. Select a model from the dropdown — shows model type (detection/segmentation), format, and size
3. Filter which classes to detect using the class button grid
4. Click **Apply** to hot-swap the model

## Weed Tracking

When `tracking_enabled = True` in the `[Tracking]` config section, OWL uses ByteTrack to assign persistent IDs to detected weeds across frames. This provides:

- **Class smoothing**: Predictions are averaged over a sliding window (`track_class_window` frames) to reduce class flickering
- **Crop mask stabilisation**: In `gog-hybrid` mode, crop mask regions persist for `track_crop_persist` frames after a crop detection leaves the frame, preventing false positives at crop edges

Tracking adds minimal overhead and is recommended for GoG deployments.

## Training Your Own Model

1. **Collect images** of weeds in your specific field conditions — lighting, soil type, growth stage, and crop all matter
2. **Annotate images** using [Roboflow](https://roboflow.com/) or [Label Studio](https://labelstud.io/) to draw bounding boxes (or polygons for segmentation) around weeds
3. **Train with Ultralytics YOLO**:
   ```bash
   pip install ultralytics
   yolo detect train data=your_dataset.yaml model=yolov8n.pt epochs=100 imgsz=320
   ```
4. **Export to NCNN** for deployment on Raspberry Pi:
   ```bash
   yolo export model=best.pt format=ncnn imgsz=320
   ```
   This creates a directory with `.param` and `.bin` files ready to copy to `~/owl/models/`.

Check [Weed-AI](https://weed-ai.sydney.edu.au/explore?is_head_filter=%5B%22latest+version%22%5D) for existing annotated weed image datasets that may be relevant for your conditions.

## Configuration

### GreenOnGreen parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `model_path` | `models` | Directory containing YOLO model files. |
| `confidence` | `0.5` | Minimum confidence threshold (0.0-1.0). |
| `detect_classes` | *(empty)* | Comma-separated class IDs to detect. Empty = all classes. |
| `actuation_mode` | `centre` | Relay mapping: `centre` (box centre) or `zone` (mask pixel count). |
| `min_detection_pixels` | `50` | Minimum mask pixels for zone mode actuation. |
| `inference_resolution` | `320` | YOLO input image size. Smaller = faster, larger = more accurate. |
| `crop_buffer_px` | `20` | Pixel buffer around crop mask regions (gog-hybrid). |

### Tracking parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `tracking_enabled` | `False` | Enable ByteTrack multi-object tracking. |
| `track_class_window` | `5` | Frames to smooth class predictions over. |
| `track_crop_persist` | `3` | Frames a crop mask persists after detection leaves. |

---

## Next Steps

- [Configuration Guide](../configuration/index.md) - Full parameter reference
- [AI Assistant](../agent/index.md) - Control detection settings through natural language
- [Weed-AI](https://weed-ai.sydney.edu.au/) - Access training datasets
