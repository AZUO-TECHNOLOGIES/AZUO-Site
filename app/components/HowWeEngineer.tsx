"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * HOW WE ENGINEER — one chapter, three former sections.
 *
 * Left: the engineering process (Problem → Continuous Evolution). It
 * auto-advances; each stage lights the capabilities it uses on the
 * instrument. Right: the Living Engineering Core. Bottom: an industries
 * strip — hover one and the core reconfigures for that industry.
 * One interaction explains everything.
 */

type Mod = { key: string; label: string; angle: number };

const INNER_R = 128;
const OUTER_R = 214;

const INNER: Mod[] = [
  { key: "voice", label: "Voice", angle: -90 },
  { key: "ai", label: "AI", angle: -30 },
  { key: "vision", label: "Vision", angle: 30 },
  { key: "backend", label: "Backend", angle: 90 },
  { key: "data", label: "Data", angle: 150 },
  { key: "cloud", label: "Cloud", angle: 210 },
];

const OUTER: Mod[] = [
  { key: "strategy", label: "Strategy", angle: -60 },
  { key: "automation", label: "Automation", angle: 0 },
  { key: "twins", label: "Digital Twins", angle: 60 },
  { key: "iot", label: "IoT", angle: 120 },
  { key: "security", label: "Security", angle: 180 },
  { key: "devops", label: "DevOps", angle: 240 },
];

const STAGES: { label: string; keys: string[] }[] = [
  { label: "Problem", keys: ["strategy"] },
  { label: "Discovery", keys: ["strategy", "data"] },
  { label: "Solution Blueprint", keys: ["strategy", "ai", "backend"] },
  { label: "System Architecture", keys: ["backend", "cloud", "ai", "security"] },
  { label: "Engineering", keys: ["ai", "voice", "vision", "backend", "automation"] },
  { label: "Deployment", keys: ["devops", "cloud", "security"] },
  { label: "Continuous Evolution", keys: ["data", "automation", "devops"] },
];

const INDUSTRIES: { label: string; keys: string[] }[] = [
  { label: "Manufacturing", keys: ["twins", "iot", "vision", "automation"] },
  { label: "Healthcare", keys: ["voice", "vision", "ai"] },
  { label: "Climate", keys: ["data", "iot", "cloud"] },
  { label: "Agriculture", keys: ["vision", "iot", "ai", "data"] },
  { label: "Enterprise", keys: ["voice", "backend", "automation", "security"] },
  { label: "Education", keys: ["ai", "voice", "backend"] },
  { label: "Developer Tools", keys: ["backend", "cloud", "devops"] },
  { label: "Logistics", keys: ["iot", "data", "automation", "cloud"] },
];

