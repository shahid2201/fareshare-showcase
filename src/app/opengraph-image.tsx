import { ImageResponse } from "next/og";

export const alt = "FareShare — Split Life's Costs. Effortlessly.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "radial-gradient(circle at top right, rgba(16,185,129,0.35), transparent 42%), linear-gradient(160deg, #080809 0%, #0f1412 45%, #08110d 100%)",
          color: "#f4f4f5",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#34d399",
          }}
        >
          FareShare
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              maxWidth: 900,
            }}
          >
            Split life&apos;s costs.
            <br />
            Effortlessly.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: "#a1a1aa",
              maxWidth: 820,
            }}
          >
            Scan receipts. Extract items. Assign shares. Settle up together.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#71717a",
          }}
        >
          <span>Bill splitting for households &amp; shared expenses</span>
          <span style={{ color: "#6ee7b7" }}>fareshare.app</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
