import { ImageResponse } from "next/og";

export const config = { runtime: "edge" };

// 1200×630 branded OG image — generated on-demand per page
export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Massimiliano Angelone";
  const category = searchParams.get("category") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#ffffff", fontSize: "20px", fontWeight: 700, letterSpacing: "4px", textTransform: "uppercase" }}>
            ANGEL1
          </span>
          {category && (
            <span style={{ color: "#1F8BFF", fontSize: "12px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase" }}>
              {category}
            </span>
          )}
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ width: "64px", height: "3px", background: "#1F8BFF", marginBottom: "8px" }} />
          <h1 style={{ color: "#ffffff", fontSize: title.length > 40 ? "44px" : "56px", fontWeight: 500, margin: 0, lineHeight: 1.05, letterSpacing: "-0.04em", maxWidth: "900px" }}>
            {title}
          </h1>
          <p style={{ color: "rgba(245,245,247,0.6)", fontSize: "20px", margin: 0, fontWeight: 400 }}>
            AI-Enhanced MVP Developer · Fixed Price · Production-Grade
          </p>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: "#555", fontSize: "14px" }}>massimilianoangelone.com</span>
          <span style={{ color: "#333", fontSize: "14px" }}>·</span>
          <span style={{ color: "#1F8BFF", fontSize: "14px" }}>One engineer, fixed price, production-grade.</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
