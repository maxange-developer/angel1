interface PageBreakProps {
  num: string;
  label: string;
  name: string;
}

export default function PageBreak({ num, label, name }: PageBreakProps) {
  return (
    <div className="container">
      <div className="page-break">
        <span className="label">
          <span className="num">{num}</span> / {label}
        </span>
        <span className="rule">&nbsp;</span>
        <span className="name">{name}</span>
      </div>
    </div>
  );
}
