"use client";

import {
  Award,
  BarChart2,
  Briefcase,
  Code2,
  GraduationCap,
  Languages as LanguagesIcon,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  certifications,
  education,
  languages,
  skillGroups,
  skillLevelWidth,
  type SkillLevel,
} from "@/lib/content";
import { resolveIcon } from "@/lib/icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const categoryIcons: Record<string, LucideIcon> = {
  Code2,
  BarChart2,
  Sparkles,
  Briefcase,
};

const levelStyles: Record<SkillLevel, { bar: string; badge: string }> = {
  Expert: { bar: "bg-amber", badge: "text-amber border-amber/30 bg-amber/10" },
  Proficient: {
    bar: "bg-amber/70",
    badge: "text-amber/80 border-amber/20 bg-amber/[0.07]",
  },
  Familiar: {
    bar: "bg-amber/40",
    badge: "text-fg-faint border-border bg-surface-2/60",
  },
};

export function Expertise() {
  return (
    <section id="expertise" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Expertise"
          title="The toolkit behind the work"
        />

        {/* skill groups with proficiency bars */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group, i) => {
            const Icon = resolveIcon(categoryIcons, group.icon, Code2);
            return (
              <Reveal key={group.category} delay={i * 0.08}>
                <div className="glass h-full rounded-xl p-6 transition hover:border-amber/40">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber/12 text-amber ring-1 ring-amber/20">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
                      {group.category}
                    </h3>
                  </div>

                  <ul className="mt-5 space-y-3.5">
                    {group.items.map((skill) => (
                      <li key={skill.name}>
                        <div className="mb-1.5 flex items-center justify-between gap-2">
                          <span className="text-sm text-fg">{skill.name}</span>
                          <span
                            className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${levelStyles[skill.level].badge}`}
                          >
                            {skill.level}
                          </span>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-surface-2">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${levelStyles[skill.level].bar}`}
                            style={{ width: skillLevelWidth[skill.level] }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* education / certs / languages */}
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <Reveal>
            <div className="glass h-full rounded-xl p-6">
              <div className="flex items-center gap-2.5 text-fg">
                <GraduationCap className="h-5 w-5 text-amber" />
                <h3 className="font-display text-base font-semibold">
                  Education
                </h3>
              </div>
              <ul className="mt-4 space-y-4">
                {education.map((e) => (
                  <li key={e.school}>
                    <p className="text-sm font-medium text-fg">
                      {e.degree}, {e.field}
                    </p>
                    <p className="text-sm text-fg-muted">{e.school}</p>
                    <p className="font-mono text-xs text-fg-faint">{e.period}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass h-full rounded-xl p-6">
              <div className="flex items-center gap-2.5 text-fg">
                <Award className="h-5 w-5 text-amber" />
                <h3 className="font-display text-base font-semibold">
                  Certifications
                </h3>
              </div>
              <ul className="mt-4 space-y-2.5">
                {certifications.map((c) => (
                  <li
                    key={c}
                    className="flex gap-2.5 text-sm leading-snug text-fg-muted"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber/70" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="glass h-full rounded-xl p-6">
              <div className="flex items-center gap-2.5 text-fg">
                <LanguagesIcon className="h-5 w-5 text-amber" />
                <h3 className="font-display text-base font-semibold">
                  Languages
                </h3>
              </div>
              <ul className="mt-4 space-y-3">
                {languages.map((l) => (
                  <li
                    key={l.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="font-medium text-fg">{l.name}</span>
                    <span className="text-fg-faint">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
