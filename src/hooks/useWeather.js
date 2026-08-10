import { useCallback, useEffect, useState } from 'react'
import { WEATHER_OPTIONS } from '../config/themeConfig'
import { fetchLiveAtmosphere } from '../services/weather'

const MANUAL_KEY = 'portfolio-manual-weather-v2'

function readManualWeather() {
  try {
    const value = localStorage.getItem(MANUAL_KEY)
    if (value && WEATHER_OPTIONS.includes(value)) return value
  } catch {
    /* ignore */
  }
  return null
}

/**
 * Live weather for atmosphere themes.
 * Fetches visitor location + Open-Meteo conditions on mount.
 * Manual overrides (preview panel) still work and persist locally.
 */
export function useWeather(options = {}) {
  const { initialWeather = null, source = 'api' } = options
  const manual = readManualWeather()
  const [weather, setWeatherState] = useState(
    () => initialWeather ?? manual ?? 'cloudy',
  )
  const [status, setStatus] = useState(
    source === 'api' && !manual && !initialWeather ? 'loading' : 'ready',
  )
  const [placeLabel, setPlaceLabel] = useState('')
  const [temperatureC, setTemperatureC] = useState(initialWeather?.temperatureC ?? null)
  const [isManual, setIsManual] = useState(() => Boolean(manual))

  const setWeather = useCallback((next) => {
    if (!WEATHER_OPTIONS.includes(next)) return
    setWeatherState(next)
    setIsManual(true)
    setStatus('ready')
    try {
      localStorage.setItem(MANUAL_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const clearManualWeather = useCallback(() => {
    setIsManual(false)
    setStatus('loading')
    try {
      localStorage.removeItem(MANUAL_KEY)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    if (source !== 'api' || isManual || initialWeather) return

    let cancelled = false

    ;(async () => {
      setStatus('loading')
      try {
        const live = await fetchLiveAtmosphere()
        if (cancelled) return
        setWeatherState(live.weather)
        setPlaceLabel(live.placeLabel || '')
        setTemperatureC(Number.isFinite(live.temperatureC) ? live.temperatureC : null)
        setStatus('ready')
      } catch {
        if (cancelled) return
        setStatus('fallback')
      }
    })()

    return () => {
      cancelled = true
    }
  }, [source, isManual, initialWeather])

  return {
    weather,
    setWeather,
    clearManualWeather,
    options: WEATHER_OPTIONS,
    source,
    status,
    placeLabel,
    temperatureC,
    isMock: source === 'mock',
    isManual,
  }
}
