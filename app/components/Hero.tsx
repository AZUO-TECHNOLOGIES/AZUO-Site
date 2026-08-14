"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { OrbitalCore } from "./OrbitalCore";

const line = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

/**
 * Hero — strict 100vh. 50/50.
 * The typography and the Core fight for attention. Both win.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  // Cursor position drives the Core's rotation and lighting.
  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };

  return (
    <section
      id="top"
      ref={wrapRef}
      onMouseMove={onMove}
      className="relative flex min-h-[max(600px,100svh)] items-center overflow-x-hidden pb-8 pt-[100px] sm:min-h-[max(760px,100svh)] sm:pt-[130px]"
      style={{ ["--px" as string]: 0, ["--py" as string]: 0 }}
    >
      {/* Grid lives here ONLY. After the hero — never again. */}
      <div className="backdrop-grid" aria-hidden />

      <div className="shell relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
        {/* Left — who AZUO is */}
        <div>
          <motion.div
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-7"
          >
            AI Engineering Studio
          </motion.div>

          <motion.h1
            className="text-mega"
            initial={reduce ? undefined : "hidden"}
            animate={reduce ? undefined : "show"}
            transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          >
            <motion.span className="block" variants={line} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              What if
            </motion.span>
            <motion.span className="block" variants={line} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              the software
            </motion.span>
            <motion.span className="block" variants={line} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              doesn&apos;t
            </motion.span>
            <motion.span
              className="block text-[var(--color-accent)]"
              variants={line}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              exist?
            </motion.span>
          </motion.h1>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex max-w-md flex-col gap-4 xl:mt-8"
          >
            <span className="text-headline block leading-snug">We engineer it.</span>
            <p className="text-[var(--text-body)] leading-snug text-[var(--color-ink-soft)]">
              We design and engineer AI products, agents, and automation —
              powered by voice and vision — for problems that don&apos;t fit
              a template.
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--color-ink-faint)]">
              For startups, teams, and businesses solving problems existing
              software can&apos;t handle.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a href="#contact" className="btn-glass">
                Start a Project
                <span aria-hidden>→</span>
              </a>
              <a href="#systems" className="btn-ghost">
                Explore Systems
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right — THE CENTERPIECE. Same visual weight as the typography. */}
        <div
          className="relative hidden lg:block xl:-mr-12"
          style={{ height: "min(720px, calc(100svh - 200px))" }}
        >
          <OrbitalCore />
          <div className="pointer-events-none absolute -bottom-2 left-0 right-0 text-center">
            <span className="font-mono text-[0.7rem] tracking-[0.14em] text-[var(--color-ink-faint)]">
              idea → intelligence → execution → production
            </span>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="eyebrow">Scroll</span>
        <motion.span
          aria-hidden
          className="block h-6 w-px bg-[var(--color-ink-faint)]"
          animate={reduce ? undefined : { scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
