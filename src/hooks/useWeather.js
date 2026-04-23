import { useState, useCallback } from 'react'

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast'

export function useWeather() {
  const [weather, setWeather]   = useState(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const [cityInfo, setCityInfo] = useState(null)

  const fetchWeather = useCallback(async (lat, lon, name, country) => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        latitude:  lat,
        longitude: lon,
        current: [
          'temperature_2m','relative_humidity_2m','apparent_temperature',
          'weather_code','wind_speed_10m','wind_direction_10m',
          'surface_pressure','visibility','uv_index','precipitation'
        ].join(','),
        hourly: [
          'temperature_2m','weather_code','precipitation_probability',
          'wind_speed_10m'
        ].join(','),
        daily: [
          'weather_code','temperature_2m_max','temperature_2m_min',
          'precipitation_sum','precipitation_probability_max',
          'wind_speed_10m_max','sunrise','sunset','uv_index_max'
        ].join(','),
        timezone: 'auto',
        forecast_days: 7,
      })

      const res  = await fetch(`${WEATHER_URL}?${params}`)
      if (!res.ok) throw new Error('Weather fetch failed')
      const data = await res.json()

      setWeather(data)
      setCityInfo({ name, country, lat, lon })
    } catch (e) {
      setError(e.message || 'Failed to fetch weather')
    } finally {
      setLoading(false)
    }
  }, [])

  const searchCity = useCallback(async (query) => {
    if (!query.trim()) return []
    try {
      const res  = await fetch(`${GEO_URL}?name=${encodeURIComponent(query)}&count=6&language=en`)
      const data = await res.json()
      return data.results || []
    } catch {
      return []
    }
  }, [])

  const fetchByCoords = useCallback((lat, lon) => {
    fetchWeather(lat, lon, 'Current Location', '')
  }, [fetchWeather])

  return { weather, loading, error, cityInfo, fetchWeather, searchCity, fetchByCoords }
}