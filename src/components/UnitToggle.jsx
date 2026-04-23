export default function UnitToggle({ unit, setUnit }) {
  return (
    <div className="unit-toggle">
      <button
        className={`unit-btn ${unit === 'C' ? 'active' : ''}`}
        onClick={() => setUnit('C')}
      >°C</button>
      <button
        className={`unit-btn ${unit === 'F' ? 'active' : ''}`}
        onClick={() => setUnit('F')}
      >°F</button>
    </div>
  )
}