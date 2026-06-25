import { MapPin } from "lucide-react";
import { experience } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Timeline() {
  return (
    <section
      id="journey"
      className="relative scroll-mt-20 border-t border-border bg-bg-2/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Career Journey"
          title="A decade turning data into decisions"
          description="From Big Four consulting to Wall Street finance to Silicon Valley — a track record of building data systems that move organizations forward."
        />

        <div className="relative mt-16">
          {/* vertical spine */}
          <div
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-amber/60 via-border to-transparent md:left-[9px]"
          />

          <ol className="space-y-12">
            {experience.map((job, i) => (
              <Reveal as="li" key={job.company} delay={i * 0.05}>
                <div className="relative pl-9 md:pl-12">
                  {/* node */}
                  <span className="absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center md:h-[19px] md:w-[19px]">
                    <span
                      className={`h-full w-full rounded-full ring-4 ring-bg-2 ${
                        job.current
                          ? "bg-amber shadow-[0_0_0_4px_rgba(245,177,61,0.2)]"
                          : "bg-surface-2 ring-bg-2"
                      }`}
                    />
                    {job.current ? (
                      <span className="absolute h-full w-full animate-ping rounded-full bg-amber opacity-50" />
                    ) : null}
                  </span>

                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-fg">
                        {job.title}
                      </h3>
                      <p className="mt-0.5 text-base font-medium text-amber">
                        {job.company}
                      </p>
                    </div>
                    <div className="shrink-0 text-left sm:text-right">
                      <p className="font-mono text-xs uppercase tracking-wide text-fg-muted">
                        {job.period}
                      </p>
                      <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-fg-faint sm:justify-end">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-4 grid gap-2.5">
                    {job.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-3 text-sm leading-relaxed text-fg-muted"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber/70" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
