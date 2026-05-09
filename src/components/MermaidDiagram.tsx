import dynamic from "next/dynamic";

const MermaidDiagramClient = dynamic(
  () => import("./MermaidDiagramClient"),
  {
    ssr: false,
    loading: () => (
      <div style={{ padding: "16px", textAlign: "center", color: "var(--text-3)", fontSize: "13px" }}>
        Loading diagram...
      </div>
    ),
  }
);

export default function MermaidDiagram({ chart }: { chart: string }) {
  return <MermaidDiagramClient chart={chart} />;
}
