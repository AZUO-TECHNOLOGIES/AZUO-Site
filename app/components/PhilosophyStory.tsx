"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

/**
 * The Philosophy — scroll cinema, v2.
 *
 * Rules:
 *  - ONE readable scene at a time. Hard isolation: active = sharp,
 *    everything else is gone or dissolving at heavy blur.
 *  - The climax is an ARCHITECTURAL SYSTEMS MAP: engineering blocks wired
 *    with hairline connectors; a light pulse travels the architecture as
 *    you scroll — problem in at the top, production out at the bottom.
 *  - Then real transformations: Factory Downtime → ... → Production System.
 *  - The anchor line gets the "Think Different" treatment.
 */

/* ---------------- scene ranges (0 → 1 across the pin) ---------------- */
const R1: [number, number] = [0.0, 0.11];
const R2: [number, number] = [0.11, 0.22];
const R3: [number, number] = [0.22, 0.33];
const R4: [number, number] = [0.33, 0.56]; // systems map — the climax
const R5A: [number, number] = [0.56, 0.66]; // chains build fast, then HOLD fully lit
const R5B: [number, number] = [0.66, 0.76];
const R6: [number, number] = [0.76, 0.85];
const R7: [number, number] = [0.85, 1.0]; // anchor — holds

/* ---------------- the systems map ---------------- */
// viewBox 960 × 760. y = block center. Activation time t within R4.
type Block = { id: string; label: string; x: number; y: number; w: number; t: number };
const BLOCKS: Block[] = [
  { id: "problem", label: "CLIENT PROBLEM", x: 480, y: 46, w: 240, t: 0.375 },
  { id: "discovery", label: "DISCOVERY", x: 290, y: 156, w: 190, t: 0.4 },
  { id: "data", label: "DATA COLLECTION", x: 670, y: 156, w: 220, t: 0.4 },
  { id: "arch", label: "SYSTEM ARCHITECTURE", x: 480, y: 266, w: 290, t: 0.425 },
  { id: "ai", label: "AI", x: 235, y: 376, w: 120, t: 0.45 },
  { id: "backend", label: "BACKEND", x: 480, y: 376, w: 160, t: 0.45 },
  { id: "cloud", label: "CLOUD", x: 725, y: 376, w: 130, t: 0.45 },
  { id: "automation", label: "AUTOMATION LAYER", x: 480, y: 486, w: 260, t: 0.475 },
  { id: "deploy", label: "DEPLOYMENT", x: 480, y: 596, w: 200, t: 0.5 },
  { id: "evolve", label: "CONTINUOUS EVOLUTION", x: 480, y: 706, w: 290, t: 0.525 },
];
const BH = 52; // block height

// Hairline connectors. The light pulse draws along each at time t.
const WIRES: { d: string; t: number }[] = [
  { d: "M480,72 V110 H290 V130", t: 0.3875 },
  { d: "M480,72 V110 H670 V130", t: 0.3875 },
  { d: "M290,182 V210 H480 V240", t: 0.4125 },
  { d: "M670,182 V210 H480 V240", t: 0.4125 },
  { d: "M480,292 V320 H235 V350", t: 0.4375 },
  { d: "M480,292 V350", t: 0.4375 },
  { d: "M480,292 V320 H725 V350", t: 0.4375 },
  { d: "M235,402 V430 H480 V460", t: 0.4625 },
  { d: "M480,402 V460", t: 0.4625 },
  { d: "M725,402 V430 H480 V460", t: 0.4625 },
  { d: "M480,512 V570", t: 0.4875 },
  { d: "M480,622 V680", t: 0.5125 },
];

const CHAIN_A = ["Factory Downtime", "Operational Analysis", "Digital Twin", "Predictive Engine", "Production System"];
const CHAIN_B = ["Manual Workflow", "Voice Interface", "Automation Engine", "Enterprise Platform"];

