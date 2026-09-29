import type { ToolContext, ToolExecutionResult } from "@vellumai/plugin-api";

export interface LineItem {
  name: string;
  category: "equipment" | "materials" | "labor" | "permit_disposal";
  wholesale_cost: number;
  markup_pct: number;
  billed_amount: number;
}

export interface QuoteTier {
  tier_name: "Good" | "Better" | "Best";
  badge: string;
  summary: string;
  equipment_model: string;
  warranty_years: number;
  efficiency_rating: string;
  labor_hours: number;
  line_items: LineItem[];
  subtotal: number;
  tax_estimate: number;
  total_investment: number;
}

export default {
  name: "generate_contractor_photo_quote",
  description: "Extracts equipment specs and site conditions from photos and spoken field notes, calculates labor and materials, and generates tiered Good/Better/Best estimates for Jobber or QuickBooks.",
  defaultRiskLevel: "low" as const,
  input_schema: {
    type: "object",
    properties: {
      photo_description: {
        type: "string",
        description: "Visual details extracted from job photos or equipment nameplate (model number, fuel type, capacity, condition)",
      },
      trade: {
        type: "string",
        enum: ["plumbing", "hvac", "electrical", "roofing", "general_contracting"],
        description: "Trade discipline",
      },
      client_name: { type: "string", description: "Customer name" },
      job_address: { type: "string", description: "Job site address" },
      spoken_notes: { type: "string", description: "Field technician spoken notes or access constraints" },
      hourly_rate: { type: "number", description: "Contractor labor rate ($/hr, defaults to $135)" },
      target_platform: {
        type: "string",
        enum: ["jobber", "quickbooks", "servicetitan", "pdf"],
        description: "Where to stage the draft quote",
      },
    },
    required: ["photo_description", "trade"],
  },
  async execute(input: Record<string, unknown>, _ctx: ToolContext): Promise<ToolExecutionResult> {
    const photoDesc = String(input.photo_description ?? "").toLowerCase();
    const trade = String(input.trade ?? "plumbing").toLowerCase();
    const client = String(input.client_name ?? "Homeowner");
    const address = String(input.job_address ?? "Job Site");
    const notes = String(input.spoken_notes ?? "");
    const rate = Number(input.hourly_rate ?? 135);
    const platform = String(input.target_platform ?? "jobber");

    const isAtticOrTight = notes.toLowerCase().includes("attic") || notes.toLowerCase().includes("crawl") || notes.toLowerCase().includes("tight");
    const accessAdjustmentHours = isAtticOrTight ? 1.0 : 0.0;

    let tiers: QuoteTier[] = [];

    if (trade === "plumbing") {
      // Water heater replacement logic
      const isGas = photoDesc.includes("gas") || photoDesc.includes("natural gas") || !photoDesc.includes("electric");
      const capacity = photoDesc.includes("40") ? "40-Gallon" : "50-Gallon";
      const fuelLabel = isGas ? "Atmospheric Gas" : "Standard Electric";

      const baseLabor = 4.0 + accessAdjustmentHours;

      // Tier 1: Good (Standard like-for-like replacement)
      const t1Items: LineItem[] = [
        { name: `Bradford White Defender ${capacity} ${fuelLabel} Water Heater`, category: "equipment", wholesale_cost: 820, markup_pct: 25, billed_amount: 1025 },
        { name: "Code Compliance Package: Thermal Expansion Tank, Brass Ball Valve & Gas Flex Line", category: "materials", wholesale_cost: 110, markup_pct: 35, billed_amount: 148.50 },
        { name: `Certified Plumbing Installation & Pressure Testing (${baseLabor} hrs @ $${rate}/hr)`, category: "labor", wholesale_cost: baseLabor * rate, markup_pct: 0, billed_amount: baseLabor * rate },
        { name: "Municipal Permit Filing & Old Equipment Eco-Disposal", category: "permit_disposal", wholesale_cost: 115, markup_pct: 0, billed_amount: 115 },
      ];
      const t1Subtotal = t1Items.reduce((acc, i) => acc + i.billed_amount, 0);

      // Tier 2: Better (High-Recovery / Extended Warranty)
      const t2Labor = baseLabor + 0.5;
      const t2Items: LineItem[] = [
        { name: `Bradford White High-Recovery ${capacity} ${fuelLabel} (10-Yr Tank Warranty)`, category: "equipment", wholesale_cost: 1080, markup_pct: 25, billed_amount: 1350 },
        { name: "Pro Safety Kit: Lead-Free Brass Full-Port Shutoff, Sediment Trap & Solid Copper Connectors", category: "materials", wholesale_cost: 165, markup_pct: 35, billed_amount: 222.75 },
        { name: `Master Plumber Installation & Water Quality Tune-Up (${t2Labor} hrs @ $${rate}/hr)`, category: "labor", wholesale_cost: t2Labor * rate, markup_pct: 0, billed_amount: t2Labor * rate },
        { name: "Municipal Permit Filing & Old Equipment Eco-Disposal", category: "permit_disposal", wholesale_cost: 115, markup_pct: 0, billed_amount: 115 },
      ];
      const t2Subtotal = t2Items.reduce((acc, i) => acc + i.billed_amount, 0);

      // Tier 3: Best (Endless Hot Water / Ultra-Efficient Tankless)
      const t3Labor = baseLabor + 3.0;
      const t3Items: LineItem[] = [
        { name: "Navien NPE-240A2 Ultra High-Efficiency Condensing Tankless System", category: "equipment", wholesale_cost: 1850, markup_pct: 25, billed_amount: 2312.50 },
        { name: "Direct Vent Intake/Exhaust Piping, Scale-Prevention Filter & Dedicated Recirculation Kit", category: "materials", wholesale_cost: 380, markup_pct: 30, billed_amount: 494 },
        { name: `Comprehensive Tankless Retrofit & Commissioning (${t3Labor} hrs @ $${rate}/hr)`, category: "labor", wholesale_cost: t3Labor * rate, markup_pct: 0, billed_amount: t3Labor * rate },
        { name: "Municipal Permit Filing & Old Equipment Eco-Disposal", category: "permit_disposal", wholesale_cost: 115, markup_pct: 0, billed_amount: 115 },
      ];
      const t3Subtotal = t3Items.reduce((acc, i) => acc + i.billed_amount, 0);

      tiers = [
        {
          tier_name: "Good",
          badge: "Reliable Standard",
          summary: `Direct replacement ${capacity} ${fuelLabel} water heater with code compliance kit.`,
          equipment_model: `Bradford White RG250T6N (${capacity})`,
          warranty_years: 6,
          efficiency_rating: "0.64 UEF",
          labor_hours: baseLabor,
          line_items: t1Items,
          subtotal: Number(t1Subtotal.toFixed(2)),
          tax_estimate: Number((t1Subtotal * 0.0825).toFixed(2)),
          total_investment: Number((t1Subtotal * 1.0825).toFixed(2)),
        },
        {
          tier_name: "Better",
          badge: "Most Popular",
          summary: `Upgraded 10-year warranty high-recovery unit with brass full-port fittings.`,
          equipment_model: `Bradford White RG2F50N10 (${capacity} High-Recovery)`,
          warranty_years: 10,
          efficiency_rating: "0.70 UEF",
          labor_hours: t2Labor,
          line_items: t2Items,
          subtotal: Number(t2Subtotal.toFixed(2)),
          tax_estimate: Number((t2Subtotal * 0.0825).toFixed(2)),
          total_investment: Number((t2Subtotal * 1.0825).toFixed(2)),
        },
        {
          tier_name: "Best",
          badge: "Endless Hot Water",
          summary: `Continuous high-efficiency tankless system with built-in recirculation pump.`,
          equipment_model: "Navien NPE-240A2 Premium Condensing",
          warranty_years: 15,
          efficiency_rating: "0.96 UEF Energy Star",
          labor_hours: t3Labor,
          line_items: t3Items,
          subtotal: Number(t3Subtotal.toFixed(2)),
          tax_estimate: Number((t3Subtotal * 0.0825).toFixed(2)),
          total_investment: Number((t3Subtotal * 1.0825).toFixed(2)),
        },
      ];
    } else {
      // General trade fallback (HVAC / Electrical / GC)
      const baseLabor = 3.5 + accessAdjustmentHours;
      const t1Items: LineItem[] = [
        { name: "Standard Trade Equipment & Spec Unit", category: "equipment", wholesale_cost: 750, markup_pct: 25, billed_amount: 937.50 },
        { name: "Standard Installation Hardware & Fasteners", category: "materials", wholesale_cost: 120, markup_pct: 30, billed_amount: 156 },
        { name: `Field Installation (${baseLabor} hrs @ $${rate}/hr)`, category: "labor", wholesale_cost: baseLabor * rate, markup_pct: 0, billed_amount: baseLabor * rate },
        { name: "Permit Filing & Site Cleanup", category: "permit_disposal", wholesale_cost: 95, markup_pct: 0, billed_amount: 95 },
      ];
      const t1Sub = t1Items.reduce((acc, i) => acc + i.billed_amount, 0);

      tiers = [
        {
          tier_name: "Good",
          badge: "Standard Spec",
          summary: "Direct replacement matching existing job specifications.",
          equipment_model: "OEM Standard Spec",
          warranty_years: 5,
          efficiency_rating: "Standard Code",
          labor_hours: baseLabor,
          line_items: t1Items,
          subtotal: Number(t1Sub.toFixed(2)),
          tax_estimate: Number((t1Sub * 0.0825).toFixed(2)),
          total_investment: Number((t1Sub * 1.0825).toFixed(2)),
        },
      ];
    }

    const quoteId = `QUO-${Date.now().toString().slice(-5)}`;

    return {
      output: {
        quote_id: quoteId,
        client_name: client,
        job_address: address,
        trade,
        staged_platform: platform,
        status: "staged_draft",
        tiers,
        recommended_tier: tiers.length > 1 ? "Better" : "Good",
        ready_for_sync: true,
      },
    };
  },
};
