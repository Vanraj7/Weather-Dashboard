import { getWeatherInfo } from '../utils/weatherCodes'
import { formatTemp, formatDay } from '../utils/formatters'

export default function SevenDayForecast({ daily, unit }) {
  const days   = daily.time
  const maxT   = daily.temperature_2m_max
  const minT   = daily.temperature_2m_min
  const codes  = daily.weather_code
  const rain   = daily.precipitation_probability_max
  const absMax = Math.max(...maxT)
  const absMin = Math.min(...minT)
  const range  = absMax - absMin || 1

  return (
    <div className="section-card">
      <div className="section-header">
        <span className="section-title">7-Day Forecast</span>
      </div>
      <div className="forecast-list">
        {days.map((day, i) => {
          const info   = getWeatherInfo(codes[i])
          const barL   = ((minT[i] - absMin) / range) * 100
          const barW   = ((maxT[i] - minT[i]) / range) * 100

          return (
            <div key={day} className={`forecast-row ${i === 0 ? 'forecast-today' : ''}`}>
              <div className="forecast-day">{i === 0 ? 'Today' : formatDay(day, true)}</div>
              <div className="forecast-icon">{info.icon}</div>
              <div className="forecast-condition">{info.label}</div>
              {rain[i] > 0 && (
                <div className="forecast-rain">💧 {rain[i]}%</div>
              )}
              <div className="forecast-bar-wrap">
                <span className="forecast-min">{formatTemp(minT[i], unit)}</span>
                <div className="forecast-bar-track">
                  <div
                    className="forecast-bar-fill"
                    style={{ marginLeft: `${barL}%`, width: `${barW}%` }}
                  />
                </div>
                <span className="forecast-max">{formatTemp(maxT[i], unit)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}