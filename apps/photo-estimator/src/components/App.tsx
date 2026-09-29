import { useState } from "preact/hooks";

interface LineItem {
  name: string;
  category: "equipment" | "materials" | "labor" | "fee";
  amount: number;
}

interface QuoteTier {
  id: "good" | "better" | "best";
  name: string;
  badge: string;
  tagline: string;
  equipment: string;
  warranty: string;
  efficiency: string;
  laborHours: number;
  total: number;
  items: LineItem[];
}

const SAMPLE_TIERS: QuoteTier[] = [
  {
    id: "good",
    name: "Good",
    badge: "Reliable Standard",
    tagline: "Direct code-compliant replacement with standard manufacturer warranty.",
    equipment: "Bradford White Defender 50-Gal Atmospheric Gas (RG250T6N)",
    warranty: "6-Year Tank & Parts",
    efficiency: "0.64 UEF",
    laborHours: 4.0,
    total: 1985.00,
    items: [
      { name: "Bradford White 50-Gal Gas Tank", category: "equipment", amount: 1025.00 },
      { name: "Thermal Expansion Tank & Brass Full-Port Valve", category: "materials", amount: 148.50 },
      { name: "Certified Installation & Pressure Test (4.0 hrs)", category: "labor", amount: 540.00 },
      { name: "Municipal Permit Filing & Old Unit Haul-Away", category: "fee", amount: 115.00 },
      { name: "Estimated Local Sales Tax (8.25%)", category: "fee", amount: 156.50 },
    ],
  },
  {
    id: "better",
    name: "Better",
    badge: "Most Popular",
    tagline: "Upgraded high-recovery unit with 10-year warranty and sediment defense.",
    equipment: "Bradford White High-Recovery 50-Gal Gas (RG2F50N10)",
    warranty: "10-Year Tank & Parts",
    efficiency: "0.70 UEF High Recovery",
    laborHours: 4.5,
    total: 2475.00,
    items: [
      { name: "Bradford White 10-Yr High-Recovery Tank", category: "equipment", amount: 1350.00 },
      { name: "Pro Safety Kit & Solid Copper Dielectric Connectors", category: "materials", amount: 222.75 },
      { name: "Master Installation & Water System Tune-Up (4.5 hrs)", category: "labor", amount: 607.50 },
      { name: "Municipal Permit Filing & Old Unit Haul-Away", category: "fee", amount: 115.00 },
      { name: "Estimated Local Sales Tax (8.25%)", category: "fee", amount: 179.75 },
    ],
  },
  {
    id: "best",
    name: "Best",
    badge: "Endless Hot Water",
    tagline: "Ultra-efficient tankless system with internal recirculation pump.",
    equipment: "Navien NPE-240A2 Condensing Tankless System",
    warranty: "15-Year Heat Exchanger / 5-Year Parts",
    efficiency: "0.96 UEF Energy Star",
    laborHours: 7.0,
    total: 4150.00,
    items: [
      { name: "Navien NPE-240A2 Ultra Condensing Tankless", category: "equipment", amount: 2312.50 },
      { name: "Direct Vent Intake/Exhaust & Scale Prevention Filter", category: "materials", amount: 494.00 },
      { name: "Comprehensive Tankless Retrofit & Commissioning (7.0 hrs)", category: "labor", amount: 945.00 },
      { name: "Municipal Permit Filing & Old Unit Haul-Away", category: "fee", amount: 115.00 },
      { name: "Estimated Local Sales Tax (8.25%)", category: "fee", amount: 283.50 },
    ],
  },
];

