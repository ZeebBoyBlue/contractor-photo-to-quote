---
name: "contractor-photo-to-quote"
description: "Turns trade job-site photos, equipment nameplates, and panel photos into itemized client estimates and quotes in Jobber or QuickBooks with Good/Better/Best options in 5 minutes."
metadata:
  emoji: "📸"
  vellum:
    display-name: "Contractor Photo-to-Quote Estimator"
    activation-hints:
      - "turn job-site photos into a quote"
      - "estimate quote from equipment photo"
      - "generate Jobber quote from site pictures"
      - "stage plumbing estimate from photo"
      - "HVAC replacement quote from unit tag"
    avoid-when:
      - "uncategorized quickbooks bank feeds"
      - "ecommerce tracking support"
    category: commerce
---

# Contractor Photo-to-Quote Estimator

Converts photos taken on job sites (equipment rating plates, corroded plumbing lines, cramped crawlspaces, electrical sub-panels) into professional, tiered client estimates ready for Jobber, ServiceTitan, or QuickBooks before the contractor leaves the driveway.

## Trigger & Input
Triggered when a trade contractor finishes an on-site consultation or inspection and needs to issue a binding quote:
- Equipment rating plate photo or job-site photo (water heater tag, furnace model label, condenser nameplate, main breaker panel)
- Customer name and job site address
- Preferred trade specialty: Plumbing, HVAC, Electrical, Roofing, or General Remodeling
- Optional verbal notes (e.g. *"tight attic pull, needs new drain pan and shutoff valve"*)

## Execution Workflow

### 1. Vision OCR & Equipment Spec Recognition
Extracts model numbers, serial numbers, manufacture year, electrical requirements (voltage/amperage), fuel type (gas/electric), and tonnage/capacity directly from nameplate photos.

### 2. Price Book & Materials Matching
- Maps extracted specs to equivalent replacement equipment in wholesale catalogs (Bradford White, Rheem, Carrier, Trane, Square D).
- Applies standard parts bundles (copper fittings, gas flex lines, drip legs, circuit breakers, disconnect boxes).
- Pulls contractor's custom labor hour baseline for standard installations (e.g. 4.0 hours for gas water heater changeout).

### 3. Tiered Good / Better / Best Package Generation
Constructs transparent, multi-option client choices to increase ticket size:
- **Good (Standard Replacement):** Like-for-like capacity replacement meeting baseline municipal code.
- **Better (High Efficiency / Extended Warranty):** High-efficiency unit, upgraded brass shutoffs, sediment trap, surge protector.
- **Best (Premium Comfort / Smart System):** Tankless or hybrid heat pump / variable-speed inverter system with lifetime tank warranty and smart monitoring.

### 4. 1-Click Staging to Jobber or QuickBooks
- Renders an Apple-designed interactive driveway estimate table for contractor review.
- **Human-in-the-Loop Safety Gate:** Quotes are staged as drafts. With one tap, the contractor syncs the selected options directly into Jobber, ServiceTitan, Housecall Pro, or QuickBooks, ready for client e-signature.