export function HowWeEngineer() {
  const reduce = !!useReducedMotion();
  const [stage, setStage] = useState(0);
  const [hoverStage, setHoverStage] = useState<number | null>(null);
  const [industry, setIndustry] = useState<number | null>(null);

  // The process narrates itself — until the visitor takes the controls.
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setStage((s) => (s + 1) % STAGES.length);
    }, 2400);
    return () => clearInterval(id);
  }, [reduce]);

  const activeStage = hoverStage ?? stage;
  const activeKeys = new Set(
    industry !== null ? INDUSTRIES[industry].keys : STAGES[activeStage].keys,
  );

  return (
    <section id="capabilities" className="shell py-32 sm:py-40">
      <div className="max-w-3xl">
        <div className="eyebrow mb-6">How we engineer</div>
        <h2 className="text-display">
          We don&apos;t sell software.
          <br />
          <span className="text-[var(--color-accent)]">We engineer complete systems.</span>
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.42fr_0.58fr]">
        {/* LEFT — the process. Auto-advances; hover to inspect. */}
        <div>
          <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-faint)]">
            The process
          </span>
          <div className="mt-5 flex flex-col">
            {STAGES.map((s, i) => {
              const isActive = industry === null && activeStage === i;
              return (
                <div key={s.label}>
                  {i > 0 && (
                    <div
                      className="ml-[5px] h-4 w-px"
                      style={{ background: "var(--color-line-strong)" }}
                    />
                  )}
                  <button
                    onMouseEnter={() => setHoverStage(i)}
                    onMouseLeave={() => setHoverStage(null)}
                    onClick={() => setStage(i)}
                    className="group flex items-center gap-4 text-left"
                  >
                    <span
                      aria-hidden
                      className="h-[11px] w-[11px] shrink-0 rounded-full border transition-all duration-300"
                      style={{
                        borderColor: isActive ? "var(--color-accent)" : "var(--color-line-strong)",
                        background: isActive ? "var(--color-accent)" : "transparent",
                        boxShadow: isActive
                          ? "0 0 12px color-mix(in srgb, var(--color-accent) 60%, transparent)"
                          : "none",
                      }}
                    />
                    <span
                      className="text-[1.15rem] font-bold tracking-[-0.01em] transition-all duration-300 sm:text-[1.3rem]"
                      style={{
                        color: isActive ? "var(--color-ink)" : "var(--color-ink-faint)",
                        transform: isActive ? "translateX(4px)" : "none",
                      }}
                    >
                      {s.label}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — the instrument, driven by the process */}
        <div className="relative hidden md:block" style={{ height: "min(520px, 66vh)" }}>
          <Ring modules={INNER} radius={INNER_R} duration={150} direction={1} reduce={reduce} activeKeys={activeKeys} />
          <Ring modules={OUTER} radius={OUTER_R} duration={210} direction={-1} reduce={reduce} activeKeys={activeKeys} />

          {[INNER_R, OUTER_R].map((r) => (
            <div
              key={r}
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 rounded-full border"
              style={{
                width: r * 2,
                height: r * 2,
                transform: "translate(-50%, -50%)",
                borderColor: "color-mix(in srgb, var(--color-ink) 8%, transparent)",
              }}
            />
          ))}

          {/* the core */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 26%, transparent), transparent 62%)",
                filter: "blur(16px)",
              }}
              animate={reduce ? undefined : { scale: [1, 1.1, 1], opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
              style={{ borderColor: "color-mix(in srgb, var(--color-accent) 40%, transparent)" }}
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="relative h-[72px] w-[72px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 34% 30%, #ffffff, #d7fff3 28%, var(--color-accent) 72%, #005f47 100%)",
                boxShadow:
                  "0 0 48px 7px color-mix(in srgb, var(--color-accent) 38%, transparent), 0 2px 8px rgba(255,255,255,0.6) inset",
              }}
              animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap text-center">
              <span className="font-mono text-[0.6rem] font-semibold tracking-[0.22em] text-[var(--color-ink-faint)]">
                AZUO ENGINEERING
              </span>
            </div>
          </div>
        </div>

        {/* Mobile — capabilities as chips, lit by the active stage */}
        <div className="flex flex-wrap gap-2 md:hidden">
          {[...INNER, ...OUTER].map((m) => {
            const on = activeKeys.has(m.key);
            return (
              <span
                key={m.key}
                className="flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-all duration-300"
                style={{
                  borderColor: on ? "var(--color-accent)" : "var(--color-line-strong)",
                  opacity: on ? 1 : 0.5,
                }}
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: on ? "var(--color-accent)" : "var(--color-line-strong)" }}
                />
                {m.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* BOTTOM — industries. One elegant strip; hovering reconfigures the core. */}
      <div className="mt-20 border-t border-[var(--color-line)] pt-10">
        <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-faint)]">
          Where we build
        </span>
        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
          {INDUSTRIES.map((ind, i) => (
            <button
              key={ind.label}
              onMouseEnter={() => setIndustry(i)}
              onMouseLeave={() => setIndustry(null)}
              className="text-lg font-bold tracking-[-0.01em] transition-colors duration-300 sm:text-xl"
              style={{
                color:
                  industry === i
                    ? "var(--color-accent)"
                    : industry !== null
                      ? "var(--color-ink-faint)"
                      : "var(--color-ink-soft)",
              }}
            >
              {ind.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- a rotating ring of the instrument ---------------- */

function Ring({
  modules,
  radius,
  duration,
  direction,
  reduce,
  activeKeys,
}: {
  modules: Mod[];
  radius: number;
  duration: number;
  direction: 1 | -1;
  reduce: boolean;
  activeKeys: Set<string>;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      animate={reduce ? undefined : { rotate: 360 * direction }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {modules.map((m) => {
        const isActive = activeKeys.has(m.key);
        return (
          <div key={m.key} className="absolute left-1/2 top-1/2">
            {/* radial connection — exists ONLY while its capability is engaged */}
            <div
              aria-hidden
              className="absolute h-px origin-left"
              style={{
                width: radius - 44,
                transform: `rotate(${m.angle}deg)`,
                background:
                  "linear-gradient(to right, color-mix(in srgb, var(--color-accent) 70%, transparent), color-mix(in srgb, var(--color-accent) 25%, transparent))",
                boxShadow: isActive
                  ? "0 0 8px color-mix(in srgb, var(--color-accent) 60%, transparent)"
                  : "none",
                opacity: isActive ? 1 : 0,
                transition: "opacity 350ms cubic-bezier(0.16,1,0.3,1)",
              }}
            />
            <div
              className="absolute"
              style={{ transform: `rotate(${m.angle}deg) translateX(${radius}px) rotate(${-m.angle}deg)` }}
            >
              <motion.div
                animate={reduce ? undefined : { rotate: -360 * direction }}
                transition={{ duration, repeat: Infinity, ease: "linear" }}
                className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-semibold backdrop-blur-sm"
                style={{
                  borderColor: isActive ? "var(--color-accent)" : "var(--color-line-strong)",
                  background: isActive
                    ? "color-mix(in srgb, var(--color-accent) 12%, rgba(255,255,255,0.85))"
                    : "rgba(255,255,255,0.78)",
                  boxShadow: isActive
                    ? "0 0 22px color-mix(in srgb, var(--color-accent) 30%, transparent), var(--shadow-sm)"
                    : "var(--shadow-sm)",
                  opacity: isActive ? 1 : 0.55,
                  transition: "opacity 350ms, border-color 350ms, background 350ms, box-shadow 350ms",
                }}
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: isActive ? "var(--color-accent)" : "var(--color-line-strong)",
                    transition: "background 350ms",
                  }}
                />
                <span className="whitespace-nowrap text-[0.82rem]">{m.label}</span>
              </motion.div>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
