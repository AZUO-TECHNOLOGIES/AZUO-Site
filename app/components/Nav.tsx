"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Systems", href: "#systems" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Company", href: "#company" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`glass-nav flex w-full max-w-[1100px] items-center justify-between rounded-full px-3 py-2 transition-all duration-500 ${
          scrolled ? "shadow-lg" : ""
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
      >
        <a href="#top" className="flex items-center gap-2 pl-3 pr-2">
          <span className="text-[1.15rem] font-semibold tracking-[-0.04em]">azuo</span>
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--color-accent)" }}
          />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-ink)]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn-glass hidden py-2.5 text-sm sm:inline-flex">
            Contact
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="btn-ghost md:hidden"
          >
            <span className="text-sm">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass-nav absolute top-[4.5rem] left-4 right-4 rounded-3xl p-3 md:hidden">
          <div className="flex flex-col">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-[var(--color-ink-soft)] hover:bg-white/50"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-glass mt-2 justify-center"
            >
              Start Your Project
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
