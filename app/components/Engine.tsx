"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

/**
 * The AZUO Engine — a manufactured object, not UI.
 *
 * One reusable visual language (LEGO principle): an isometric stack of
 * machined glass slabs, held by rails, with intent flowing through the core.
 * The homepage shows the full stack; product pages later instantiate the
 * same engine with their own modules.
 *
 * Industrial rules:
 *  - slabs have THICKNESS (extruded edge), etched indices, a machined slot
 *  - constraints are visible: two corner rails + core beam
 *  - ONE massive soft ground shadow (Apple product-page style)
 *  - the LIGHT moves with the cursor — the object barely does
 *  - spring physics, slow enough that you almost don't notice
 */

export type EngineModule = {
  name: string; // uppercase display
  sub: string; // small technical sublabel
  accent?: boolean;
  base?: boolean;
};

export const AZUO_STACK: EngineModule[] = [
  { name: "VOICE", sub: "Interface Layer", accent: true },
  { name: "INTELLIGENCE", sub: "AI Runtime" },
  { name: "VISION", sub: "Perception Models" },
  { name: "AUTOMATION", sub: "Orchestration" },
  { name: "INFRASTRUCTURE", sub: "Cloud & IoT" },
  { name: "EXECUTION", sub: "Enterprise Systems", base: true },
];

// Slow, physical. Nothing snaps.
const SPRING = { type: "spring" as const, stiffness: 34, damping: 16, mass: 1.2 };

const PLATE = 320; // slab width/height (px)
const HALF_DIAG = Math.round(PLATE * 0.707); // screen half-extent of the rotated slab

