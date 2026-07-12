# Service Images

Drop one image per service here. Each service detail page automatically shows
its image — no code changes needed. Until a file exists, a styled placeholder is
shown instead.

## Naming convention

Name the file exactly `<service-slug>.webp` (lowercase). The page loads
`/service_images/<slug>.webp`.

## Recommended specs
- Format: **.webp** (run `npm run images:webp` to convert from jpg/png)
- Aspect ratio: **4:3** (e.g. 1200×900)
- Keep the subject centred (the image is `object-cover`).

## Expected filenames (15 services)

| Service | File |
| --- | --- |
| Product Development | `product-development.webp` |
| Industrial Design | `industrial-design.webp` |
| Electro-Mechanical Integration | `electro-mechanical-integration.webp` |
| Embedded Systems | `embedded-systems.webp` |
| Reverse Engineering | `reverse-engineering.webp` |
| 3D CAD Modeling | `3d-cad-modeling.webp` |
| Sheet-Metal Design | `sheet-metal-design.webp` |
| 2D Drafting & Documentation | `drafting-documentation.webp` |
| Product Analysis | `product-analysis.webp` |
| Design Validation | `design-validation.webp` |
| CAE / CFD | `cae-cfd.webp` |
| Thermal Analysis | `thermal-analysis.webp` |
| FDM 3D Printing | `fdm.webp` |
| SLA 3D Printing | `sla.webp` |
| SLM Metal 3D Printing | `slm.webp` |
