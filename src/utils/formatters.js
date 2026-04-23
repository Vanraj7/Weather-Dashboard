export function formatTemp(temp, unit = 'C') {
  const t = Math.round(temp)
  return unit === 'C' ? `${t}°C` : `${Math.round(t * 9 / 5 + 32)}°F`
}

export function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: true
  })
}

export function formatDay(isoString, short = false) {
  return new Date(isoString).toLocaleDateString('en-IN', {
    weekday: short ? 'short' : 'long'
  })
}

export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

export function formatHour(isoString) {
  return new Date(isoString).toLocaleTimeString('en-IN', {
    hour: 'numeric', hour12: true
  })
}

export function getWindDirection(deg) {
  const dirs = ['N','NE','E','SE','S','SW','W','NW']
  return dirs[Math.round(deg / 45) % 8]
}