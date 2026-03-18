# Community

OpenWeedLocator is an open-source project built by researchers and farmers. Whether you're building your first unit, training weed detection models, or improving the codebase, there are several ways to get involved.

## Contributing

We welcome contributions of all kinds:

- **Bug reports and feature requests** — open an issue on [GitHub](https://github.com/geezacoleman/OpenWeedLocator/issues)
- **Code contributions** — fork the repository, make your changes, and submit a pull request
- **Weed detection models** — share trained models or annotated datasets with the community
- **Field testing** — report your experiences with different crops, weeds, and conditions
- **Documentation** — help improve these docs or translate them

See the [Development Setup](../software/development/index.md) guide for getting started with the codebase on your desktop.

## Publications

If you use OWL in your research, please cite the relevant publications below.

### OWL platform and fallow weed detection

The original paper introducing the OpenWeedLocator platform, its design, and validation across seven fallow fields in New South Wales, Australia.

> Coleman, G., Salter, W. and Walsh, M. (2022). OpenWeedLocator (OWL): an open-source, low-cost device for fallow weed detection. *Scientific Reports*, 12(1), 170. [doi:10.1038/s41598-021-03858-9](https://doi.org/10.1038/s41598-021-03858-9)

**Key findings:**

- Four colour-based detection algorithms (ExG, ExGR, ExHSV, HSV) were validated for fallow weed detection
- Average precision of 79% and recall of 52% across all fields and algorithms
- Individual transects achieved up to 92% precision and 74% recall
- Total hardware cost under AU$400, making site-specific weed control accessible to smaller operations
- A comprehensive GitHub repository was developed to promote community-driven technology development in agriculture

```{admonition} BibTeX
:class: dropdown

\`\`\`bibtex
@article{Coleman2022,
  author  = {Coleman, Guy and Salter, William and Walsh, Michael},
  title   = {{OpenWeedLocator (OWL): an open-source, low-cost device for fallow weed detection}},
  journal = {Scientific Reports},
  volume  = {12},
  number  = {1},
  pages   = {170},
  year    = {2022},
  doi     = {10.1038/s41598-021-03858-9}
}
\`\`\`
```

### Speed and camera performance

A follow-up study investigating the effect of ground speed (5--30 km/h) and camera hardware on weed detection performance, using tillage radish (*Raphanus sativus*) and forage oats (*Avena sativa*) as representative broadleaf and grass weeds.

> Coleman, G.R.Y., Macintyre, A., Walsh, M.J. and Salter, W.T. (2023). Investigating image-based fallow weed detection performance on *Raphanus sativus* and *Avena sativa* at speeds up to 30 km h^-1^. *Computers and Electronics in Agriculture*, 215, 108419. [doi:10.1016/j.compag.2023.108419](https://doi.org/10.1016/j.compag.2023.108419)

**Key findings:**

- Four camera/software combinations were tested on the OWL platform: Raspberry Pi HQ camera (default and optimised settings), Raspberry Pi v2 camera, and an Arducam AR0234 global shutter camera
- The global shutter Arducam AR0234 achieved the highest recall — up to 100% for broadleaf weeds and 91.6% for grass weeds at 5 km/h
- At 30 km/h, the Arducam's grass weed recall declined by 12.4%, but broadleaf recall was not significantly affected
- All cameras experienced decreasing recall with increasing speed — the default HQ camera showed the steepest decline at 1.12% per km/h for broadleaf weeds
- Detection of grass weeds (forage oats) was significantly worse than broadleaf weeds (tillage radish) across all cameras
- Despite variations in recall, the HQ and v2 cameras maintained near-perfect precision at all tested speeds
- Results highlight the importance of camera selection and software tuning for real-world deployment

```{admonition} BibTeX
:class: dropdown

\`\`\`bibtex
@article{Coleman2023,
  author  = {Coleman, Guy R.Y. and Macintyre, Angus and Walsh, Michael J. and Salter, William T.},
  title   = {{Investigating image-based fallow weed detection performance on Raphanus sativus and Avena sativa at speeds up to 30 km h-1}},
  journal = {Computers and Electronics in Agriculture},
  volume  = {215},
  pages   = {108419},
  year    = {2023},
  doi     = {10.1016/j.compag.2023.108419}
}
\`\`\`
```

## Datasets

Annotated weed image datasets are available on [Weed-AI](https://weed-ai.sydney.edu.au/), a community platform for sharing weed detection training data. If you collect and annotate images for your own OWL deployment, consider contributing them back.

## Getting Help

- **GitHub Issues** — [Report bugs or request features](https://github.com/geezacoleman/OpenWeedLocator/issues)
- **GitHub Discussions** — [Ask questions and share ideas](https://github.com/geezacoleman/OpenWeedLocator/discussions)

## Licence

OpenWeedLocator is released under the [MIT Licence](https://github.com/geezacoleman/OpenWeedLocator/blob/main/LICENSE).
