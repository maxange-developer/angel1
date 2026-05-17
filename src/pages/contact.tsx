import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  projectType: z.enum(["validation", "launch", "scale", "custom"]),
  message: z.string().min(20, "Please describe your project (min 20 chars)"),
});

type FormData = z.infer<typeof schema>;

const PROJECT_TYPES = [
  { value: "validation", label: "Validation MVP — $1,500" },
  { value: "launch", label: "Launch MVP — $3,500" },
  { value: "scale", label: "Scale MVP — $7,500" },
  { value: "custom", label: "Custom / not sure yet" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error((json as { error?: string }).error ?? "Something went wrong");
      }
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <>
      <SEO page="contact" canonicalPath="/contact" />

      <section className="page-hero page-hero-contact container">
        <div className="mount-stagger">
          <p className="eyebrow">Get in touch</p>
          <h1>Start a project</h1>
          <p className="q">
            Tell me what you&apos;re building. I&apos;ll confirm scope, timeline, and price within 48 hours.
          </p>
        </div>
      </section>

      <div className="container">
        <Reveal className="contact-wrap" as="div" variant="stagger">
          {/* Form col */}
          <div className="contact-form-col">
            {submitted ? (
              <div className="contact-success mount-hero-item">
                <h2>Got it.</h2>
                <p>I&apos;ll review your project and get back to you within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input id="name" type="text" placeholder="Your name" {...register("name")} />
                  {errors.name && <span className="form-error">{errors.name.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" placeholder="you@company.com" {...register("email")} />
                  {errors.email && <span className="form-error">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="projectType">Package</label>
                  <select id="projectType" {...register("projectType")}>
                    <option value="">Select a package…</option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  {errors.projectType && <span className="form-error">{errors.projectType.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="What are you building? What problem does it solve?"
                    {...register("message")}
                  />
                  {errors.message && <span className="form-error">{errors.message.message}</span>}
                </div>

                {serverError && <p className="form-error">{serverError}</p>}

                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Sending…" : "Send message →"}
                </button>
              </form>
            )}
          </div>

          {/* Info col */}
          <div className="contact-info-col">
            <div className="contact-info-block">
              <p className="eyebrow">Direct line</p>
              <a href="mailto:massiangelone01@gmail.com" className="link-acc">
                massiangelone01@gmail.com
              </a>
            </div>
            <div className="contact-info-block">
              <p className="eyebrow">Elsewhere</p>
              <ul>
                <li>
                  <a href="https://www.linkedin.com/in/massiangelone/" target="_blank" rel="noopener noreferrer" className="link-acc">
                    LinkedIn →
                  </a>
                </li>
                <li>
                  <a href="https://github.com/maxange-developer" target="_blank" rel="noopener noreferrer" className="link-acc">
                    GitHub →
                  </a>
                </li>
              </ul>
            </div>
            <div className="contact-info-block">
              <p className="eyebrow">Expect</p>
              <ul>
                <li>Response within 48h</li>
                <li>Scope call (30 min)</li>
                <li>Fixed-price proposal</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
