import { motion, useReducedMotion } from 'framer-motion'
import { Cloud, CloudRain, CloudSnow, Sun, Wind } from 'lucide-react'

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  windy: Wind,
  snowy: CloudSnow,
}

const weatherLabels = {
  sunny: 'Clear',
  cloudy: 'Cloudy',
  rainy: 'Rain',
  windy: 'Windy',
  snowy: 'Snow',
}

const timeLabels = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
  night: 'Night',
}

/**
 * Compact weather / time / date widget integrated into the hero.
 * Pulses briefly when weather or time-of-day changes.
 */
export default function WeatherWidget({
  timeOfDay,
  weather,
  placeLabel = '',
  status = 'ready',
  temperatureC = null,
  date = new Date(),
}) {
  const prefersReduced = useReducedMotion()
  const Icon = weatherIcons[weather] ?? Cloud
  const dateLabel = date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
  const timeLabel = date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  })
  const temperatureValue = Number(temperatureC)
  const hasTemperature = Number.isFinite(temperatureValue) && temperatureValue !== 0
  const temperatureLabel = hasTemperature
    ? `${Math.round(temperatureValue)}°C`
    : ''
  const subtitleParts = [timeLabel, dateLabel, placeLabel].filter(Boolean)
  const subtitle = subtitleParts.length
    ? subtitleParts.join(' · ')
    : status === 'loading'
      ? 'Detecting local weather…'
      : ''

  return (
    <motion.aside
      key={`${weather}-${timeOfDay}-${placeLabel}`}
      className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-sm text-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-md"
      aria-label={`Local atmosphere: ${weatherLabels[weather]}, ${timeLabels[timeOfDay]}, ${subtitle}`}
      initial={prefersReduced ? false : { opacity: 0.5, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={
        prefersReduced
          ? { duration: 0.01 }
          : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
      }
    >
      <motion.span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/15 text-blue-300"
        initial={prefersReduced ? false : { scale: 0.85, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={
          prefersReduced
            ? { duration: 0.01 }
            : { type: 'spring', stiffness: 380, damping: 22 }
        }
      >
        <Icon size={14} aria-hidden strokeWidth={1.75} />
      </motion.span>
      <span className="flex flex-col leading-tight">
        <span className="text-xs font-medium text-slate-200">
          {weatherLabels[weather]} · {timeLabels[timeOfDay]}
          {temperatureLabel ? ` · ${temperatureLabel}` : ''}
        </span>
        <span className="text-[11px] text-slate-500">{subtitle}</span>
      </span>
    </motion.aside>
  )
}
