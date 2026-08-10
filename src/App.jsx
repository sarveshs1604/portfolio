import { useEffect, useMemo, useState } from 'react'
import { getAtmosphereTheme } from './config/themeConfig'
import { useThemeMode } from './hooks/useThemeMode'
import { useWeather } from './hooks/useWeather'
import { useReducedMotion } from './hooks/useReducedMotion'
import AtmosphereLayer from './components/background/AtmosphereLayer'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/hero/Hero'
import About from './components/about/About'
import Experience from './components/experience/Experience'
import Skills from './components/skills/Skills'
import Projects from './components/projects/Projects'
import Certifications from './components/certifications/Certifications'
import Achievements from './components/achievements/Achievements'
import Contact from './components/contact/Contact'
import AtmospherePreviewPanel from './components/ui/AtmospherePreviewPanel'

export default function App() {
  const {
    timeOfDay,
    detectedTimeOfDay,
    isOverridden,
    setTimeOfDayOverride,
    clearTimeOfDayOverride,
  } = useThemeMode()
  const { weather, setWeather, clearManualWeather, isManual, placeLabel, status, temperatureC } =
    useWeather({ source: 'api' })
  const reducedMotion = useReducedMotion()
  const [tabHidden, setTabHidden] = useState(false)

  useEffect(() => {
    const sync = () => setTabHidden(document.visibilityState === 'hidden')
    sync()
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [])

  const theme = useMemo(
    () => getAtmosphereTheme(timeOfDay, weather),
    [timeOfDay, weather],
  )

  return (
    <div
      className={`relative min-h-svh text-slate-100${tabHidden ? ' atm-paused' : ''}`}
      style={theme.cssVars}
      data-reduced-motion={reducedMotion ? 'true' : 'false'}
    >
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <AtmosphereLayer theme={theme} reducedMotion={reducedMotion} />
      <Navbar />

      <main id="main-content">
        <Hero
          timeOfDay={timeOfDay}
          weather={weather}
          placeLabel={placeLabel}
          weatherStatus={status}
          temperatureC={temperatureC}
        />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Achievements />
        <Contact />
      </main>

      <Footer />

      {import.meta.env.DEV ? (
        <AtmospherePreviewPanel
          weather={weather}
          setWeather={setWeather}
          clearManualWeather={clearManualWeather}
          isWeatherManual={isManual}
          timeOfDay={timeOfDay}
          detectedTimeOfDay={detectedTimeOfDay}
          setTimeOfDayOverride={setTimeOfDayOverride}
          clearTimeOfDayOverride={clearTimeOfDayOverride}
          isTimeOverridden={isOverridden}
        />
      ) : null}
    </div>
  )
}
