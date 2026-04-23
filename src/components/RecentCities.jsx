export default function RecentCities({ cities, onSelect }) {
  if (!cities.length) return null
  return (
    <div className="recent-wrap">
      <span className="recent-label">Recent:</span>
      {cities.map((c, i) => (
        <button
          key={i}
          className="recent-chip"
          onClick={() => onSelect(c.lat, c.lon, c.name, c.country)}
        >
          {c.name}
        </button>
      ))}
    </div>
  )
}