export function PhilosophyStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div id="company">
      {/* Full pinned scroll-cinema — desktop width, motion-safe only.
          CSS-only toggle (not a JS/hydration check): the browser resolves
          this before any JS runs, so the SSR/first-paint HTML already
          matches the device — no flash of the tiny diagram on phones. */}
      <section ref={ref} className="relative hidden h-[820vh] md:motion-safe:block">
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
          {/* Blueprint — barely there. This IS the architecture section. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(247,247,244,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,247,244,0.055) 1px, transparent 1px)",
              backgroundSize: "90px 90px",
              maskImage: "radial-gradient(85% 75% at 50% 50%, #000 30%, transparent 100%)",
            }}
          />
          <Atmosphere p={p} />

          <Scene p={p} range={R1} first>
            <p className="text-headline text-[var(--color-ink-faint)]">Most companies ask,</p>
            <p className="text-display mt-6">&ldquo;What software do you need?&rdquo;</p>
          </Scene>

          <Scene p={p} range={R2}>
            <p className="text-[clamp(4rem,13vw,11rem)] font-bold leading-none tracking-[-0.04em]">
              We don&apos;t.
            </p>
          </Scene>

          <Scene p={p} range={R3}>
            <p className="text-headline text-[var(--color-ink-faint)]">We ask,</p>
            <p className="text-display mt-6">
              &ldquo;What <span className="text-[var(--color-accent)]">problem</span>
              <br />
              are you trying
              <br />
              to solve?&rdquo;
            </p>
          </Scene>

          {/* THE CLIMAX — the systems map */}
          <Scene p={p} range={R4}>
            <h3 className="text-[clamp(1.4rem,2.4vw,2rem)] font-bold tracking-[-0.01em]">
              How a problem becomes a system
            </h3>
            <p className="mt-2 text-[var(--color-ink-soft)]">
              Every great system begins with understanding the problem.
            </p>
            <svg
              viewBox="0 0 960 760"
              className="mt-6 w-full max-w-[860px]"
              style={{ maxHeight: "68vh" }}
              role="img"
              aria-label="AZUO systems map: client problem through discovery, architecture, engineering, automation, deployment, and continuous evolution"
            >
              {WIRES.map((w, i) => (
                <MapWire key={i} p={p} d={w.d} t={w.t} />
              ))}
              {BLOCKS.map((b) => (
                <MapBlock key={b.id} p={p} block={b} />
              ))}
            </svg>
          </Scene>

          <TransformChain p={p} range={R5A} items={CHAIN_A} eyebrow="Real problem № 01" />
          <TransformChain p={p} range={R5B} items={CHAIN_B} eyebrow="Real problem № 02" />

          <Scene p={p} range={R6}>
            <p className="text-headline text-[var(--color-ink-faint)]">Software is only</p>
            <p
              className="font-bold leading-none tracking-[-0.045em] text-[var(--color-accent)]"
              style={{ fontSize: "clamp(6rem, 24vw, 19rem)" }}
            >
              one
            </p>
            <p className="text-headline text-[var(--color-ink-faint)]">of the answers.</p>
          </Scene>

          <Finale p={p} />
        </div>
      </section>

      {/* Phones, tablets under md, and anyone with reduced-motion set —
          the same content as a plain readable list, no scroll-jacking. */}
      <div className="md:motion-safe:hidden">
        <StaticStory />
      </div>
    </div>
  );
}

/* ---------------- scene shell: hard isolation ---------------- */

function Scene({
  p,
  range: [a, b],
  first = false,
  hold = false,
  children,
}: {
  p: MotionValue<number>;
  range: [number, number];
  first?: boolean;
  hold?: boolean;
  children: React.ReactNode;
}) {
  const f = 0.022;
  const opacity = useTransform(
    p,
    first ? [a, b - f, b] : hold ? [a, a + f] : [a, a + f, b - f, b],
    first ? [1, 1, 0] : hold ? [0, 1] : [0, 1, 1, 0],
  );
  const scale = useTransform(
    p,
    first ? [b - f, b] : hold ? [a, a + f] : [a, a + f, b - f, b],
    first ? [1, 0.97] : hold ? [1.03, 1] : [1.03, 1, 1, 0.97],
  );
  // Dissolving scenes blur hard — the eye can only hold the sharp one
  const filter = useTransform(opacity, (o) => `blur(${(1 - o) * 14}px)`);
  const display = useTransform(opacity, (o) => (o === 0 ? "none" : "flex"));

  return (
    <motion.div
      style={{ opacity, scale, filter, display }}
      className="absolute inset-0 flex-col items-center justify-center px-6 text-center"
    >
      {children}
    </motion.div>
  );
}

/* ---------------- systems map pieces ---------------- */

