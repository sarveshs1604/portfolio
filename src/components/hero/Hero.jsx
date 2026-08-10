import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import { profile } from '../../data/profile'
import Button from '../ui/Button'
import { GitHubIcon, LinkedInIcon } from '../ui/SocialIcons'
import WeatherWidget from './WeatherWidget'

/**
 * Hero — immediately communicates identity, CTAs, and atmosphere context.
 */
export default function Hero({ timeOfDay, weather, placeLabel, weatherStatus, temperatureC }) {
  const prefersReduced = useReducedMotion()

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.1,
        delayChildren: prefersReduced ? 0 : 0.12,
      },
    },
  }

  const item = {
    hidden: prefersReduced ? { opacity: 1 } : { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReduced ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center px-4 pb-16 pt-28 sm:px-6 lg:px-8"
      aria-labelledby="hero-name"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.div variants={item} className="mb-8">
            <WeatherWidget
              timeOfDay={timeOfDay}
              weather={weather}
              placeLabel={placeLabel}
              status={weatherStatus}
              temperatureC={temperatureC}
            />
          </motion.div>

          <motion.p
            variants={item}
            className="mb-3 text-sm font-medium tracking-wide text-blue-300/90"
          >
            {profile.title}
          </motion.p>

          <motion.h1
            id="hero-name"
            variants={item}
            className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-lg leading-relaxed text-slate-400 sm:text-xl"
          >
            {profile.tagline}
          </motion.p>

          {profile.currentlyExploring ? (
            <motion.p
              variants={item}
              className="mt-4 text-sm text-slate-500"
            >
              <span className="text-slate-400">Currently exploring</span>
              {' · '}
              {profile.currentlyExploring}
            </motion.p>
          ) : null}

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href={profile.cta.primary.href} variant="primary">
              {profile.cta.primary.label}
              <ArrowDownRight size={16} aria-hidden />
            </Button>
            <Button href={profile.cta.secondary.href} variant="secondary">
              {profile.cta.secondary.label}
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-3"
            aria-label="Social profiles"
          >
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
            >
              <GitHubIcon size={15} />
              GitHub
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
            >
              <LinkedInIcon size={15} />
              LinkedIn
            </a>
            <a
              href={profile.social.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
            >
              LeetCode
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative hidden min-h-[280px] lg:block"
          initial={prefersReduced ? false : { opacity: 0, scale: 0.96, y: 24 }}
          animate={
            prefersReduced
              ? { opacity: 1, scale: 1, y: 0 }
              : {
                  opacity: 1,
                  scale: 1,
                  y: [0, -8, 0],
                }
          }
          transition={
            prefersReduced
              ? { duration: 0.01 }
              : {
                  opacity: { duration: 0.7, delay: 0.15 },
                  scale: { duration: 0.7, delay: 0.15 },
                  y: {
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.9,
                  },
                }
          }
          aria-hidden
        >
          <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-900/20 shadow-[0_0_80px_rgba(59,130,246,0.12)]" />
          <div className="absolute -inset-4 rounded-[2.5rem] bg-blue-500/5 blur-2xl" />
          <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-[#0a1424]/60 p-5 backdrop-blur-md">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-300/80">
              Focus
            </p>
            <p className="mt-2 font-display text-lg text-white">
              Full-stack systems. Practical AI.
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Workflow automation, secure cloud storage, and applied machine learning.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
