"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * The AZUO Engineering Core — not an illustration. The centerpiece.
 *
 * A structured, living system that visually explains how AZUO builds
 * technology: seven capability nodes wired to a central AI core through a
 * visible architecture. Data flows node → core (assembly), the core flashes
 * (intelligence), then fires outward (execution). On loop, forever.
 *
 * Depth layers, back to front:
 *   1 fog (moves opposite the cursor)
 *   2 orbital rings
 *   3 particle field + constellation links   (canvas)
 *   4 network architecture + traveling data  (canvas)
 *   5 the core (halo → machined ring → nucleus)
 *   6 capability nodes (extra parallax)
 *   7 the site-wide cursor light
 */

type Module = { label: string; angle: number; r: number; accent?: boolean };

// Symmetric architecture — engineered, not scattered.
const MODULES: Module[] = [
  { label: "VOICE", angle: -90, r: 280, accent: true },
  { label: "VISION", angle: -38, r: 300 },
  { label: "DIGITAL TWINS", angle: -142, r: 300 },
  { label: "APIS", angle: 0, r: 295 },
  { label: "AGENTS", angle: 180, r: 295, accent: true },
  { label: "AUTOMATION", angle: 38, r: 300 },
  { label: "CLOUD & IOT", angle: 90, r: 280 },
];

const FLATTEN = 0.76; // slight tilt — dimensional, not squashed
const W = 780;
const H = 660;

const ANCHORS = MODULES.map((m) => {
  const a = (m.angle * Math.PI) / 180;
  return { ...m, x: Math.cos(a) * m.r, y: Math.sin(a) * m.r * FLATTEN };
});

// Ring edges connect angular neighbours — the outer bus of the architecture.
const SORTED = [...ANCHORS].sort((a, b) => a.angle - b.angle);

