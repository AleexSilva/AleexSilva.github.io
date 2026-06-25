"use client";

import { motion } from "framer-motion";
import { ArrowDown, BarChart3, Mail, MapPin } from "lucide-react";
import { links, profile, stats } from "@/lib/content";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-grid"
    >
      {/* ambient amber glow */}
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,177,61,0.22),transparent_62%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[28rem] w-[28rem] translate-x-1/3 translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(245,177,61,0.10),transparent_60%)] blur-2xl"
      />
      {/* fade to page bg at bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-28 pb-20 sm:px-8">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-xs text-fg-muted backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
            </span>
            Available for data &amp; AI consulting
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.02] tracking-tight text-fg sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            {profile.firstName}
            <br className="hidden sm:block" />{" "}
            <span className="text-amber-gradient">{profile.lastName}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl font-[family-name:var(--font-display)] text-xl font-medium text-fg sm:text-2xl"
          >
            {profile.tagline}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg"
          >
            {profile.summaryShort}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-faint"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-amber" />
              {profile.location}
            </span>
          </motion.div>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2 rounded-lg bg-amber px-6 py-3.5 text-sm font-semibold text-[#1a1205] transition hover:bg-amber-bright"
            >
              Explore the Portfolio
              <BarChart3 className="h-4 w-4 transition group-hover:scale-110" />
            </a>
            <a
              href={`mailto:${links.email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface/50 px-6 py-3.5 text-sm font-semibold text-fg backdrop-blur transition hover:border-amber/50 hover:bg-surface"
            >
              <Mail className="h-4 w-4 text-amber" />
              Get in touch
            </a>
          </motion.div>

          {/* stat strip */}
          <motion.dl
            variants={item}
            className="mt-16 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-bg-2/80 px-5 py-5 backdrop-blur">
                <dt className="font-[family-name:var(--font-display)] text-3xl font-bold text-amber">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-wide text-fg-faint">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 text-fg-faint transition hover:text-amber md:block"
      >
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ArrowDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
