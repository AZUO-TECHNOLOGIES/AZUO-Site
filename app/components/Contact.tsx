"use client";

import emailjs from "@emailjs/browser";
import { motion } from "motion/react";
import { useRef, useState } from "react";

const FIELDS = [
  { name: "name", label: "Name", type: "text", placeholder: "Your name" },
  { name: "email", label: "Email", type: "email", placeholder: "you@company.com" },
  { name: "company", label: "Company", type: "text", placeholder: "Company" },
  { name: "budget", label: "Budget", type: "text", placeholder: "Rough range" },
  { name: "timeline", label: "Timeline", type: "text", placeholder: "When" },
];

const REQUIRED_FIELDS = new Set(["name", "email"]);

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSending(true);
    setError(false);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! },
      );
      setSent(true);
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="shell py-32 sm:py-44">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="text-display">
            The next company
            <br />
            shouldn&apos;t be built
            <br />
            like the last one.
          </h2>
          <p className="mt-8 text-2xl font-bold tracking-[-0.02em] text-[var(--color-accent)]">
            Let&apos;s engineer it.
          </p>
          <p className="mt-6 max-w-sm text-lg text-[var(--color-ink-soft)]">
            Bring the problem nobody else knows how to solve. We&apos;ll tell you
            how we&apos;d engineer it.
          </p>
        </div>

        <div className="glass rounded-3xl p-8 sm:p-10">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full min-h-[320px] flex-col items-start justify-center"
            >
              <span
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-white"
                style={{ background: "var(--color-accent-soft)" }}
              >
                ✓
              </span>
              <p className="text-2xl font-medium tracking-[-0.02em]">Got it.</p>
              <p className="mt-2 text-[var(--color-ink-soft)]">
                We read every one of these ourselves. Expect a reply, not an
                autoresponder.
              </p>
            </motion.div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {FIELDS.map((f) => (
                  <label key={f.name} className="flex flex-col gap-2">
                    <span className="eyebrow">{f.label}</span>
                    <input
                      required={REQUIRED_FIELDS.has(f.name)}
                      type={f.type}
                      name={f.name}
                      placeholder={f.placeholder}
                      className="rounded-xl border border-[var(--color-line-strong)] bg-white/60 px-4 py-3 text-[var(--color-ink)] outline-none transition focus:border-[var(--color-accent)]"
                    />
                  </label>
                ))}
              </div>
              <label className="flex flex-col gap-2">
                <span className="eyebrow">Problem</span>
                <textarea
                  required
                  name="problem"
                  rows={4}
                  placeholder="What are you trying to solve?"
                  className="resize-none rounded-xl border border-[var(--color-line-strong)] bg-white/60 px-4 py-3 text-[var(--color-ink)] outline-none transition focus:border-[var(--color-accent)]"
                />
              </label>
              {error && (
                <p className="text-sm text-red-500">
                  Something went wrong sending that — please try again, or
                  email us directly.
                </p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="btn-glass mt-2 justify-center disabled:opacity-60"
              >
                {sending ? "Sending…" : "Book Discovery Call"}
                {!sending && <span aria-hidden>→</span>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
