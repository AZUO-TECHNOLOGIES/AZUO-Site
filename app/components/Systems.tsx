"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

/**
 * SYSTEMS — the exhibition. This section sells trust.
 *
 * Not an accordion. Not SaaS cards. Four engineering artifacts, each with
 * its own atmosphere, emotional story, live architecture render, and stack.
 * Open one → the others recede to 15%. Focus, like Apple.
 */

type Theme = {
  bg: string;
  ink: string;
  sub: string;
  line: string;
  accent: string;
};

type SystemDef = {
  name: string;
  tagline: string;
  theme: Theme;
  hook: [string, string]; // muted setup line, bold payoff line
  problem: string[];
  change: string;
  flow: string[];
  stack: string[];
};

const SYSTEMS: SystemDef[] = [
  {
    name: "VOICENAV",
    tagline: "The Voice Operating Layer for Enterprise Software.",
    theme: { bg: "#0b0f0e", ink: "#ffffff", sub: "#9fb5ae", line: "#25332e", accent: "#00d6a9" },
    hook: ["Enterprise software was built for clicks.", "We rebuilt it for conversation."],
    problem: ["Thousands of screens.", "Hundreds of workflows.", "Everything hidden."],
    change: "VoiceNav changes that.",
    flow: ["Speech", "Intent", "Semantic Engine", "Action Graph", "Enterprise APIs", "Execution"],
    stack: ["ASR", "LLMs", "Realtime Engine", "Semantic Search", "RBAC", "WebSocket", "OAuth", "Offline Runtime"],
  },
  {
    name: "WORKSPACE",
    tagline: "The AI Operating System for Businesses.",
    theme: { bg: "#fbfaf6", ink: "#2b3532", sub: "#5c6763", line: "#e3e3da", accent: "#00a884" },
    hook: ["Your company runs on ten disconnected tools.", "We built the one that runs them all."],
    problem: ["Context scattered.", "Work duplicated.", "Nobody sees the whole picture."],
    change: "Workspace changes that.",
    flow: ["People", "Tasks", "AI", "Automation", "Company"],
    stack: ["Agents", "RAG", "Knowledge Graph", "Vector DB", "Queues", "Postgres"],
  },
  {
    name: "SMARTAGRI",
    tagline: "AI for Agriculture.",
    theme: { bg: "#0d1f15", ink: "#f2f7f0", sub: "#9dbfa8", line: "#23402f", accent: "#63d98a" },
    hook: ["Farming decisions are made on instinct.", "We gave them satellites, sensors, and AI."],
    problem: ["Unpredictable weather.", "Invisible soil.", "Guesswork yields."],
    change: "SmartAgri changes that.",
    flow: ["Satellite", "Weather", "Soil", "AI", "Farmer"],
    stack: ["Computer Vision", "IoT", "Time-series ML", "Edge", "Flutter"],
  },
  {
    name: "DIGITAL TWIN",
    tagline: "Industry 4.0 Intelligence Platform.",
    theme: { bg: "#12151b", ink: "#f0f3f8", sub: "#94a1b8", line: "#242b38", accent: "#7fa4ff" },
    hook: ["Factories only learn from failure.", "We taught them to see it coming."],
    problem: ["Black-box machines.", "Reactive maintenance.", "Downtime that costs lakhs an hour."],
    change: "Digital Twin changes that.",
    flow: ["Machine", "Sensors", "Digital Model", "Simulation", "Prediction"],
    stack: ["IoT", "Streaming", "Simulation", "Predictive ML", "Dashboards"],
  },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Systems() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="systems" className="shell py-32 sm:py-40">
      <div className="max-w-3xl">
        <div className="eyebrow mb-6">This is what we&apos;ve been building</div>
        <h2 className="text-display">
          Four systems.
          <br />
          <span className="text-[var(--color-accent)]">One engineering philosophy.</span>
        </h2>
        <p className="mt-6 max-w-md text-[var(--text-body)] text-[var(--color-ink-soft)]">
          Products aren&apos;t features. They&apos;re systems.
        </p>
      </div>

      <div className="mt-16 flex flex-col">
        {SYSTEMS.map((s, i) => {
          const isOpen = open === i;
          const dimmed = open !== null && !isOpen;
          return (
            <motion.div
              key={s.name}
              animate={{ opacity: dimmed ? 0.4 : 1 }}
              whileHover={{ opacity: dimmed ? 0.75 : 1 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-baseline justify-between gap-6 border-t border-[var(--color-line)] pb-7 pt-8 text-left"
              >
                <span className="text-[clamp(2.2rem,5vw,4rem)] font-bold uppercase leading-none tracking-[-0.02em] transition-colors group-hover:text-[var(--color-accent)]">
                  {s.name}
                </span>
                <span className="hidden max-w-xs text-right text-[var(--color-ink-soft)] sm:block">
                  {s.tagline}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.65, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <Showcase s={s} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- the exhibition room ---------------- */

function Showcase({ s }: { s: SystemDef }) {
  const t = s.theme;
  return (
    <div
      className="mb-12 overflow-hidden p-8 sm:p-14"
      style={{ background: t.bg, color: t.ink, borderRadius: "var(--radius-image)" }}
    >
      <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left — the story */}
        <div>
          <p className="text-headline" style={{ color: t.sub }}>
            {s.hook[0]}
          </p>
          <p className="text-headline mt-2">{s.hook[1]}</p>

          <div className="mt-9 flex flex-col gap-1.5">
            {s.problem.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.12, duration: 0.5, ease: EASE }}
                className="text-lg"
                style={{ color: t.sub }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5, ease: EASE }}
            className="mt-8 text-2xl font-bold tracking-[-0.02em]"
            style={{ color: t.accent }}
          >
            {s.change}
          </motion.p>

          <div className="mt-12">
            <span
              className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em]"
              style={{ color: t.sub }}
            >
              Built with
            </span>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {s.stack.map((chip, i) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.4, ease: EASE }}
                  className="rounded-lg border px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-[0.08em]"
                  style={{ borderColor: t.line, background: "rgba(127,127,127,0.06)" }}
                >
                  {chip}
                </motion.span>
              ))}
            </div>
          </div>

          <a
            href="#contact"
            className="mt-12 inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold transition-transform hover:-translate-y-0.5"
            style={{ background: t.accent, color: t.bg }}
          >
            Explore the system
            <span aria-hidden>→</span>
          </a>
        </div>

        {/* Right — the live architecture render */}
        <ArchFlow steps={s.flow} theme={t} />
      </div>
    </div>
  );
}

/* ---------------- live architecture — signal travels the system ---------------- */

function ArchFlow({ steps, theme: t }: { steps: string[]; theme: Theme }) {
  return (
    <div className="flex flex-col items-center pt-2">
      <span
        className="mb-6 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em]"
        style={{ color: t.sub }}
      >
        Architecture
      </span>
      {steps.map((step, i) => (
        <div key={step} className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.55, ease: EASE }}
            className="rounded-xl border px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.1em]"
            style={{
              borderColor: `color-mix(in srgb, ${t.accent} 45%, ${t.line})`,
              background: `color-mix(in srgb, ${t.accent} 9%, transparent)`,
              boxShadow: `0 0 28px color-mix(in srgb, ${t.accent} 18%, transparent)`,
            }}
          >
            {step}
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              className="relative my-1 h-9 w-px"
              style={{ background: t.line }}
            >
              {/* the signal */}
              <span
                aria-hidden
                className="absolute left-1/2 top-0 h-[7px] w-[3px] rounded-full"
                style={{
                  background: t.accent,
                  boxShadow: `0 0 8px 1px ${t.accent}`,
                  ["--flow-len" as string]: "30px",
                  animation: `flow-down 2.2s linear ${i * 0.36}s infinite`,
                }}
              />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
