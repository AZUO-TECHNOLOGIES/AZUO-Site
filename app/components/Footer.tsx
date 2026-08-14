export function Footer() {
  return (
    <footer className="mt-10 border-t border-[var(--color-line)]">
      <div className="shell py-20">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold tracking-[-0.04em]">azuo</span>
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--color-accent)" }} />
            </div>
            <p className="mt-4 max-w-xs text-[var(--color-ink-soft)]">
              An engineering studio. You imagine it, we engineer it.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[clamp(1.75rem,7vw,4.5rem)] font-[680] leading-none tracking-[-0.032em] sm:gap-x-10 md:gap-x-16">
            <span>Build.</span>
            <span className="text-[var(--color-ink-faint)]">Ship.</span>
            <span className="text-[var(--color-ink-faint)]">Scale.</span>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-[var(--color-line)] pt-8 text-sm text-[var(--color-ink-faint)] sm:flex-row">
          <span>© {new Date().getFullYear()} AZUO. Engineering products that don&apos;t exist yet.</span>
          <span className="font-mono">azuo.in</span>
        </div>
      </div>
    </footer>
  );
}
