"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Brain,
  CheckCircle2,
  Code2,
  Database,
  GitFork,
  LineChart,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { links, projects, PROJECT_CATEGORIES, type ProjectCategory } from "@/lib/content";
import { resolveIcon } from "@/lib/icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const categoryIcons: Record<string, LucideIcon> = {
  ML: Brain,
  BI: LineChart,
  "Data Engineering": Database,
  AI: Sparkles,
  Engineering: Code2,
};

const filters: Array<"All" | ProjectCategory> = ["All", ...PROJECT_CATEGORIES];

export function Portfolio() {
  const [active, setActive] = useState<"All" | ProjectCategory>("All");

  const visible =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section
      id="portfolio"
      className="relative scroll-mt-20 border-t border-border bg-bg-2/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Portfolio"
          title="See the work, not just the words"
          description="End-to-end projects spanning machine learning, business intelligence, AI, and data engineering."
        />

        {/* filter tabs */}
        <Reveal>
          <div className="mt-10 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition duration-200 ${
                  active === f
                    ? "border-amber bg-amber/15 text-amber"
                    : "border-border bg-transparent text-fg-muted hover:border-amber/40 hover:text-fg"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {/* project grid */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {visible.map((project, i) => {
            const Icon = resolveIcon(categoryIcons, project.category, BarChart3);
            return (
              <Reveal
                key={project.id}
                delay={i * 0.07}
                className={project.featured ? "md:col-span-2" : ""}
              >
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 transition duration-300 ${
                    project.featured
                      ? "border-amber/30 bg-gradient-to-br from-amber/[0.07] via-surface to-transparent hover:border-amber/50"
                      : "glass hover:border-amber/40"
                  }`}
                >
                  {project.featured ? (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(245,177,61,0.14),transparent_65%)] blur-2xl transition-opacity duration-300 group-hover:opacity-150"
                    />
                  ) : null}

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber/12 text-amber ring-1 ring-amber/25 transition group-hover:bg-amber/20">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-amber">
                        {project.eyebrow}
                      </span>
                    </div>
                    {project.featured ? (
                      <span className="shrink-0 rounded-full border border-amber/30 bg-amber/10 px-2.5 py-0.5 font-mono text-xs text-amber">
                        Featured
                      </span>
                    ) : null}
                  </div>

                  <div className="relative mt-5">
                    <h3
                      className={`font-display font-semibold text-fg ${
                        project.featured ? "text-2xl" : "text-xl"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                      {project.description}
                    </p>
                  </div>

                  {/* highlights */}
                  <ul className="relative mt-5 space-y-1.5">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-fg-muted"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber/70" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* tech chips */}
                  <div className="relative mt-6 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border bg-surface-2/60 px-2.5 py-1 font-mono text-xs text-fg-muted transition hover:border-amber/30 hover:text-fg"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* github link */}
                  {project.githubUrl && (
                    <div className="relative mt-5 border-t border-border/50 pt-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs text-fg-faint transition duration-200 hover:text-amber"
                      >
                        <GitFork className="h-3.5 w-3.5" />
                        View on GitHub
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* LinkedIn CTA — slim banner */}
        <Reveal delay={0.15}>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 flex items-center justify-between rounded-xl border border-border bg-surface/50 px-6 py-4 transition duration-300 hover:border-amber/40 hover:bg-surface"
          >
            <div>
              <p className="text-sm font-medium text-fg">LinkedIn Profile</p>
              <p className="mt-0.5 font-mono text-xs text-fg-faint">
                {links.linkedinLabel}
              </p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-fg-faint transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
