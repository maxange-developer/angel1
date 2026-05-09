interface TestimonialProps {
  quote: string[];
  name: string;
  role: string;
  linkedinUrl?: string;
}

export default function Testimonial({ quote, name, role, linkedinUrl }: TestimonialProps) {
  return (
    <section className="testimonial">
      <div className="container">
        <span className="eyebrow">Reference</span>
        <blockquote className="quote">
          {quote.map((p, i) => (
            <p key={i}>&ldquo;{p}&rdquo;</p>
          ))}
        </blockquote>
        <div className="attribution">
          <div className="who">
            <span className="name">{name}</span>
            <span className="role">{role}</span>
          </div>
          {linkedinUrl && (
            <a
              className="link-acc"
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on LinkedIn →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