export function Engine({
  modules = AZUO_STACK,
  centerX = "40%",
  restGap = 52,
  explodedGap = 96,
}: {
  modules?: EngineModule[];
  centerX?: string;
  restGap?: number;
  explodedGap?: number;
}) {
  const reduce = !!useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const gap = hovered ? explodedGap : restGap;
  const n = modules.length;
  const beamLen = gap * (n - 1) + 90;

  return (
    <motion.div
      className="absolute inset-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={reduce ? undefined : { opacity: 0, y: 40, filter: "blur(12px)" }}
      animate={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ONE massive soft shadow — the object exists on a surface */}
      <motion.div
        aria-hidden
        className="absolute h-[120px] w-[480px] -translate-x-1/2"
        style={{
          left: centerX,
          bottom: "6px",
          background:
            "radial-gradient(ellipse at center, rgba(17,17,17,0.22), transparent 66%)",
          filter: "blur(10px)",
        }}
        animate={{ scaleX: hovered ? 1.18 : 1, opacity: hovered ? 0.85 : 1 }}
        transition={SPRING}
      />

      {/* Parallax lean — barely there; the LIGHT does the work */}
      <div
        className="absolute inset-0"
        style={{
          transform:
            "perspective(1600px) rotateY(calc(var(--px) * 4deg)) rotateX(calc(var(--py) * -3deg))",
          transition: "transform 800ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Breathing — 12s, almost imperceptible */}
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Corner rails — the visible constraint. Manufactured, not floating. */}
          {[-1, 1].map((side) => (
            <motion.div
              key={side}
              aria-hidden
              className="absolute w-px -translate-y-1/2"
              style={{
                left: `calc(${centerX} + ${side * HALF_DIAG}px)`,
                top: "50%",
                background:
                  "linear-gradient(to bottom, transparent, var(--color-line-strong) 12%, var(--color-line-strong) 88%, transparent)",
              }}
              animate={{ height: beamLen + 60 }}
              transition={SPRING}
            />
          ))}

          {/* Core beam — intent flows through the machine */}
          <motion.div
            aria-hidden
            className="absolute w-px -translate-y-1/2"
            style={{
              left: centerX,
              top: "50%",
              background:
                "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-accent) 60%, transparent) 12%, color-mix(in srgb, var(--color-accent) 60%, transparent) 88%, transparent)",
            }}
            animate={{ height: beamLen }}
            transition={SPRING}
          >
            {/* Intent ticks — data, not sparkles */}
            {!reduce &&
              [0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="absolute left-1/2 top-0 h-[10px] w-[2px] rounded-full"
                  style={{
                    background: "var(--color-accent)",
                    ["--flow-len" as string]: `${beamLen - 12}px`,
                    animation: `flow-down 4.6s linear ${i * 1.15}s infinite`,
                  }}
                />
              ))}
          </motion.div>

          {/* The slabs */}
          {modules.map((m, i) => {
            const y = (i - (n - 1) / 2) * gap;
            return (
              <motion.div
                key={m.name}
                className="absolute"
                style={{
                  left: centerX,
                  top: "50%",
                  width: PLATE,
                  height: PLATE,
                  marginTop: -PLATE / 2,
                  x: "-50%",
                  rotateX: 58,
                  rotateZ: -45,
                  zIndex: n - i,
                  transformStyle: "preserve-3d",
                }}
                animate={{ y }}
                transition={SPRING}
              >
                {/* Extruded edge — the slab has mass */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    borderRadius: "var(--radius-card)",
                    transform: "translateZ(-14px)",
                    background: m.base
                      ? "linear-gradient(135deg, color-mix(in srgb, var(--color-ink) 26%, #dededa), color-mix(in srgb, var(--color-ink) 14%, #eaeae6))"
                      : "linear-gradient(135deg, color-mix(in srgb, var(--color-ink) 14%, #e6e6e2), color-mix(in srgb, var(--color-ink) 6%, #f0f0ec))",
                    border: "1px solid var(--color-line-strong)",
                  }}
                />

                {/* Top face */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    borderRadius: "var(--radius-card)",
                    border: "1px solid",
                    borderColor: m.accent
                      ? "color-mix(in srgb, var(--color-accent) 40%, var(--color-line))"
                      : "var(--color-line-strong)",
                    background: m.base
                      ? "linear-gradient(135deg, color-mix(in srgb, var(--color-ink) 9%, #ffffffcc), color-mix(in srgb, var(--color-ink) 5%, #ffffff77))"
                      : m.accent
                        ? "linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 14%, #ffffffcc), color-mix(in srgb, var(--color-accent) 5%, #ffffff66))"
                        : "linear-gradient(135deg, rgba(255,255,255,0.82), rgba(255,255,255,0.38))",
                    boxShadow: "0 1px 0 0 rgba(255,255,255,0.9) inset",
                  }}
                >
                  {/* Moving light — specular highlight follows the cursor */}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(260px circle at calc(50% + (var(--px) * 180%)) calc(50% + (var(--py) * 180%)), rgba(255,255,255,0.85), transparent 62%)",
                      opacity: 0.55,
                    }}
                  />
                  {/* Machined slot */}
                  <div
                    aria-hidden
                    className="absolute left-[12%] top-[16%] h-[3px] w-[30%] rounded-full"
                    style={{ background: "color-mix(in srgb, var(--color-ink) 12%, transparent)" }}
                  />
                  {/* Etched index */}
                  <span
                    aria-hidden
                    className="absolute bottom-[10%] right-[12%] font-mono text-[0.85rem] font-medium"
                    style={{ color: "color-mix(in srgb, var(--color-ink) 32%, transparent)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Core port — where the beam passes through */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      border: `1px solid ${m.accent ? "var(--color-accent)" : "var(--color-line-strong)"}`,
                      background: m.accent
                        ? "color-mix(in srgb, var(--color-accent) 30%, #fff)"
                        : "rgba(255,255,255,0.8)",
                    }}
                  />
                </div>
              </motion.div>
            );
          })}

          {/* Legend — engineering drawing, Apple-terse */}
          {modules.map((m, i) => {
            const y = (i - (n - 1) / 2) * gap;
            return (
              <motion.div
                key={m.name}
                className="absolute flex -translate-y-1/2 items-center gap-3"
                style={{ left: `calc(${centerX} + ${HALF_DIAG + 26}px)`, top: "50%" }}
                animate={{ y: y - 6, opacity: hovered ? 1 : 0.55 }}
                transition={SPRING}
              >
                <span
                  aria-hidden
                  className="block h-px w-6"
                  style={{ background: m.accent ? "var(--color-accent)" : "var(--color-line-strong)" }}
                />
                <span className="flex flex-col leading-tight">
                  <span
                    className="text-[0.78rem] font-semibold tracking-[0.14em]"
                    style={{ color: m.accent ? "var(--color-accent)" : "var(--color-ink)" }}
                  >
                    {m.name}
                  </span>
                  <span className="font-mono text-[0.62rem] text-[var(--color-ink-faint)]">
                    {m.sub}
                  </span>
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}
