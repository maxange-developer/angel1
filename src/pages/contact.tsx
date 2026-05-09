import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { MotionSection } from "@/components/MotionSection";
import { FADE_UP, STAGGER_CONTAINER, STAGGER_ITEM } from "@/lib/motion";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  projectType: z.enum(["ai-sprint", "mvp-lite", "mvp-full", "custom", "other"]),
  message: z.string().min(20, "Please describe your project (min 20 chars)"),
});

type FormData = z.infer<typeof schema>;

const PROJECT_TYPES = [
  { value: "ai-sprint", label: "AI Sprint — €2,500" },
  { value: "mvp-lite", label: "MVP Lite — €5,000" },
  { value: "mvp-full", label: "MVP Full — €9,500" },
  { value: "custom", label: "Custom scope" },
  { value: "other", label: "Just exploring" },
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

      <section className="page-hero container">
        <MotionSection>
          <p className="eyebrow">Get in touch</p>
          <h1>Start a project.</h1>
          <p className="q">
            Tell me what you&apos;re building. I&apos;ll confirm scope, timeline, and price within 48 hours.
          </p>
        </MotionSection>
      </section>

      <div className="container">
        <motion.div
          className="contact-wrap"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Form col */}
          <motion.div className="contact-form-col" variants={STAGGER_ITEM}>
            {submitted ? (
              <motion.div className="contact-success" variants={FADE_UP} initial="hidden" animate="visible">
                <h2>Got it.</h2>
                <p>I&apos;ll review your project and get back to you within 48 hours.</p>
              </motion.div>
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
          </motion.div>

          {/* Info col */}
          <motion.div className="contact-info-col" variants={STAGGER_ITEM}>
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
                  <a href="https://github.com/massiangelone" target="_blank" rel="noopener noreferrer" className="link-acc">
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
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