export function OrbitalCore() {
  const reduce = !!useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
    const cx = W / 2;
    const cy = H / 2;

    // Layer 3 — particle field
    const P = 56;
    const parts = Array.from({ length: P }, (_, i) => ({
      a: (i / P) * Math.PI * 2 + (i % 7) * 0.31,
      r: 88 + ((i * 37) % 156),
      v: (0.00011 + ((i * 13) % 10) * 0.000028) * (i % 3 === 0 ? -1 : 1),
      s: 1 + ((i * 7) % 10) / 9,
      teal: i % 6 === 0,
    }));

    // Layer 4 — data traveling the architecture
    type Pulse =
      | { kind: "spoke"; t: number; target: (typeof ANCHORS)[number]; inbound: boolean }
      | { kind: "edge"; t: number; ax: number; ay: number; bx: number; by: number };
    let pulses: Pulse[] = [];
    let fireCount = 0;
    let sinceFire = 1200;
    let coreFlash = 0;
    let last = performance.now();
    let raf = 0;

    const draw = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      ctx.clearRect(0, 0, W, H);

      // The permanent architecture — spokes + outer bus, always faintly there
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(24,24,24,0.065)";
      for (const m of ANCHORS) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + m.x, cy + m.y);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(24,24,24,0.045)";
      for (let i = 0; i < SORTED.length; i++) {
        const a = SORTED[i];
        const b = SORTED[(i + 1) % SORTED.length];
        ctx.beginPath();
        ctx.moveTo(cx + a.x, cy + a.y);
        ctx.lineTo(cx + b.x, cy + b.y);
        ctx.stroke();
      }

      // Particles + constellation links
      const pts: { x: number; y: number }[] = [];
      for (const p of parts) {
        if (!reduce) p.a += p.v * dt;
        const x = cx + Math.cos(p.a) * p.r;
        const y = cy + Math.sin(p.a) * p.r * FLATTEN;
        pts.push({ x, y });
        ctx.beginPath();
        ctx.arc(x, y, p.s, 0, Math.PI * 2);
        ctx.fillStyle = p.teal ? "rgba(0,168,132,0.55)" : "rgba(24,24,24,0.30)";
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 4600) {
            ctx.strokeStyle = `rgba(24,24,24,${(1 - d2 / 4600) * 0.085})`;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      if (!reduce) {
        // The build rhythm: assemble, assemble, execute.
        sinceFire += dt;
        if (sinceFire > 1700) {
          sinceFire = 0;
          fireCount++;
          const target = ANCHORS[Math.floor(Math.random() * ANCHORS.length)];
          const inbound = fireCount % 3 !== 0;
          pulses.push({ kind: "spoke", t: 0, target, inbound });
          if (!inbound) coreFlash = 1;
          // Occasionally, modules coordinate directly along the bus
          if (fireCount % 4 === 0) {
            const i = Math.floor(Math.random() * SORTED.length);
            const a = SORTED[i];
            const b = SORTED[(i + 1) % SORTED.length];
            pulses.push({ kind: "edge", t: 0, ax: a.x, ay: a.y, bx: b.x, by: b.y });
          }
        }

        pulses = pulses.filter((pl) => pl.t < 1.6);
        for (const pl of pulses) {
          pl.t += dt / 900;
          const grow = Math.min(pl.t, 1);
          const ease = 1 - Math.pow(1 - grow, 3);
          const alpha = pl.t < 1 ? 0.55 : 0.55 * (1 - (pl.t - 1) / 0.6);
          let ox: number, oy: number, hx: number, hy: number;
          if (pl.kind === "spoke") {
            const p = pl.inbound ? 1 - ease : ease;
            hx = cx + pl.target.x * p;
            hy = cy + pl.target.y * p;
            ox = pl.inbound ? cx + pl.target.x : cx;
            oy = pl.inbound ? cy + pl.target.y : cy;
          } else {
            ox = cx + pl.ax;
            oy = cy + pl.ay;
            hx = cx + pl.ax + (pl.bx - pl.ax) * ease;
            hy = cy + pl.ay + (pl.by - pl.ay) * ease;
          }
          ctx.strokeStyle = `rgba(0,168,132,${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(ox, oy);
          ctx.lineTo(hx, hy);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(hx, hy, 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,168,132,${Math.min(alpha + 0.25, 1)})`;
          ctx.fill();
        }

        // Core flash — intelligence, then decay
        if (coreFlash > 0.01) {
          coreFlash *= Math.pow(0.996, dt);
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 95);
          g.addColorStop(0, `rgba(0,168,132,${coreFlash * 0.3})`);
          g.addColorStop(1, "rgba(0,168,132,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(cx, cy, 95, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <motion.div
      className="absolute inset-0"
      initial={reduce ? undefined : { opacity: 0, scale: 0.96, filter: "blur(12px)" }}
      animate={reduce ? undefined : { opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Layer 1 — fog. Counter-moves. */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[640px] w-[640px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 11%, transparent), transparent 64%)",
          filter: "blur(64px)",
          transform:
            "translate(calc(-50% + var(--px) * -16px), calc(-50% + var(--py) * -12px))",
          transition: "transform 900ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* Layers 2–6 rotate together; inner layers add their own parallax */}
      <div
        className="absolute inset-0"
        style={{
          transform:
            "perspective(1300px) rotateY(calc(var(--px) * 10deg)) rotateX(calc(var(--py) * -8deg))",
          transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Layer 2 — orbital rings */}
        {[[560, 380], [720, 490]].map(([w, h]) => (
          <div
            key={w}
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ width: w, height: h, borderColor: "color-mix(in srgb, var(--color-ink) 7%, transparent)" }}
          />
        ))}

        {/* Layers 3+4 — particles, architecture, data (canvas, small parallax) */}
        <div
          className="absolute inset-0"
          style={{
            transform: "translate(calc(var(--px) * 6px), calc(var(--py) * 5px))",
            transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <canvas
            ref={canvasRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: W, height: H }}
            aria-hidden
          />
        </div>

        {/* Layer 5 — the core */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 30%, transparent), transparent 62%)",
              filter: "blur(22px)",
            }}
            animate={reduce ? undefined : { scale: [1, 1.09, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
            style={{ borderColor: "color-mix(in srgb, var(--color-accent) 35%, transparent)" }}
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ borderColor: "color-mix(in srgb, var(--color-ink) 8%, transparent)" }}
            animate={reduce ? undefined : { rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="relative h-32 w-32 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 34% 30%, #ffffff, #d7fff3 28%, var(--color-accent) 72%, #005f47 100%)",
              boxShadow:
                "0 0 80px 10px color-mix(in srgb, var(--color-accent) 38%, transparent), 0 2px 10px rgba(255,255,255,0.6) inset",
            }}
            animate={reduce ? undefined : { scale: [1, 1.045, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 whitespace-nowrap text-center">
            <span className="font-mono text-[0.62rem] tracking-[0.22em] text-[var(--color-ink-faint)]">
              AZUO CORE
            </span>
          </div>
        </div>

        {/* Layer 6 — capability nodes (strongest parallax — nearest to you) */}
        <div
          className="absolute inset-0"
          style={{
            transform: "translate(calc(var(--px) * 16px), calc(var(--py) * 12px))",
            transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {ANCHORS.map((m, i) => {
            const far = m.y < -100;
            return (
              <div
                key={m.label}
                className="absolute"
                style={{
                  left: `calc(50% + ${m.x}px)`,
                  top: `calc(50% + ${m.y}px)`,
                  transform: "translate(-50%, -50%)",
                  zIndex: far ? 1 : 3,
                }}
              >
                <motion.div
                  initial={reduce ? undefined : { opacity: 0, y: 14, filter: "blur(6px)" }}
                  animate={
                    reduce
                      ? undefined
                      : { opacity: far ? 0.75 : 1, y: [0, -5, 0], filter: "blur(0px)" }
                  }
                  transition={{
                    opacity: { duration: 0.8, delay: 0.8 + i * 0.09 },
                    filter: { duration: 0.8, delay: 0.8 + i * 0.09 },
                    y: { duration: 9 + i, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="flex items-center gap-2 rounded-full border px-4 py-2.5"
                  style={{
                    scale: far ? 0.88 : 1,
                    background: "rgba(255,255,255,0.74)",
                    backdropFilter: "blur(8px)",
                    borderColor: m.accent
                      ? "color-mix(in srgb, var(--color-accent) 35%, var(--color-line))"
                      : "var(--color-line-strong)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: m.accent ? "var(--color-accent)" : "var(--color-line-strong)" }}
                  />
                  <span className="whitespace-nowrap text-[0.7rem] font-bold tracking-[0.13em] text-[var(--color-ink)]">
                    {m.label}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
