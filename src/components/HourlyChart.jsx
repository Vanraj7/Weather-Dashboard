import { useEffect, useRef } from 'react'
import { formatTemp, formatHour } from '../utils/formatters'
import { getWeatherInfo } from '../utils/weatherCodes'

export default function HourlyChart({ hourly, unit }) {
  const canvasRef = useRef(null)

  // Take next 24 hours
  const now   = new Date()
  const start = hourly.time.findIndex(t => new Date(t) >= now)
  const times  = hourly.time.slice(start, start + 24)
  const temps  = hourly.temperature_2m.slice(start, start + 24)
  const prec   = hourly.precipitation_probability.slice(start, start + 24)
  const codes  = hourly.weather_code.slice(start, start + 24)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !temps.length) return
    const dpr = window.devicePixelRatio || 1
    const W   = canvas.offsetWidth
    const H   = canvas.offsetHeight
    canvas.width  = W * dpr
    canvas.height = H * dpr
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, W, H)

    const PAD  = { top: 20, bot: 30, left: 10, right: 10 }
    const minT = Math.min(...temps) - 2
    const maxT = Math.max(...temps) + 2
    const rangeT = maxT - minT
    const count = temps.length

    function xPos(i) { return PAD.left + (i / (count - 1)) * (W - PAD.left - PAD.right) }
    function yPos(t) { return PAD.top + (1 - (t - minT) / rangeT) * (H - PAD.top - PAD.bot) }

    // Rain bars
    prec.forEach((p, i) => {
      if (!p) return
      const x    = xPos(i)
      const barH = ((p / 100) * (H - PAD.top - PAD.bot)) * 0.45
      ctx.fillStyle = `rgba(96,165,250,${p / 100 * 0.35})`
      ctx.fillRect(x - 8, H - PAD.bot - barH, 16, barH)
    })

    // Temp area fill
    const grad = ctx.createLinearGradient(0, PAD.top, 0, H - PAD.bot)
    grad.addColorStop(0, 'rgba(251,191,36,0.35)')
    grad.addColorStop(1, 'rgba(251,191,36,0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.moveTo(xPos(0), H - PAD.bot)
    temps.forEach((t, i) => ctx.lineTo(xPos(i), yPos(t)))
    ctx.lineTo(xPos(count - 1), H - PAD.bot)
    ctx.closePath()
    ctx.fill()

    // Temp line
    ctx.strokeStyle = 'rgba(251,191,36,0.9)'
    ctx.lineWidth   = 2
    ctx.lineJoin    = 'round'
    ctx.beginPath()
    temps.forEach((t, i) => i === 0 ? ctx.moveTo(xPos(i), yPos(t)) : ctx.lineTo(xPos(i), yPos(t)))
    ctx.stroke()

    // Dots + labels every 3 hours
    temps.forEach((t, i) => {
      if (i % 3 !== 0) return
      const x = xPos(i), y = yPos(t)
      ctx.fillStyle = '#fbbf24'
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.font      = '10px system-ui'
      ctx.textAlign = 'center'
      ctx.fillText(unit === 'C' ? `${Math.round(t)}°` : `${Math.round(t * 9/5 + 32)}°`, x, y - 8)
    })
  }, [temps, prec, unit])

  return (
    <div className="section-card">
      <div className="section-header">
        <span className="section-title">24-Hour Forecast</span>
      </div>

      {/* Scrollable icon row */}
      <div className="hourly-icons-scroll">
        {times.map((t, i) => (
          <div key={i} className="hourly-col">
            <div className="hourly-time">{i === 0 ? 'Now' : formatHour(t)}</div>
            <div className="hourly-icon">{getWeatherInfo(codes[i]).icon}</div>
            <div className="hourly-temp">{formatTemp(temps[i], unit)}</div>
            {prec[i] > 0 && <div className="hourly-rain">{prec[i]}%</div>}
          </div>
        ))}
      </div>

      {/* Chart */}
      <canvas ref={canvasRef} style={{ width: '100%', height: '110px', display: 'block' }} />
    </div>
  )
}