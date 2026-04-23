export const WMO_CODES = {
  0:  { label: 'Clear Sky',          icon: '☀️',  bg: 'sunny' },
  1:  { label: 'Mainly Clear',       icon: '🌤️', bg: 'sunny' },
  2:  { label: 'Partly Cloudy',      icon: '⛅',  bg: 'cloudy' },
  3:  { label: 'Overcast',           icon: '☁️',  bg: 'cloudy' },
  45: { label: 'Foggy',              icon: '🌫️', bg: 'cloudy' },
  48: { label: 'Icy Fog',            icon: '🌫️', bg: 'cloudy' },
  51: { label: 'Light Drizzle',      icon: '🌦️', bg: 'rainy' },
  53: { label: 'Drizzle',            icon: '🌦️', bg: 'rainy' },
  55: { label: 'Heavy Drizzle',      icon: '🌧️', bg: 'rainy' },
  61: { label: 'Light Rain',         icon: '🌧️', bg: 'rainy' },
  63: { label: 'Rain',               icon: '🌧️', bg: 'rainy' },
  65: { label: 'Heavy Rain',         icon: '🌧️', bg: 'rainy' },
  71: { label: 'Light Snow',         icon: '🌨️', bg: 'snowy' },
  73: { label: 'Snow',               icon: '❄️',  bg: 'snowy' },
  75: { label: 'Heavy Snow',         icon: '❄️',  bg: 'snowy' },
  80: { label: 'Rain Showers',       icon: '🌦️', bg: 'rainy' },
  81: { label: 'Heavy Showers',      icon: '🌧️', bg: 'rainy' },
  95: { label: 'Thunderstorm',       icon: '⛈️',  bg: 'stormy' },
  96: { label: 'Thunderstorm + Hail',icon: '⛈️',  bg: 'stormy' },
  99: { label: 'Severe Thunderstorm',icon: '🌩️', bg: 'stormy' },
}

export function getWeatherInfo(code) {
  return WMO_CODES[code] || { label: 'Unknown', icon: '🌡️', bg: 'cloudy' }
}

export const BG_THEMES = {
  sunny:  { from: '#0f2027', via: '#1a3a5c', accent: '#f59e0b' },
  cloudy: { from: '#1a1a2e', via: '#2d3561', accent: '#94a3b8' },
  rainy:  { from: '#0f2027', via: '#203a43', accent: '#60a5fa' },
  snowy:  { from: '#1a2433', via: '#2d4a6b', accent: '#bae6fd' },
  stormy: { from: '#0d0d1a', via: '#1a1a3e', accent: '#a78bfa' },
}