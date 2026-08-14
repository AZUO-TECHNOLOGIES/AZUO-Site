"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

/**
 * The Engineering Composer — assemble software like LEGO.
 *
 * Layout: two columns from ONE baseline. The eye reads the heading left,
 * lands on the living architecture right — no dead whitespace between.
 * Toggling a capability slides its module into the correct layer of the
 * stack in real time. Every system terminates in PRODUCTION.
 */

type Cap = { key: string; label: string; block: string; order: number };

const CAPS: Cap[] = [
  { key: "voice", label: "Voice", block: "Voice Interface", order: 1 },
  { key: "mobile", label: "Mobile", block: "Mobile App", order: 2 },
  { key: "vision", label: "Vision", block: "Vision Engine", order: 3 },
  { key: "ai", label: "AI", block: "AI Runtime", order: 4 },
  { key: "data", label: "Data", block: "Data Platform", order: 5 },
  { key: "backend", label: "Backend", block: "Realtime Backend", order: 6 },
  { key: "robotics", label: "Robotics", block: "Robotics Control", order: 7 },
  { key: "iot", label: "IoT", block: "IoT Mesh", order: 8 },
  { key: "cloud", label: "Cloud", block: "Cloud APIs", order: 9 },
  { key: "automation", label: "Automation", block: "Automation Engine", order: 10 },
  { key: "devops", label: "DevOps", block: "CI/CD", order: 11 },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Composer() {
  // The founder's example build: Voice + Backend + Cloud + Automation
  const [selected, setSelected] = useState<Set<string>>(
    new Set(["voice", "backend", "cloud", "automation"]),
  );

  const toggle = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const stack = CAPS.filter((c) => selected.has(c.key)).sort((a, b) => a.order - b.order);

  return (
    <section className="shell py-32 sm:py-40">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.45fr_0.55fr] lg:gap-16">
        {/* LEFT — heading, chips, helper. One tight column. */}
        <div>
          <div className="eyebrow mb-6">What can we engineer?</div>
          <h2 className="text-display">
            Assemble
            <br />
            <span className="text-[var(--color-accent)]">your system.</span>
          </h2>
          <p className="mt-5 max-w-md text-[var(--text-body)] text-[var(--color-ink-soft)]">
            Every impossible problem starts somewhere. Choose the capabilities —
            the engineering composes itself.
          </p>

          <div className="mt-9">
            <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-faint)]">
              Capabilities
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {CAPS.map((c) => {
                const on = selected.has(c.key);
                return (
                  <button
                    key={c.key}
                    onClick={() => toggle(c.key)}
                    aria-pressed={on}
                    className="rounded-full border px-4.5 py-2 text-[0.95rem] font-semibold transition-all duration-300"
                    style={{
                      transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                      borderColor: on ? "transparent" : "var(--color-line-strong)",
                      background: on ? "var(--color-ink)" : "transparent",
                      color: on ? "var(--color-canvas)" : "var(--color-ink-soft)",
                    }}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--color-ink-faint)]">
              No fixed menus. No packages. Whatever combination your problem
              needs — that&apos;s the system we build.
            </p>
          </div>
        </div>

        {/* RIGHT — the architecture. Starts at the SAME baseline. */}
        <div className="lift relative overflow-hidden p-7 sm:p-9">
          <div className="mb-6 flex items-center justify-between border-b border-[var(--color-line)] pb-5">
            <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-faint)]">
              Your architecture
            </span>
            <span className="font-mono text-[0.68rem] font-semibold text-[var(--color-accent)]">
              {stack.length > 0 ? `${stack.length + 1} MODULES · 1 SYSTEM` : "AWAITING INPUT"}
            </span>
          </div>

          {stack.length === 0 ? (
            <div className="flex h-44 items-center justify-center text-[var(--color-ink-faint)]">
              ← Select a capability to begin
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <AnimatePresence mode="popLayout">
                {stack.map((c, i) => (
                  <motion.div
                    key={c.key}
                    layout
                    initial={{ opacity: 0, y: 14, scale: 0.96, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.93, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="flex w-full flex-col items-center"
                  >
                    {i > 0 && <Connector />}
                    {/* glass plate — full-width module, not a flowchart pill */}
                    <div
                      className="w-full max-w-[300px] rounded-xl border py-3 text-center font-mono text-[0.8rem] font-bold uppercase tracking-[0.12em]"
                      style={{
                        borderColor: "color-mix(in srgb, var(--color-accent) 35%, var(--color-line))",
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.85), color-mix(in srgb, var(--color-accent) 6%, rgba(255,255,255,0.5)))",
                        boxShadow:
                          "0 1px 0 0 rgba(255,255,255,0.9) inset, 0 0 20px color-mix(in srgb, var(--color-accent) 10%, transparent)",
                      }}
                    >
                      {c.block}
                    </div>
                  </motion.div>
                ))}
                {/* Every AZUO system terminates in production. Always. */}
                <motion.div
                  key="production"
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="flex w-full flex-col items-center"
                >
                  <Connector />
                  <div
                    className="w-full max-w-[300px] rounded-xl py-3 text-center font-mono text-[0.8rem] font-bold uppercase tracking-[0.12em]"
                    style={{ background: "var(--color-ink)", color: "var(--color-canvas)" }}
                  >
                    Production
                  </div>
                </motion.div>
              </AnimatePresence>

              <motion.a
                layout
                href="#contact"
                className="btn-glass mt-7 py-2.5 text-sm"
                transition={{ duration: 0.45, ease: EASE }}
              >
                Engineer this with us
                <span aria-hidden>→</span>
              </motion.a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Connector() {
  return (
    <div className="relative my-0.5 h-5 w-px" style={{ background: "var(--color-line-strong)" }}>
      <span
        aria-hidden
        className="absolute left-1/2 top-0 h-[5px] w-[2.5px] rounded-full"
        style={{
          background: "var(--color-accent)",
          boxShadow: "0 0 7px 1px var(--color-accent)",
          ["--flow-len" as string]: "17px",
          animation: "flow-down 1.8s linear infinite",
        }}
      />
    </div>
  );
}
