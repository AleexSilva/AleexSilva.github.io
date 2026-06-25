import { links, navItems, profile } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-bg-2/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-amber/15 font-[family-name:var(--font-display)] text-sm font-semibold text-amber ring-1 ring-amber/30">
            AS
          </span>
          <div>
            <p className="text-sm font-medium text-fg">{profile.name}</p>
            <p className="text-xs text-fg-faint">{profile.role}</p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-fg-muted transition hover:text-amber"
            >
              {item.label}
            </a>
          ))}
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
