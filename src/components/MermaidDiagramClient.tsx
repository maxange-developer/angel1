import { useEffect, useRef, useState } from "react";

interface Props {
  chart: string;
}

export default function MermaidDiagramClient({ chart }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    import("mermaid").then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          darkMode: true,
          background: "#000000",
          primaryColor: "#1F8BFF",
          primaryTextColor: "#ffffff",
          lineColor: "#3FA0FF",
        },
      });
      if (ref.current && !cancelled) {
        mermaid
          .render(`mermaid-${Date.now()}`, chart.trim())
          .then(({ svg }) => {
            if (ref.current && !cancelled) ref.current.innerHTML = svg;
          })
          .catch((err: unknown) => setError(String(err)));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error)
    return (
      <pre style={{ color: "#f87171", fontSize: "12px", padding: "16px", border: "1px solid rgba(248,113,113,0.3)" }}>
        {error}
      </pre>
    );

  return (
    <div
      ref={ref}
      style={{ display: "flex", justifyContent: "center", overflowX: "auto", padding: "16px" }}
    />
  );
}
