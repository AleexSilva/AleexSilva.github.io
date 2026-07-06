"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/lib/content";
import { LinkButton } from "./LinkButton";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-border shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-display text-sm font-semibold tracking-tight text-fg"
        >
          <Logo hoverable />
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        {/* desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          <NavLinks className="rounded-md px-3 py-2 text-sm text-fg-muted transition hover:text-fg" />
          <LinkButton
            href="#portfolio"
            className="ml-3 rounded-md px-4 py-2 text-sm font-medium"
          >
            Portfolio
          </LinkButton>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-md text-fg-muted transition hover:text-fg md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* mobile drawer */}
      {open ? (
        <div className="glass border-t border-border md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
            <NavLinks
              className="rounded-md px-2 py-3 text-base text-fg-muted transition hover:text-fg"
              onItemClick={() => setOpen(false)}
            />
            <LinkButton
              href="#portfolio"
              onClick={() => setOpen(false)}
              className="mt-2 justify-center rounded-md px-4 py-3 text-sm font-medium"
            >
              View Portfolio
            </LinkButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}