export function App() {
  const [selectedTierId, setSelectedTierId] = useState<"good" | "better" | "best">("better");
  const [status, setStatus] = useState<"draft" | "synced">("draft");
  const [platform, setPlatform] = useState<"jobber" | "quickbooks">("jobber");

  const activeTier = SAMPLE_TIERS.find((t) => t.id === selectedTierId) || SAMPLE_TIERS[1];

  const handleSync = () => {
    setStatus("synced");
  };

  return (
    <div style={{ maxWidth: "860px", margin: "28px auto", padding: "0 20px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#E8F5E9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
            📸
          </div>
          <div>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "22px", margin: 0, fontWeight: 400, color: "#191816" }}>Driveway Photo-to-Quote Estimator</h1>
            <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#666" }}>Turn equipment photos & site notes into Jobber quotes in 5 minutes</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "#666", fontWeight: 500 }}>Target:</span>
          {(["jobber", "quickbooks"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              style={{
                background: platform === p ? "#191816" : "#FFFFFF",
                color: platform === p ? "#FFFFFF" : "#555",
                border: "1px solid rgba(0,0,0,0.12)",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "12px",
                textTransform: "capitalize",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Context Card */}
      <div style={{ background: "#FAFAF9", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "12px", padding: "14px 16px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
        <div>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#888", fontWeight: 600 }}>Detected From Photo Tag</div>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#191816", marginTop: "2px" }}>Rheem Criterion 50-Gal Natural Gas (Model: 42VR50-40) · Mfd 2011 (15 yrs old)</div>
          <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>Site Constraint: Garage installation, existing thermal expansion loop present, 1/2" gas line verified.</div>
        </div>
        <span style={{ fontSize: "11px", background: "#EBF5EC", color: "#216C37", padding: "4px 10px", borderRadius: "999px", fontWeight: 600, whiteSpace: "nowrap" }}>
          ✓ OCR Matched (98%)
        </span>
      </div>

      {/* Tier Selection Pills */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "20px" }}>
        {SAMPLE_TIERS.map((tier) => {
          const isSelected = tier.id === selectedTierId;
          return (
            <div
              key={tier.id}
              onClick={() => setSelectedTierId(tier.id)}
              style={{
                background: isSelected ? "#F3F7F4" : "#FFFFFF",
                border: isSelected ? "2px solid #216C37" : "1px solid rgba(0,0,0,0.1)",
                borderRadius: "12px",
                padding: "16px",
                cursor: "pointer",
                transition: "all 0.15s ease",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontWeight: 700, fontSize: "15px", color: "#191816" }}>{tier.name}</span>
                <span style={{
                  fontSize: "10px",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  background: tier.id === "better" ? "#216C37" : "#EAE9E5",
                  color: tier.id === "better" ? "#FFFFFF" : "#555",
                }}>
                  {tier.badge}
                </span>
              </div>
              <div style={{ fontSize: "20px", fontWeight: 700, color: "#191816", margin: "4px 0" }}>
                ${tier.total.toFixed(2)}
              </div>
              <div style={{ fontSize: "11px", color: "#666", lineHeight: 1.4 }}>{tier.tagline}</div>
              <div style={{ marginTop: "10px", paddingTop: "8px", borderTop: "1px solid rgba(0,0,0,0.06)", fontSize: "11px", color: "#444" }}>
                Warranty: <strong>{tier.warranty}</strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Quote Breakdown */}
      <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid rgba(0,0,0,0.08)", paddingBottom: "12px" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "16px", fontFamily: "Georgia, serif", color: "#191816" }}>
              {activeTier.name} Option: {activeTier.equipment}
            </h3>
            <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>
              Efficiency: {activeTier.efficiency} · Labor Allowance: {activeTier.laborHours} Hours
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>Client Total</div>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "#216C37" }}>${activeTier.total.toFixed(2)}</div>
          </div>
        </div>

        {/* Itemized Line Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
          {activeTier.items.map((item, idx) => (
            <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#FAFAF9", borderRadius: "6px", fontSize: "13px" }}>
              <span style={{ color: "#222" }}>{item.name}</span>
              <span style={{ fontWeight: 600, color: "#191816" }}>${item.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          {status === "synced" ? (
            <div style={{ background: "#EBF5EC", color: "#216C37", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600 }}>
              ✓ Draft Quote Staged in {platform === "jobber" ? "Jobber" : "QuickBooks"} (#QUO-9281)
            </div>
          ) : (
            <button
              onClick={handleSync}
              style={{
                background: "#216C37",
                color: "#FFFFFF",
                border: "none",
                padding: "10px 22px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(33,108,55,0.25)",
              }}
            >
              Stage {activeTier.name} Quote in {platform === "jobber" ? "Jobber" : "QuickBooks"} (${activeTier.total.toFixed(2)}) →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
