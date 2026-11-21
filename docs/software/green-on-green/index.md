# Green-on-Green Detection

Green-on-Green (GoG) detection enables the OWL to identify weeds growing within crops, where traditional colour-based detection cannot distinguish weed from crop.

## Overview

GoG uses YOLO object detection models to identify weeds directly, regardless of background. Two inference backends are supported:

| Backend | Format | Best for |
|---------|--------|----------|
| **NCNN** (recommended) | Directory with `.param` + `.bin` files | Production on Raspberry Pi — fast, no GPU needed |
| **PyTorch** | Single `.pt` file | Development and training |

Models are loaded automatically from the `models/` directory. The OWL auto-detects the model format.

## Hardware Requirements

The OWL runs YOLO inference natively on the Raspberry Pi via NCNN. The Google Coral USB Accelerator that earlier
documentation referenced is no longer recommended — it has been superseded by the Raspberry Pi AI Hat+, which is the
current recommended accelerator for in-field Green-on-Green deployments.

**Recommended:** a Hailo AI accelerator on a Raspberry Pi 5 or Compute Module 5. The OWL runs AI on the Hailo-8 (26 TOPS: AI HAT+ 26T, M.2 modules, OWL CM5 units) and the Hailo-8L (13 TOPS: Raspberry Pi AI Kit, AI HAT+ 13T). The Waveshare variant of the AI HAT+ is widely available — [Waveshare AI Hat+](https://www.waveshare.com/raspberry-pi-ai-hat-plus.htm?sku=29050) — and other Hailo-8/8L boards work the same way. The Hailo-8 runs larger models faster. The Hailo-10H (AI HAT+ 2) is not supported yet: it needs a different runtime, and AI runs on the CPU instead. See [Hailo AI accelerators](#hailo-ai-accelerators).

**Without an accelerator:** the Pi can run smaller NCNN models on CPU only. That works for testing and low-resolution
inference, but the AI Hat+ is what unlocks larger image sizes and the frame rates needed for boom-speed operation.

## Installing AI

AI detection needs `ultralytics` (with PyTorch and NCNN) in the OWL's virtual environment. Units set up with
`owl_setup.sh --factory` ship without it, so a fresh factory unit can only run colour detection until AI is installed.

Every OWL reports what AI it can run in its state and in the standalone `/api/system_stats`:

```json
"ai": {
  "cpu": {"installed": true},
  "hailo": {"present": false, "chip": null, "runtime": false},
  "accelerator": "cpu"
}
```

`accelerator` is `hailo8` or `hailo8l` when that Hailo card, its runtime and ultralytics are all present, `cpu`
when only ultralytics is installed, and `null` when the unit has no AI. While it is `null`, the dashboards refuse the AI and Hybrid modes
with a plain reason instead of selecting a mode the OWL cannot run.

**Install AI from the dashboard or phone app.** `POST /api/ai/install` runs a normal software update at the
branch the OWL is on and also installs `requirements-gog.txt`, which takes CPU-only PyTorch from the PyTorch CPU
index (the PyPI build for 64-bit ARM brings the full NVIDIA CUDA stack, several GB the Pi cannot use). It needs an internet connection (a phone hotspot
works) and about 3 GB of free space, and can take 20 minutes or more on a Pi. Progress is the ordinary update
progress (`GET /api/settings/update/status` on a standalone OWL, `GET /api/update/status` on the networked
controller). On the networked controller the same route takes `{"device_ids": ["owl-1"]}` or `"all"`. If the
install fails, or runs past the update's 30 minute limit, the update rolls back like any other.

**Install AI over SSH:**

```bash
bash ~/owl/owl_update.sh --with-ai
```

### If AI cannot load

Choosing AI is only saved once the OWL reports the model running. If it cannot load (no AI installed, no model,
a damaged model), the OWL keeps detecting with its previous mode, and `algorithm_error` in the state says why.

**AI never falls back to colour detection.** Colour detection only finds green, so in a crop it would spray the
crop. An OWL that starts up with `algorithm = gog` or `gog-hybrid` and cannot load any version of its model raises
the `ai_unavailable` spraying fault. If AI stops while running, the OWL retries a Hailo, then runs the model's CPU
version if it has one, and otherwise raises `ai_lost`. Both faults follow your `on_error` setting: see
[How the OWL decides to spray](../spray-behaviour.md). The config file is not changed, so the unit runs AI again
once the problem is fixed.

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

### How the models folder works

Everything in `~/owl/models/` that shares a base name is one model. Each file or folder is one version (a
"build") of it, and the OWL picks the build to run:

```
models/
  weeds-v3.pt                  CPU version (PyTorch)
  weeds-v3_ncnn_model/         CPU version (NCNN: .param + .bin)
  weeds-v3_h8_hailo_model/     Hailo-8 version (an Ultralytics Hailo export: .hef + metadata.yaml)
  weeds-v3_h8l_hailo_model/    Hailo-8L version
  weeds-v3.json                optional: {"classes": ["ryegrass", "wheat"], "run_on": "auto"}
```

- The dashboards show one entry, `weeds-v3`, with where it runs.
- On a Hailo-8 the Hailo-8 version runs. A Hailo-8L version also runs there. On a Hailo-8L only the Hailo-8L version
  runs. Anything else runs on the CPU (NCNN first, then `.pt`).
- The OWL reads which chip a Hailo file was built for from the file itself, not from its name.
- A bare `.hef` (from your own Hailo compiler or the Hailo Model Zoo) works too. The OWL moves it into a
  `<name>_hailo_model/` folder with the class names it finds: the `.json`, then a same-named NCNN or `.pt` version.
  With none, it uses `class 0`, `class 1`... and every class is sprayed until you add the `.json`.
- `run_on` (`auto`, `hailo` or `cpu`) can be set per model in its `.json`, or for all models under `[GreenOnGreen]`.

### Placing models manually

Copy model files to `~/owl/models/` on the Raspberry Pi:

- **NCNN**: A directory containing a `.param` and `.bin` file pair
- **PyTorch**: A single `.pt` file
- **Hailo**: an Ultralytics `<name>_hailo_model/` folder, or a `.hef` file

```bash
# Example: copy an NCNN model
scp -r my_model_ncnn/ owl@owl.local:~/owl/models/
```

### Upload and deploy via dashboard

The networked controller includes a model management page for uploading and deploying models wirelessly:

1. Open the controller's `/models` page from a laptop browser
2. Upload a `.pt` file, a `.zip` of an NCNN or Hailo model folder, a `.hef`, or a `.json` of class names.
   Files with the same base name group into one model.
3. Click Deploy and select the OWLs. Each one shows what it will get, for example "Hailo-8 version + CPU version",
   "CPU version" or "not enough space".
4. Click Deploy. Each OWL gets the Hailo version for its chip, plus the CPU version as a fallback, in one download.

Each OWL checks the download's SHA-256 before it touches the model it already has. For an NCNN zip it checks
the zip file first (the hash Noktura sends), then the extracted files (the hash the controller sends). A zip
whose files sit in one top-level folder is unpacked without that folder. If the check or the unpacking fails,
the previous model stays in place and `model_download` in the state reports the error.

A standalone OWL (and the phone app) has **Add a model** on the AI models page for the same files. A Hailo version
that the OWL's chip can't run is refused. Models may use up to `model_storage_gb` (3 GB by default). A download or
upload over that, or one that would eat into the recording space (`min_free_gb`), is refused before it starts.

### Hot-swap via AI tab

The dashboard AI tab lets you switch between models without restarting:

1. Open the **AI** tab in the dashboard
2. Select a model from the dropdown — shows model type (detection/segmentation), format, and size
3. Filter which classes to detect using the class button grid
4. Click **Apply** to hot-swap the model

## Hailo AI accelerators

**Setting one up.** `owl_setup.sh` sets up a Hailo by itself when it finds one on PCIe. That covers a CM5 carrier,
or a Pi 5 HAT that has an EEPROM such as the AI Kit or the AI HAT+. A Pi 5 M.2 HAT without an EEPROM needs
`--hailo`. On an OWL that is already set up, use **Set up Hailo** on the AI models page, or run
`bash ~/owl/owl_update.sh --with-hailo`.

The set-up:

- switches PCIe on, staying at Gen 2
- adds `pcie_aspm=off`
- installs `hailo-all`
- patches and rebuilds the Hailo 4.23 driver: it fails every streaming transfer on kernel 6.18
- holds the Hailo packages so an upgrade can't undo the patch
- installs Ultralytics
- reboots

After the reboot, `sudo bash ~/owl/tools/hailo_setup.sh --check` proves the unit. It checks the card, the driver,
the firmware, and runs the benchmark three times.

**Rules for every build:**

- **Heatsink.** A heatsink on the Hailo is required.
- **PCIe speed.** Gen 2 is the default. Try Gen 3 only once the check passes at Gen 2, and run the check again after.
- **Hailo-10H.** It needs HailoRT 5.x, which can't share an image with the 4.x runtime the 8 and 8L use, so it isn't
  set up.

**Making a Hailo version of a model.** Export your trained YOLO model with Ultralytics on an x86 Linux PC with
Hailo's Dataflow Compiler installed:

```bash
yolo export model=best.pt format=hailo name=hailo8l imgsz=640 data=my_dataset.yaml conf=0.1
```

- **`name=hailo8l`** runs on both the Hailo-8 and the Hailo-8L. **`name=hailo8`** runs faster on a Hailo-8, but not
  at all on an 8L.
- **`data=`** should point at images from your own fields: the compiler uses them to calibrate the model.
- **`conf=`** is the confidence cut-off built into the chip's box filter. Detections below it never reach the OWL, so the
  OWL's confidence setting can only raise it. Set it low (0.1); the default is 0.25.
- **On the PC:** Linux x86-64 with Hailo's Dataflow Compiler 3.x (a free Hailo Developer Zone account). Version 3.33
  matches the OWL's HailoRT 4.23. Ultralytics Platform also offers a hosted Hailo export.
- **Output.** The export is a `best_hailo_model/` folder. Rename it to `<model name>_hailo_model` (or zip it and
  upload it), and put it next to the model's `.pt` or NCNN version so the OWL has a CPU fallback.

**If the Hailo stops** in the field (a driver fault, a loose card, overheating):

1. The OWL re-opens it 3 times.
2. If that fails, it runs the same model on the CPU with an amber warning and **Try the Hailo again**.
3. With no CPU version, it raises the `ai_lost` fault.

See [If AI cannot load](#if-ai-cannot-load).

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
