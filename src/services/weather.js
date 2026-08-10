import { WEATHER_OPTIONS } from '../config/themeConfig'

const CACHE_KEY = 'portfolio-live-weather-v1'
const CACHE_TTL_MS = 30 * 60 * 1000
const WINDY_THRESHOLD_KMH = 28

/**
 * Map Open-Meteo WMO weather codes + wind into theme weather tokens.
 * @param {number} code
 * @param {number} [windSpeedKmh]
 * @returns {'sunny'|'cloudy'|'rainy'|'windy'|'snowy'}
 */
export function normalizeWeatherCode(code, windSpeedKmh = 0) {
  const snow = new Set([71, 73, 75, 77, 85, 86])
  const rain = new Set([
    51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99,
  ])

  if (snow.has(code)) return 'snowy'
  if (rain.has(code)) return 'rainy'
  if (windSpeedKmh >= WINDY_THRESHOLD_KMH && [0, 1, 2, 3, 45, 48].includes(code)) {
    return 'windy'
  }
  if (code === 0 || code === 1) return 'sunny'
  return 'cloudy'
}

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (
      !parsed?.weather ||
      !WEATHER_OPTIONS.includes(parsed.weather) ||
      typeof parsed.fetchedAt !== 'number' ||
      typeof parsed.temperatureC !== 'number' ||
      !Number.isFinite(parsed.temperatureC)
    ) {
      return null
    }
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null
    return parsed
  } catch {
    return null
  }
}

function writeCache(payload) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload))
  } catch {
    /* ignore */
  }
}

function getBrowserPosition(timeoutMs = 6000) {
  if (!navigator.geolocation) {
    return Promise.reject(new Error('Geolocation unavailable'))
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: timeoutMs,
      maximumAge: 15 * 60 * 1000,
    })
  })
}

async function getIpFallbackCoords() {
  const res = await fetch('https://get.geojs.io/v1/ip/geo.json')
  if (!res.ok) throw new Error('IP geolocation failed')
  const data = await res.json()
  const latitude = Number(data.latitude)
  const longitude = Number(data.longitude)
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    throw new Error('Invalid IP coordinates')
  }
  return {
    latitude,
    longitude,
    placeLabel: [data.city, data.region, data.country].filter(Boolean).join(', '),
    source: 'ip',
  }
}

async function reverseGeocode(latitude, longitude) {
  try {
    const url = new URL(
      'https://api.bigdatacloud.net/data/reverse-geocode-client',
    )
    url.searchParams.set('latitude', String(latitude))
    url.searchParams.set('longitude', String(longitude))
    url.searchParams.set('localityLanguage', 'en')
    const res = await fetch(url)
    if (!res.ok) return ''
    const data = await res.json()
    return [data.city || data.locality, data.principalSubdivision, data.countryName]
      .filter(Boolean)
      .join(', ')
  } catch {
    return ''
  }
}

async function resolveCoords() {
  try {
    const position = await getBrowserPosition()
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const placeLabel = await reverseGeocode(latitude, longitude)
    return {
      latitude,
      longitude,
      placeLabel,
      source: 'browser',
    }
  } catch {
    return getIpFallbackCoords()
  }
}

/**
 * Resolve visitor location + current weather for atmosphere themes.
 * Uses browser geolocation when allowed, otherwise IP-based coords.
 * Weather comes from Open-Meteo (no API key; CORS-friendly for static hosting).
 */
export async function fetchLiveAtmosphere() {
  const cached = readCache()
  if (cached) return cached

  const coords = await resolveCoords()
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', String(coords.latitude))
  url.searchParams.set('longitude', String(coords.longitude))
  url.searchParams.set('current', 'weather_code,wind_speed_10m,temperature_2m')
  url.searchParams.set('timezone', 'auto')
  url.searchParams.set('wind_speed_unit', 'kmh')

  const res = await fetch(url)
  if (!res.ok) throw new Error('Weather request failed')

  const data = await res.json()
  const code = Number(data?.current?.weather_code)
  const wind = Number(data?.current?.wind_speed_10m ?? 0)
  const temperatureC = Number(data?.current?.temperature_2m)
  if (!Number.isFinite(code)) throw new Error('Missing weather code')

  const weather = normalizeWeatherCode(code, wind)
  const payload = {
    weather,
    placeLabel: coords.placeLabel,
    latitude: coords.latitude,
    longitude: coords.longitude,
    locationSource: coords.source,
    timezone: data.timezone ?? null,
    temperatureC: Number.isFinite(temperatureC) ? temperatureC : null,
    fetchedAt: Date.now(),
  }

  writeCache(payload)
  return payload
}
