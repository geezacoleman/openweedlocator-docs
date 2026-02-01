# Development Setup

Using OWL software on your laptop/desktop or other non-Raspberry Pi system is a great way to test, develop and learn more about how it works.

This method has been successfully tested on PyCharm with Anaconda environments.

## Quick Start

Clone the repository:

```bash
git clone https://github.com/geezacoleman/OpenWeedLocator
cd OpenWeedLocator
```

Activate your virtual environment, then install the non-RPi requirements:

```bash
pip install -r non_rpi_requirements.txt
```

Run OWL with display:

```bash
python owl.py --show-display
```

## Virtual Environments

If you're unsure about virtual environments, these resources explain them well:

- [PyImageSearch blog on configuring an Ubuntu environment](https://pyimagesearch.com/2017/09/25/configuring-ubuntu-for-deep-learning-with-python/) - skip to the virtual environment step
- [FreeCodeCamp guide on virtual environments](https://www.freecodecamp.org/news/how-to-setup-virtual-environments-in-python/)

## Testing and Development

Once installed, you can:

- Change command line flags (see [Configuration](../configuration/index.md))
- Modify detection parameters
- Test with images and videos using `--input`
- Visualise detection with `--show-display`

```bash
# Run with custom input
python owl.py --input /path/to/test/images --show-display

# Focus mode
python owl.py --focus
```

---

## Next Steps

- [Configuration Guide](../configuration/index.md) - Adjust parameters
- [Green-on-Green](../green-on-green/index.md) - Experimental deep learning detection
