# AI Assistant

The OWL dashboard includes an optional AI chat assistant that lets you control your OWL through natural language. It is available in both the standalone and networked dashboards via the **Agent** tab.

```{admonition} API key required
:class: tip

The AI assistant requires an API key from Anthropic or OpenAI. The rest of the dashboard works without it. API usage costs are billed by the provider.
```

## Setup

1. Install `httpx` if not already present (the setup scripts install it automatically):
   ```bash
   workon owl
   pip install httpx
   ```
2. Open the dashboard and switch to the **Agent** tab
3. Select a provider (Anthropic or OpenAI)
4. Enter your API key
5. Click **Connect**

Your API key is stored in the browser session only — it is never saved to disk or transmitted anywhere other than the provider's API.

## What You Can Do

Talk to the assistant in plain language. Here are some examples:

**Adjust settings**
: "Make detection more sensitive" / "Set exg_min to 30" / "Widen the hue range"

**Switch algorithms**
: "Switch to the exg algorithm" / "Use green-on-green detection"

**Manage presets**
: "Save current settings as Morning" / "Apply the high sensitivity preset" / "Delete the Dusk preset"

**Inspect state**
: "Show me the current detection settings" / "What algorithm is active?" / "How many relays are configured?"

**Custom algorithms**
: "Create an algorithm that detects orange objects" / "List my custom algorithms"

**Vision**
: "Here's a photo from my field — suggest settings" (upload an image or grab a live frame)

**Widgets**
: "Add a toggle button for tracking" / "Create a slider for confidence threshold"

```{admonition} Limitations
:class: note

The assistant cannot modify hardware settings — GPIO pin assignments, relay mappings, MQTT configuration, and network settings are protected and must be changed manually in the config files.
```

## Available Tools

The assistant has access to tools that let it observe and modify OWL state.

### Observe

| Tool | Description |
|------|-------------|
| `get_system_status` | Read current detection state, FPS, algorithm, mode, and all parameters |
| `get_config` | Read config values by section and key |
| `list_presets` | List available sensitivity presets and which is active |
| `list_widgets` | List dashboard widgets created by the agent |
| `list_custom_algorithms` | List user-created custom detection algorithms |

### Apply

| Tool | Description |
|------|-------------|
| `set_config_param` | Change a single config parameter |
| `set_algorithm` | Switch detection algorithm |
| `set_sensitivity` | Apply a sensitivity preset |
| `set_detection` | Enable/disable detection or switch modes |
| `create_preset` | Save current thresholds as a named preset |
| `create_widget` | Add a UI widget to the dashboard |
| `create_algorithm` | Deploy a custom detection algorithm |
| `run_algorithm_test` | Test a custom algorithm on a synthetic image |
| `delete_algorithm` | Remove a custom algorithm |

## Custom Algorithms

The assistant can create custom detection algorithms — Python functions that process camera frames using OpenCV and NumPy.

**How they work:**

- Each algorithm is a Python function that receives a BGR image (NumPy array) and a `params` dict containing the current threshold values (exg_min, hue_min, saturation_max, etc.)
- It returns a grayscale image that gets thresholded by the system, or a pre-thresholded binary image
- Only `cv2`, `numpy`, and `math` imports are allowed (sandboxed for safety)
- Algorithms are tested on synthetic images before deployment
- Once created, they appear in the algorithm selector alongside the built-in algorithms

**Example conversation:**

> "Create an algorithm that detects reddish-brown objects for detecting dry weeds"

The assistant will write the algorithm code, test it, and deploy it. You can then select it from the dashboard algorithm dropdown.

## Widgets

The assistant can create dashboard UI components that appear in designated widget slots:

- **Toggle buttons** — for enabling/disabling features like tracking
- **Sliders** — for adjusting numeric parameters
- **Stat displays** — for showing live values
- **Action buttons** — for triggering commands

Widgets persist across page reloads and can be removed by asking the assistant.

## Vision

Upload a photo or ask the assistant to grab a live frame from the camera. The assistant can analyse:

- Weed species and growth stage
- Soil and lighting conditions
- Whether current detection settings are appropriate
- Suggested parameter adjustments for the conditions shown

## Sessions

Conversations are auto-saved and can be resumed later:

- Open the session list from the Agent tab header
- Continue a previous conversation with full context
- Delete old sessions to free space
- Sessions are stored locally on the OWL

## Supported Providers

| Provider | Models | Notes |
|----------|--------|-------|
| **Anthropic** (recommended) | Claude | Best performance for OWL tasks |
| **OpenAI** | GPT-4o | Alternative option |

---

## Next Steps

- [Configuration Guide](../configuration/index.md) - Full parameter reference
- [Green-on-Green](../green-on-green/index.md) - In-crop weed detection with YOLO
