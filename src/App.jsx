import { useEffect } from 'react'
import { useWeather } from './hooks/useWeather'
import { useLocalStorage } from './hooks/useLocalStorage'
import { getWeatherInfo, BG_THEMES } from './utils/weatherCodes'

import SearchBar       from './components/SearchBar'
import RecentCities    from './components/RecentCities'
import HeroCard        from './components/HeroCard'
import HourlyChart     from './components/HourlyChart'
import SevenDayForecast from './components/SevenDayForecast'
import SunriseSunset   from './components/SunriseSunset'
import UnitToggle      from './components/UnitToggle'

export default function App() {
  const { weather, loading, error, cityInfo, fetchWeather, searchCity, fetchByCoords } = useWeather()
  const [unit, setUnit]         = useLocalStorage('wx_unit', 'C')
  const [recent, setRecent]     = useLocalStorage('wx_recent', [])

  // Load default city on mount
  useEffect(() => {
    if (recent.length > 0) {
      const r = recent[0]
      fetchWeather(r.lat, r.lon, r.name, r.country)
    } else {
      // Default: Mumbai
      fetchWeather(19.076, 72.877, 'Mumbai', 'India')
    }
  }, [])

  function handleSearch(lat, lon, name, country) {
    fetchWeather(lat, lon, name, country)
    setRecent(prev => {
      const filtered = prev.filter(c => c.name !== name)
      return [{ lat, lon, name, country }, ...filtered].slice(0, 5)
    })
  }

  function handleLocate(lat, lon) {
    fetchByCoords(lat, lon)
  }

  // Determine bg theme
  const bgTheme = weather
    ? BG_THEMES[getWeatherInfo(weather.current.weather_code).bg]
    : BG_THEMES.cloudy

  const isDay = weather ? (() => {
    const now  = Date.now()
    const rise = new Date(weather.daily.sunrise[0]).getTime()
    const set  = new Date(weather.daily.sunset[0]).getTime()
    return now >= rise && now <= set
  })() : true

  return (
    <div
      className="app-root"
      style={{
        '--accent':   bgTheme.accent,
        '--bg-from':  bgTheme.from,
        '--bg-via':   bgTheme.via,
      }}
    >
      {/* Animated sky background */}
      <div className="sky-bg">
        <div className="sky-orb orb1" />
        <div className="sky-orb orb2" />
        <div className="sky-orb orb3" />
        {isDay && <div className="sun-glow" />}
      </div>

      <div className="app-content">
        {/* ── HEADER ── */}
        <header className="app-header">
          <div className="brand">
            <span className="brand-icon">⛅</span>
            <div>
              <div className="brand-name">Nimbus</div>
              <div className="brand-sub">Weather Dashboard</div>
            </div>
          </div>
          <div className="header-right">
            <UnitToggle unit={unit} setUnit={setUnit} />
          </div>
        </header>

        {/* ── SEARCH ── */}
        <div className="search-section">
          <SearchBar
            onSearch={handleSearch}
            onLocate={handleLocate}
            searching={searchCity}
          />
          <RecentCities cities={recent} onSelect={handleSearch} />
        </div>

        {/* ── STATES ── */}
        {loading && (
          <div className="state-wrap">
            <div className="spinner" />
            <p className="state-text">Fetching weather…</p>
          </div>
        )}

        {error && !loading && (
          <div className="state-wrap">
            <div className="error-icon">⚠️</div>
            <p className="state-text">{error}</p>
            <button className="retry-btn" onClick={() => cityInfo && fetchWeather(cityInfo.lat, cityInfo.lon, cityInfo.name, cityInfo.country)}>
              Retry
            </button>
          </div>
        )}

        {/* ── MAIN DASHBOARD ── */}
        {weather && !loading && (
          <div className="dashboard">
            {/* Row 1: Hero */}
            <HeroCard
              current={weather}
              cityInfo={cityInfo}
              unit={unit}
            />

            {/* Row 2: Hourly chart */}
            <HourlyChart hourly={weather.hourly} unit={unit} />

            {/* Row 3: 7-day + Sunrise */}
            <div className="bottom-grid">
              <SevenDayForecast daily={weather.daily} unit={unit} />
              <SunriseSunset daily={weather.daily} />
            </div>
          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {!weather && !loading && !error && (
          <div className="state-wrap">
            <div className="empty-icon">🌍</div>
            <p className="state-text">Search for a city to get started</p>
          </div>
        )}

        <footer className="app-footer">
          Weather data by <a href="https://open-meteo.com" target="_blank" rel="noreferrer">Open-Meteo</a>
          &nbsp;·&nbsp; Geocoding by <a href="https://open-meteo.com" target="_blank" rel="noreferrer">Open-Meteo GEO</a>
          &nbsp;·&nbsp; Free & open-source ✦
        </footer>
      </div>
    </div>
  )
}