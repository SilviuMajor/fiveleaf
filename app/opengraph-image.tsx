import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Fiveleaf: AI agents that run inside your business, with a 5:1 monthly return at our flagship deployment";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PETAL_PATHS = [
  "M128.18,124.71c11.13-4.96,18.67-13.49,24.69-23.52,6.09-10.15,10.12-21.09,12.01-32.79.17-1.06.61-1.54,1.63-1.84,9.3-2.71,18.74-3.22,28.29-1.87,7.34,1.04,14.36,3.07,20.75,6.97,2.29,1.4,4.41,3.02,6.23,4.99,5.61,6.06,6.44,13.06,4,20.68-2.17,6.75-6.05,12.46-10.82,17.6-7.96,8.58-17.32,15.1-28.57,18.59-8.91,2.76-18.07,3.25-27.32,2.47-7.33-.62-14.45-2.12-21.21-5.1-3.5-1.54-6.8-3.43-9.69-6.18Z",
  "M115.1,132.62c2.81,3.17,5.92,5.79,9.39,7.98,7.62,4.8,16.02,7.52,24.82,9.09,10.37,1.84,20.78,2.01,31.2.36.83-.13,1.14.28,1.52.83,5.13,7.29,8.34,15.4,10.22,24.06,1.77,8.15,2.2,16.32.25,24.5-.98,4.12-2.63,7.94-5.47,11.14-3.66,4.12-8.42,5.97-13.8,6.31-7.93.51-15.31-1.62-22.39-4.95-11.08-5.21-20.48-12.52-27.22-22.87-5.73-8.79-9.02-18.55-10.75-28.85-1.24-7.37-1.47-14.74.28-22.08.44-1.86,1-3.7,1.96-5.53Z",
  "M103.51,122.6c-5.77,10.01-7,20.72-6.26,31.78.84,12.59,4.19,24.51,9.86,35.77.36.72.19,1.14-.24,1.71-6.15,8.11-13.91,14.28-22.9,18.92-6.55,3.38-13.43,5.75-20.87,6.15-3.95.21-7.82-.17-11.48-1.79-6.06-2.69-9.35-7.67-11.2-13.76-2.38-7.84-2.24-15.81-.81-23.78,1.82-10.13,5.19-19.72,11.64-27.84,10.88-13.7,24.82-22.81,42.01-26.68,3.33-.75,6.72-1.01,10.26-.47Z",
  "M109.47,108.52c-2.42-.5-4.77-.86-7.15-.97-7.27-.34-14.29.98-21.12,3.36-13.24,4.62-24.8,11.94-34.75,21.8-.72.71-1.28.62-2.06.34-8.85-3.13-16.58-8.1-23.4-14.49-5.8-5.44-10.65-11.58-13.61-19.04-2.31-5.83-3.14-11.75-.35-17.67,2.26-4.81,6.14-8.09,10.64-10.69,6.26-3.62,13.09-5.56,20.2-6.52,9.18-1.24,18.29-.89,27.22,1.74,10.53,3.1,19.5,8.94,27.57,16.24,6.33,5.73,11.69,12.23,15.1,20.16.77,1.8,1.36,3.66,1.72,5.74Z",
  "M124.66,109.81c-.49-5.65-2.1-10.75-4.47-15.61-4.62-9.46-11.36-17.25-19.22-24.12-5.74-5.02-11.96-9.34-18.79-12.75-.77-.39-.9-.87-.89-1.62.05-7.93,1.86-15.49,4.75-22.82,3.13-7.96,7.43-15.2,13.67-21.15,4-3.81,8.49-6.74,14.1-7.56,4.64-.68,8.85.58,12.78,2.89,5.6,3.29,9.84,8,13.31,13.39,7.59,11.77,11.76,24.6,11.1,38.72-.46,9.82-3.28,19.08-7.45,27.93-3.22,6.83-7.28,13.1-12.83,18.31-1.78,1.67-3.68,3.18-6.06,4.39Z",
];

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(60% 50% at 30% 30%, rgba(220,230,242,0.10), transparent 70%), radial-gradient(50% 40% at 80% 70%, rgba(248,226,208,0.08), transparent 70%), #0A0A0A",
          color: "#FFFFFF",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <svg width="56" height="56" viewBox="0 0 232.34 220.98">
            <g fill="#FFFFFF">
              {PETAL_PATHS.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
          </svg>
          <span style={{ fontSize: "40px", fontWeight: 600, letterSpacing: "-0.02em" }}>
            fiveleaf
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <span
            style={{
              alignSelf: "flex-start",
              padding: "8px 16px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.10)",
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            AI agents for high-volume customer operations
          </span>
          <h1
            style={{
              fontSize: "78px",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              margin: 0,
              maxWidth: "950px",
            }}
          >
            AI agents that run inside your business.
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "20px 28px",
              borderRadius: "16px",
              background: "#FFFFFF",
              color: "#0A0A0A",
            }}
          >
            <span style={{ fontSize: "44px", fontWeight: 700 }}>5:1</span>
            <span style={{ fontSize: "16px", opacity: 0.65 }}>monthly return at run rate</span>
          </div>
          <p
            style={{
              fontSize: "20px",
              color: "rgba(255,255,255,0.65)",
              maxWidth: "500px",
              margin: 0,
            }}
          >
            Built and operated by Fiveleaf. Trusted by a leading UK ISP.
          </p>
        </div>
      </div>
    ),
    size,
  );
}
