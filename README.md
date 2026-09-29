# Contractor Photo-to-Quote Estimator (`contractor-photo-to-quote`)

A field plugin for trade contractors (plumbing, HVAC, electrical, roofing, GC) that turns equipment photos and site voice notes into standardized, tiered Good/Better/Best estimates in Jobber or QuickBooks within 5 minutes.

## Features
- **Computer Vision OCR**: Extracts equipment make, model number, serial number, electrical specifications, and capacity directly from rating plates.
- **Price Book & Labor Mapping**: Matches specs to equivalent wholesale replacement units and applies contractor labor rates and material markup tiers.
- **Good / Better / Best Multi-Option Pricing**: Automatically generates tiered proposals (standard code-compliant replacement, high-efficiency upgrade, premium comfort/tankless) to maximize ticket size.
- **Human-in-the-Loop Review**: Renders an Apple-designed interactive driveway estimate table for one-tap staging into Jobber or QuickBooks.

## Tools Included
- `generate_contractor_photo_quote`: Ingests equipment photo descriptions, trade specialty, access notes, and labor rates to calculate itemized labor, materials, permit fees, and Good/Better/Best options.

## License
MIT
