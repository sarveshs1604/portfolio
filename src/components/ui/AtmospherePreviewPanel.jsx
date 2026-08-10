import { useState } from 'react'
import { CloudSun, ChevronDown } from 'lucide-react'
import {
  TIME_OF_DAY_OPTIONS,
  WEATHER_OPTIONS,
} from '../../config/themeConfig'

/**
 * Development mock panel to preview every weather × time combination.
 * Keeps the theme contract: normalized { timeOfDay, weather }.
 */
export default function AtmospherePreviewPanel({
  weather,
  setWeather,
  clearManualWeather,
  isWeatherManual,
  timeOfDay,
  detectedTimeOfDay,
  setTimeOfDayOverride,
  clearTimeOfDayOverride,
  isTimeOverridden,
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-[60] max-w-[min(100vw-2rem,20rem)]">
      <button
        type="button"
        className="ml-auto flex items-center gap-2 rounded-full border border-white/15 bg-[#0a1424]/90 px-3.5 py-2 text-xs font-medium text-slate-200 shadow-lg backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
        aria-expanded={open}
        aria-controls="atmosphere-preview-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <CloudSun size={14} aria-hidden />
        Atmosphere preview
        <ChevronDown
          size={14}
          aria-hidden
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open ? (
        <div
          id="atmosphere-preview-panel"
          className="mt-2 rounded-2xl border border-white/10 bg-[#0a1424]/95 p-4 shadow-2xl backdrop-blur-xl"
          role="region"
          aria-label="Mock weather and time controls"
        >
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
            Dev preview · live weather on when hosted
          </p>

          <fieldset className="mt-3">
            <legend className="text-xs font-medium text-slate-300">Weather</legend>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {WEATHER_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setWeather(option)}
                  className={[
                    'rounded-full px-2.5 py-1 text-xs capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70',
                    weather === option && isWeatherManual
                      ? 'bg-blue-500/30 text-blue-100 border border-blue-400/40'
                      : 'bg-white/5 text-slate-400 border border-white/10 hover:text-slate-200',
                  ].join(' ')}
                  aria-pressed={weather === option && isWeatherManual}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={clearManualWeather}
              className="mt-2 text-xs text-slate-500 underline-offset-2 hover:text-slate-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 rounded"
            >
              Use live weather{!isWeatherManual ? ' (active)' : ''}
            </button>
          </fieldset>

          <fieldset className="mt-4">
            <legend className="text-xs font-medium text-slate-300">Time of day</legend>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {TIME_OF_DAY_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTimeOfDayOverride(option)}
                  className={[
                    'rounded-full px-2.5 py-1 text-xs capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70',
                    timeOfDay === option && isTimeOverridden
                      ? 'bg-blue-500/30 text-blue-100 border border-blue-400/40'
                      : 'bg-white/5 text-slate-400 border border-white/10 hover:text-slate-200',
                  ].join(' ')}
                  aria-pressed={timeOfDay === option && isTimeOverridden}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={clearTimeOfDayOverride}
              className="mt-2 text-xs text-slate-500 underline-offset-2 hover:text-slate-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 rounded"
            >
              Use local clock ({detectedTimeOfDay})
            </button>
          </fieldset>

          <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
            Active: {weather} {timeOfDay}
            {!isTimeOverridden ? ' (auto)' : ''}
          </p>
        </div>
      ) : null}
    </div>
  )
}
