import { useEffect, useState } from 'react'
import { TIME_RANGES } from '../config/themeConfig'

/**
 * Derive time-of-day from a Date (local clock).
 * @param {Date} [date]
 * @returns {'morning'|'afternoon'|'evening'|'night'}
 */
export function getTimeOfDay(date = new Date()) {
  const hour = date.getHours()
  for (const range of TIME_RANGES) {
    if (hour >= range.start && hour < range.end) {
      return range.id
    }
  }
  return 'night'
}

/**
 * Tracks local time-of-day and optional override for previews.
 * Architecture accepts normalized timeOfDay values for the theme system.
 */
export function useThemeMode(options = {}) {
  const { override = null } = options
  const [detected, setDetected] = useState(() => getTimeOfDay())
  const [manualOverride, setManualOverride] = useState(override)

  useEffect(() => {
    const sync = () => setDetected(getTimeOfDay())
    sync()

    const intervalId = window.setInterval(sync, 60_000)
    const onVisibility = () => {
      if (document.visibilityState === 'visible') sync()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.clearInterval(intervalId)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const timeOfDay = manualOverride ?? detected

  return {
    timeOfDay,
    detectedTimeOfDay: detected,
    isOverridden: manualOverride != null,
    setTimeOfDayOverride: setManualOverride,
    clearTimeOfDayOverride: () => setManualOverride(null),
  }
}
