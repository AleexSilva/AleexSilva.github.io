import { ArrowUpRight, Mail } from "lucide-react";
import { links } from "@/lib/content";
import { LinkButton } from "./LinkButton";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(245,177,61,0.18),transparent_62%)] blur-2xl"
            />
            <div className="relative">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-amber">
                Contact
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
                Let&apos;s build something
                <br />
                <span className="text-amber-gradient">worth measuring.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-fg-muted">
                Have a data challenge, a model to ship, or a dashboard that
                needs a brain behind it? I&apos;d love to hear about it.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <LinkButton
                  href={`mailto:${links.email}`}
                  className="group w-full justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold sm:w-auto"
                >
                  <Mail className="h-4 w-4" />
                  {links.email}
                </LinkButton>
                <LinkButton
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  className="group w-full justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold sm:w-auto"
                >
                  Connect on LinkedIn
                  <ArrowUpRight className="h-4 w-4 text-amber transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </LinkButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
