import { Reveal } from "./Reveal";

/** Big centered declaration — reusable. */
export function BigStatement({
  lines,
  id,
}: {
  lines: { text: string; muted?: boolean; accent?: boolean }[];
  id?: string;
}) {
  return (
    <section id={id} className="shell py-28 sm:py-40">
      <div className="mx-auto max-w-4xl">
        {lines.map((l, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p
              className={`text-display ${
                l.accent
                  ? "text-[var(--color-accent)]"
                  : l.muted
                    ? "text-[var(--color-ink-faint)]"
                    : ""
              }`}
            >
              {l.text}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
