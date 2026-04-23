import { formatTime } from '../utils/formatters'

export default function SunriseSunset({ daily }) {
  const sunrise = formatTime(daily.sunrise[0])
  const sunset  = formatTime(daily.sunset[0])

  return (
    <div className="section-card sunrise-sunset">
      <div className="section-header">
        <span className="section-title">Sunrise & Sunset</span>
      </div>
      <div className="sr-grid">
        <div className="sr-item">
          <div className="sr-icon">🌅</div>
          <div className="sr-time">{sunrise}</div>
          <div className="sr-label">Sunrise</div>
        </div>
        <div className="sr-item">
          <div className="sr-icon">🌇</div>
          <div className="sr-time">{sunset}</div>
          <div className="sr-label">Sunset</div>
        </div>
      </div>
    </div>
  )
}