function MapBlock({ p, block }: { p: MotionValue<number>; block: Block }) {
  const lit = useTransform(p, [block.t, block.t + 0.012], [0, 1]);
  const opacity = useTransform(lit, [0, 1], [0.55, 1]);
  const stroke = useTransform(lit, [0, 1], ["#525252", "#00c89e"]);
  const fill = useTransform(lit, [0, 1], ["rgba(255,255,255,0.04)", "rgba(0,168,132,0.12)"]);
  const textFill = useTransform(lit, [0, 1], ["#b4bbb7", "#ffffff"]);
  // The glow follows the pulse: peaks while active, settles to an ember
  const glow = useTransform(p, [block.t, block.t + 0.014, block.t + 0.05], [0, 0.5, 0.14]);

  return (
    <g>
      <motion.rect
        x={block.x - block.w / 2 - 8}
        y={block.y - BH / 2 - 8}
        width={block.w + 16}
        height={BH + 16}
        rx={14}
        fill="#00a884"
        style={{ opacity: glow, filter: "blur(16px)" }}
      />
      <motion.rect
        x={block.x - block.w / 2}
        y={block.y - BH / 2}
        width={block.w}
        height={BH}
        rx={10}
        strokeWidth={1.2}
        style={{ opacity, stroke, fill }}
      />
      <motion.text
        x={block.x}
        y={block.y + 5}
        textAnchor="middle"
        style={{ opacity, fill: textFill }}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="15"
        fontWeight="700"
        letterSpacing="0.12em"
      >
        {block.label}
      </motion.text>
    </g>
  );
}

function MapWire({ p, d, t }: { p: MotionValue<number>; d: string; t: number }) {
  const pathLength = useTransform(p, [t, t + 0.014], [0, 1]);
  const litOpacity = useTransform(p, [t, t + 0.006], [0, 1]);
  return (
    <g>
      {/* hairline — always faintly present, like a trace on a board */}
      <path d={d} fill="none" stroke="#525252" strokeWidth={1} />
      {/* the light travels */}
      <motion.path
        d={d}
        fill="none"
        stroke="#00d6a9"
        strokeWidth={2}
        style={{ pathLength, opacity: litOpacity, filter: "drop-shadow(0 0 6px rgba(0,214,169,0.9))" }}
      />
    </g>
  );
}

/* ---------------- real transformations ---------------- */

function TransformChain({
  p,
  range,
  items,
  eyebrow,
}: {
  p: MotionValue<number>;
  range: [number, number];
  items: string[];
  eyebrow: string;
}) {
  const [a] = range;
  return (
    <Scene p={p} range={range}>
      <p className="mb-8 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-faint)]">
        {eyebrow}
      </p>
      <div className="flex flex-col items-center gap-2.5">
        {/* All items finish lighting well before the fade-out window,
            so the complete chain is readable before it dissolves. */}
        {items.map((item, i) => (
          <ChainItem key={item} p={p} t={a + 0.012 + i * 0.005} label={item} last={i === items.length - 1} />
        ))}
      </div>
    </Scene>
  );
}

function ChainItem({
  p,
  t,
  label,
  last,
}: {
  p: MotionValue<number>;
  t: number;
  label: string;
  last: boolean;
}) {
  const lit = useTransform(p, [t, t + 0.006], [0, 1]);
  const opacity = useTransform(lit, [0, 1], [0.5, 1]);
  const y = useTransform(lit, [0, 1], [10, 0]);
  const borderColor = useTransform(lit, [0, 1], ["#525252", "#00c89e"]);
  const background = useTransform(lit, [0, 1], ["rgba(255,255,255,0.03)", "rgba(0,168,132,0.12)"]);
  return (
    <>
      <motion.div
        style={{ opacity, y, borderColor, background }}
        className="rounded-xl border px-7 py-3.5 font-mono text-base font-bold uppercase tracking-[0.1em] text-white sm:text-lg"
      >
        {label}
      </motion.div>
      {!last && (
        <motion.span aria-hidden style={{ opacity }} className="text-[var(--color-accent)]">
          ↓
        </motion.span>
      )}
    </>
  );
}

/* ---------------- the anchor — Think Different treatment ---------------- */

