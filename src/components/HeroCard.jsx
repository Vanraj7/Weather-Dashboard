import { getWeatherInfo } from '../utils/weatherCodes'
import { formatTemp, formatDate, getWindDirection } from '../utils/formatters'

export default function HeroCard({ current, cityInfo, unit }) {
  const c    = current.current
  const info = getWeatherInfo(c.weather_code)
  const now  = new Date()

  return (
    <div className="hero-card">
      <div className="hero-left">
        <div className="hero-location">
          <span className="hero-pin">⊙</span>
          <div>
            <div className="hero-city">{cityInfo.name}</div>
            {cityInfo.country && <div className="hero-country">{cityInfo.country}</div>}
          </div>
        </div>

        <div className="hero-temp-row">
          <div className="hero-temp">{formatTemp(c.temperature_2m, unit)}</div>
          <div className="hero-icon-big">{info.icon}</div>
        </div>

        <div className="hero-condition">{info.label}</div>
        <div className="hero-feels">Feels like {formatTemp(c.apparent_temperature, unit)}</div>
        <div className="hero-date">{formatDate(now.toISOString())}</div>
      </div>

      <div className="hero-right">
        <div className="hero-stat-grid">
          <StatBox icon="💧" label="Humidity"    value={`${c.relative_humidity_2m}%`} />
          <StatBox icon="🌬" label="Wind"
            value={`${Math.round(c.wind_speed_10m)} km/h ${getWindDirection(c.wind_direction_10m)}`} />
          <StatBox icon="🌡" label="Pressure"    value={`${Math.round(c.surface_pressure)} hPa`} />
          <StatBox icon="☀️" label="UV Index"    value={c.uv_index ?? '—'} />
          <StatBox icon="👁" label="Visibility"
            value={c.visibility ? `${Math.round(c.visibility / 1000)} km` : '—'} />
          <StatBox icon="🌧" label="Precip."     value={`${c.precipitation ?? 0} mm`} />
        </div>
      </div>
    </div>
  )
}

function StatBox({ icon, label, value }) {
  return (
    <div className="stat-box">
      <div className="stat-icon">{icon}</div>
      <div className="stat-val">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}