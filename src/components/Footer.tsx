import { links, profile } from "@/lib/content";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-bg-2/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-2.5">
          <Logo />
          <div>
            <p className="text-sm font-medium text-fg">{profile.name}</p>
            <p className="text-xs text-fg-faint">{profile.role}</p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          <NavLinks className="text-sm text-fg-muted transition hover:text-amber" />
        </nav>

        <p className="text-xs text-fg-faint">
          © {year} {profile.name}. Built with Next.js.
        </p>
      </div>
      <a href={`mailto:${links.email}`} className="sr-only">
        {links.email}
      </a>
    </footer>
  );
}
