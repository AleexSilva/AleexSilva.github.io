import { Database, LineChart, Sparkles } from "lucide-react";
import { profile } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const pillars = [
  {
    icon: Database,
    title: "Data Engineering",
    body: "Pipeline architecture and ETL across SQL and Big Data — clean, fast, and reliable foundations.",
  },
  {
    icon: LineChart,
    title: "Analytics & BI",
    body: "Dashboards, forecasts, and KPI systems in Tableau and Power BI that leaders actually use.",
  },
  {
    icon: Sparkles,
    title: "AI & Modeling",
    body: "Predictive models and LLM fine-tuning that turn raw signal into competitive advantage.",
  },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="About"
          title="Where economics meets engineering"
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal>
            <p className="text-lg leading-relaxed text-fg-muted sm:text-xl">
              {profile.summary}
            </p>
            <p className="mt-6 text-base leading-relaxed text-fg-faint">
              An economist&apos;s lens on the question. An engineer&apos;s
              discipline on the data. I&apos;ve led work from Buenos Aires to
              Madrid, New York, and San Francisco — and I keep chasing the next
              hard problem worth solving.
            </p>
          </Reveal>

          <div className="grid gap-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="group glass rounded-xl p-5 transition hover:border-amber/40">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-amber/12 text-amber ring-1 ring-amber/25 transition group-hover:bg-amber/20">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-fg">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
