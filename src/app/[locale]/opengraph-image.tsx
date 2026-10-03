import { ImageResponse } from "next/og";
export const alt = "Terral Partners — Guanacaste, Costa Rica";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#173447",
        color: "#f7f5f0",
        display: "flex",
        flexDirection: "column",
        padding: "70px 80px",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "serif", fontSize: 40, letterSpacing: 6 }}>
          TERRAL
        </div>
        <div style={{ fontSize: 12, letterSpacing: 8, marginTop: 6 }}>
          PARTNERS
        </div>
      </div>
      <div
        style={{
          fontFamily: "serif",
          fontSize: 65,
          maxWidth: 900,
          lineHeight: 1.15,
        }}
      >
        {locale === "es"
          ? "Los proveedores adecuados para su próximo proyecto."
          : "The right suppliers for your next project."}
      </div>
      <div style={{ fontSize: 17, color: "#c7ae86", letterSpacing: 3 }}>
        GUANACASTE, COSTA RICA
      </div>
    </div>,
    size,
  );
}