function Finale({ p }: { p: MotionValue<number> }) {
  // Lines 1+2 appear, then recede to 15% as the philosophy line lands.
  const l12 = useTransform(p, [0.87, 0.9, 0.925, 0.95], [0, 1, 1, 0.4]);
  const l12y = useTransform(p, [0.87, 0.9], [30, 0]);
  const l3o = useTransform(p, [0.925, 0.955], [0, 1]);
  const l3s = useTransform(p, [0.925, 0.965], [1.16, 1]);
  const sceneO = useTransform(p, [0.85, 0.87], [0, 1]);
  const display = useTransform(sceneO, (o) => (o === 0 ? "none" : "flex"));

  return (
    <motion.div
      style={{ opacity: sceneO, display }}
      className="absolute inset-0 flex-col items-center justify-center px-6 text-center"
    >
      <motion.div style={{ opacity: l12, y: l12y }}>
        <p className="text-display">We don&apos;t start with software.</p>
        <p className="text-display mt-3">We start with the problem.</p>
      </motion.div>
      <motion.p
        style={{
          opacity: l3o,
          scale: l3s,
          textShadow: "0 0 48px color-mix(in srgb, var(--color-accent) 55%, transparent)",
        }}
        className="text-display mt-10 text-[var(--color-accent)]"
      >
        Everything else is engineering.
      </motion.p>
    </motion.div>
  );
}

/* ---------------- atmosphere ---------------- */

function Atmosphere({ p }: { p: MotionValue<number> }) {
  const x = useTransform(p, [0, 0.5, 1], ["18%", "78%", "40%"]);
  const y = useTransform(p, [0, 0.5, 1], ["25%", "65%", "35%"]);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute h-[38rem] w-[38rem] rounded-full"
      style={{
        left: x,
        top: y,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 16%, transparent), transparent 62%)",
        filter: "blur(70px)",
      }}
    />
  );
}

/* ---------------- static fallback: phones + reduced-motion ---------------- */

function StaticChain({ eyebrow, items }: { eyebrow: string; items: string[] }) {
  return (
    <div>
      <p className="mb-8 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-faint)]">
        {eyebrow}
      </p>
      <div className="flex flex-col items-center gap-2.5">
        {items.map((item, i) => (
          <span key={item} className="flex flex-col items-center gap-2.5">
            <span className="rounded-xl border border-[var(--color-line-strong)] px-7 py-3.5 font-mono font-bold uppercase tracking-[0.1em]">
              {item}
            </span>
            {i < items.length - 1 && (
              <span aria-hidden className="text-[var(--color-accent)]">
                ↓
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function StaticStory() {
  return (
    <section className="shell flex flex-col gap-28 py-32 text-center sm:py-40">
      <div>
        <p className="text-headline text-[var(--color-ink-faint)]">Most companies ask,</p>
        <p className="text-display mt-4">&ldquo;What software do you need?&rdquo;</p>
      </div>
      <p className="text-[clamp(3rem,10vw,8rem)] font-bold leading-none tracking-[-0.04em]">
        We don&apos;t.
      </p>
      <div>
        <p className="text-headline text-[var(--color-ink-faint)]">We ask,</p>
        <p className="text-display mt-4">
          &ldquo;What <span className="text-[var(--color-accent)]">problem</span> are you trying to solve?&rdquo;
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-bold">How a problem becomes a system</h3>
        <div className="mt-8 flex flex-col items-center gap-2.5">
          {["Client Problem", "Discovery + Data", "System Architecture", "AI · Backend · Cloud", "Automation Layer", "Deployment", "Continuous Evolution"].map((s, i, arr) => (
            <span key={s} className="flex flex-col items-center gap-2.5">
              <span className="rounded-xl border border-[var(--color-line-strong)] px-7 py-3.5 font-mono font-bold uppercase tracking-[0.1em]">
                {s}
              </span>
              {i < arr.length - 1 && <span aria-hidden className="text-[var(--color-accent)]">↓</span>}
            </span>
          ))}
        </div>
      </div>
      <StaticChain eyebrow="Real problem № 01" items={CHAIN_A} />
      <StaticChain eyebrow="Real problem № 02" items={CHAIN_B} />
      <div>
        <p className="text-headline text-[var(--color-ink-faint)]">Software is only</p>
        <p className="text-[clamp(4rem,16vw,12rem)] font-bold leading-none text-[var(--color-accent)]">one</p>
        <p className="text-headline text-[var(--color-ink-faint)]">of the answers.</p>
      </div>
      <div>
        <p className="text-display">We don&apos;t start with software.</p>
        <p className="text-display mt-2">We start with the problem.</p>
        <p className="text-display mt-2 text-[var(--color-accent)]">Everything else is engineering.</p>
      </div>
    </section>
  );
}
