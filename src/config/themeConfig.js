/**
 * Theme configuration — derives atmospheric visuals from normalized
 * { timeOfDay, weather } values. Base identity stays premium blue + black.
 */

export const TIME_OF_DAY_OPTIONS = ['morning', 'afternoon', 'evening', 'night']
export const WEATHER_OPTIONS = ['sunny', 'cloudy', 'rainy', 'windy', 'snowy']

/** Local-clock ranges used by useThemeMode */
export const TIME_RANGES = [
  { id: 'night', start: 0, end: 5 },
  { id: 'morning', start: 5, end: 12 },
  { id: 'afternoon', start: 12, end: 17 },
  { id: 'evening', start: 17, end: 21 },
  { id: 'night', start: 21, end: 24 },
]

const timeLighting = {
  morning: {
    skyTop: '#0a1628',
    skyMid: '#122038',
    skyBottom: '#0b1220',
    accentGlow: 'rgba(96, 165, 250, 0.22)',
    secondaryGlow: 'rgba(147, 197, 253, 0.12)',
    vignette: 'rgba(0, 0, 0, 0.35)',
    lightAngle: '135deg',
    ambientBrightness: 1.08,
  },
  afternoon: {
    skyTop: '#07101f',
    skyMid: '#0c1a30',
    skyBottom: '#080e18',
    accentGlow: 'rgba(59, 130, 246, 0.28)',
    secondaryGlow: 'rgba(37, 99, 235, 0.14)',
    vignette: 'rgba(0, 0, 0, 0.4)',
    lightAngle: '180deg',
    ambientBrightness: 1.12,
  },
  evening: {
    skyTop: '#060b16',
    skyMid: '#0a1426',
    skyBottom: '#050810',
    accentGlow: 'rgba(96, 165, 250, 0.18)',
    secondaryGlow: 'rgba(129, 140, 248, 0.1)',
    vignette: 'rgba(0, 0, 0, 0.5)',
    lightAngle: '210deg',
    ambientBrightness: 0.95,
  },
  night: {
    skyTop: '#03060d',
    skyMid: '#070d18',
    skyBottom: '#02040a',
    accentGlow: 'rgba(59, 130, 246, 0.14)',
    secondaryGlow: 'rgba(30, 64, 175, 0.1)',
    vignette: 'rgba(0, 0, 0, 0.62)',
    lightAngle: '160deg',
    ambientBrightness: 0.85,
  },
}

const weatherModifiers = {
  sunny: {
    glowBoost: 1.45,
    hazeOpacity: 0.1,
    particleDensity: 0,
    shadowSoftness: 1.1,
    motionIntensity: 0.7,
    overlay: 'rgba(147, 197, 253, 0.05)',
  },
  cloudy: {
    glowBoost: 0.8,
    hazeOpacity: 0.34,
    particleDensity: 0,
    shadowSoftness: 1.25,
    motionIntensity: 0.6,
    overlay: 'rgba(100, 116, 139, 0.1)',
  },
  rainy: {
    glowBoost: 0.55,
    hazeOpacity: 0.2,
    particleDensity: 0.95,
    shadowSoftness: 1.4,
    motionIntensity: 0.9,
    overlay: 'rgba(30, 58, 138, 0.12)',
  },
  windy: {
    glowBoost: 0.9,
    hazeOpacity: 0.14,
    particleDensity: 0.85,
    shadowSoftness: 1.15,
    motionIntensity: 1,
    overlay: 'rgba(148, 163, 184, 0.08)',
  },
  snowy: {
    glowBoost: 0.9,
    hazeOpacity: 0.24,
    particleDensity: 0.9,
    shadowSoftness: 1.35,
    motionIntensity: 0.65,
    overlay: 'rgba(186, 230, 253, 0.07)',
  },
}

/**
 * @param {'morning'|'afternoon'|'evening'|'night'} timeOfDay
 * @param {'sunny'|'cloudy'|'rainy'|'windy'|'snowy'} weather
 */
export function getAtmosphereTheme(timeOfDay, weather) {
  const lighting = timeLighting[timeOfDay] ?? timeLighting.evening
  const weatherFx = weatherModifiers[weather] ?? weatherModifiers.cloudy

  const glowAlpha = (base) => {
    const match = base.match(/[\d.]+\)$/)
    if (!match) return base
    const alpha = parseFloat(match[0])
    const boosted = Math.min(alpha * weatherFx.glowBoost, 0.45)
    return base.replace(/[\d.]+\)$/, `${boosted})`)
  }

  return {
    timeOfDay,
    weather,
    colors: {
      skyTop: lighting.skyTop,
      skyMid: lighting.skyMid,
      skyBottom: lighting.skyBottom,
      accentGlow: glowAlpha(lighting.accentGlow),
      secondaryGlow: glowAlpha(lighting.secondaryGlow),
      vignette: lighting.vignette,
      overlay: weatherFx.overlay,
    },
    lighting: {
      angle: lighting.lightAngle,
      ambientBrightness: lighting.ambientBrightness * (weather === 'sunny' ? 1.05 : 1),
      shadowSoftness: weatherFx.shadowSoftness,
    },
    effects: {
      hazeOpacity: weatherFx.hazeOpacity,
      particleDensity: weatherFx.particleDensity,
      motionIntensity: weatherFx.motionIntensity,
      showSunGlow: weather === 'sunny',
      showClouds: weather === 'cloudy' || weather === 'rainy' || weather === 'snowy',
      showRain: weather === 'rainy',
      showSnow: weather === 'snowy',
      showWind: weather === 'windy',
    },
    cssVars: {
      '--atm-sky-top': lighting.skyTop,
      '--atm-sky-mid': lighting.skyMid,
      '--atm-sky-bottom': lighting.skyBottom,
      '--atm-accent-glow': glowAlpha(lighting.accentGlow),
      '--atm-secondary-glow': glowAlpha(lighting.secondaryGlow),
      '--atm-vignette': lighting.vignette,
      '--atm-overlay': weatherFx.overlay,
      '--atm-brightness': String(
        lighting.ambientBrightness * (weather === 'sunny' ? 1.05 : 1),
      ),
      '--atm-motion': String(weatherFx.motionIntensity),
    },
  }
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]
