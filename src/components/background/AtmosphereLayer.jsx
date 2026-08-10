import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const effectTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] }

function EffectShell({ effectKey, children, reducedMotion }) {
  return (
    <motion.div
      key={effectKey}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reducedMotion ? undefined : { opacity: 0 }}
      transition={reducedMotion ? { duration: 0.01 } : effectTransition}
      aria-hidden
    >
      {children}
    </motion.div>
  )
}

function RainStreaks({ density, reducedMotion }) {
  const streaks = useMemo(() => {
    const count = Math.round(36 * density)
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 23 + (i % 5) * 7) % 100}%`,
      delay: `${(i % 9) * 0.09}s`,
      duration: `${0.5 + (i % 5) * 0.08}s`,
      height: `${22 + (i % 5) * 10}px`,
      opacity: 0.35 + (i % 5) * 0.1,
    }))
  }, [density])

  return (
    <>
      {streaks.map((s) => (
        <span
          key={s.id}
          className={`atm-rain-streak ${reducedMotion ? '' : 'atm-rain-streak--live'}`}
          style={{
            left: s.left,
            height: s.height,
            opacity: s.opacity,
            animationDelay: reducedMotion ? undefined : s.delay,
            animationDuration: reducedMotion ? undefined : s.duration,
          }}
        />
      ))}
    </>
  )
}

function SnowParticles({ density, reducedMotion }) {
  const flakes = useMemo(() => {
    const count = Math.round(28 * density)
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 31 + (i % 4) * 5) % 100}%`,
      size: 3 + (i % 4),
      delay: `${(i % 10) * 0.35}s`,
      duration: `${6 + (i % 6) * 1.2}s`,
      opacity: 0.45 + (i % 4) * 0.12,
    }))
  }, [density])

  return (
    <>
      {flakes.map((f) => (
        <span
          key={f.id}
          className={`atm-snow-flake ${reducedMotion ? '' : 'atm-snow-flake--live'}`}
          style={{
            left: f.left,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animationDelay: reducedMotion ? undefined : f.delay,
            animationDuration: reducedMotion ? undefined : f.duration,
            top: reducedMotion ? `${(f.id * 17) % 90}%` : undefined,
          }}
        />
      ))}
    </>
  )
}

function CloudHaze({ opacity, reducedMotion }) {
  return (
    <>
      <div
        className={`atm-cloud atm-cloud--a ${reducedMotion ? '' : 'atm-cloud--live'}`}
        style={{ opacity: Math.max(opacity, 0.28) }}
      />
      <div
        className={`atm-cloud atm-cloud--b ${reducedMotion ? '' : 'atm-cloud--live'}`}
        style={{ opacity: Math.max(opacity * 0.9, 0.22) }}
      />
    </>
  )
}

function SunGlow({ reducedMotion }) {
  return (
    <div className={`atm-sun-glow ${reducedMotion ? '' : 'atm-sun-glow--live'}`} />
  )
}

function WindMist({ density, reducedMotion }) {
  const wisps = useMemo(() => {
    const count = Math.round(14 * density)
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${10 + ((i * 13) % 75)}%`,
      delay: `${(i % 6) * 0.4}s`,
      duration: `${4.5 + (i % 4) * 1.1}s`,
      opacity: 0.22 + (i % 4) * 0.08,
      width: `${160 + (i % 5) * 50}px`,
    }))
  }, [density])

  return (
    <>
      {wisps.map((w) => (
        <span
          key={w.id}
          className={`atm-wind-wisp ${reducedMotion ? '' : 'atm-wind-wisp--live'}`}
          style={{
            top: w.top,
            width: w.width,
            opacity: w.opacity,
            animationDelay: reducedMotion ? undefined : w.delay,
            animationDuration: reducedMotion ? undefined : w.duration,
            left: reducedMotion ? `${(w.id * 23) % 70}%` : undefined,
          }}
        />
      ))}
    </>
  )
}

/**
 * Single atmosphere layer — only renders effects for the active weather.
 * Uses lightweight CSS/DOM animations (no canvas particle systems).
 */
export default function AtmosphereLayer({ theme, reducedMotion = false }) {
  const { colors, effects, timeOfDay, weather } = theme
  const density = Math.max(effects.particleDensity, 0.55)

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
      data-time={timeOfDay}
      data-weather={weather}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={`${timeOfDay}-${weather}-base`}
          className="absolute inset-0"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.7 }}
          style={{
            background: `
              radial-gradient(ellipse 80% 55% at 70% 10%, ${colors.accentGlow}, transparent 55%),
              radial-gradient(ellipse 60% 45% at 15% 80%, ${colors.secondaryGlow}, transparent 50%),
              linear-gradient(180deg, ${colors.skyTop} 0%, ${colors.skyMid} 48%, ${colors.skyBottom} 100%)
            `,
            filter: `brightness(var(--atm-brightness, 1))`,
          }}
        />
      </AnimatePresence>

      <div className="absolute inset-0" style={{ background: colors.overlay }} />

      {reducedMotion ? (
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, transparent 0%, ${colors.vignette} 100%),
              radial-gradient(ellipse at 50% 0%, ${colors.accentGlow}, transparent 60%)
            `,
          }}
        />
      ) : null}

      {/* Effects above sky, below vignette — AnimatePresence for weather switches */}
      <div className="absolute inset-0 z-[1]">
        <AnimatePresence mode="sync">
          {effects.showSunGlow ? (
            <EffectShell
              effectKey={`sun-${weather}`}
              reducedMotion={reducedMotion}
            >
              <SunGlow reducedMotion={reducedMotion} />
            </EffectShell>
          ) : null}

          {effects.showClouds ? (
            <EffectShell
              effectKey={`clouds-${weather}`}
              reducedMotion={reducedMotion}
            >
              <CloudHaze
                opacity={effects.hazeOpacity}
                reducedMotion={reducedMotion}
              />
            </EffectShell>
          ) : null}

          {effects.showRain && !reducedMotion ? (
            <EffectShell effectKey={`rain-${weather}`} reducedMotion={false}>
              <RainStreaks density={density} reducedMotion={false} />
            </EffectShell>
          ) : null}

          {effects.showSnow ? (
            <EffectShell
              effectKey={`snow-${weather}`}
              reducedMotion={reducedMotion}
            >
              <SnowParticles density={density} reducedMotion={reducedMotion} />
            </EffectShell>
          ) : null}

          {effects.showWind && !reducedMotion ? (
            <EffectShell effectKey={`wind-${weather}`} reducedMotion={false}>
              <WindMist density={density} reducedMotion={false} />
            </EffectShell>
          ) : null}
        </AnimatePresence>
      </div>

      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: `radial-gradient(ellipse at center, transparent 45%, ${colors.vignette} 100%)`,
        }}
      />

      <div className="atm-grain absolute inset-0 z-[3] opacity-[0.035]" />
    </div>
  )
}
