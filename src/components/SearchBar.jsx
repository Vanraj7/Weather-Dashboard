import { useState, useRef, useEffect } from 'react'

export default function SearchBar({ onSearch, onLocate, searching }) {
  const [query, setQuery]         = useState('')
  const [results, setResults]     = useState([])
  const [open, setOpen]           = useState(false)
  const [loadingGeo, setLoadingGeo] = useState(false)
  const debounceRef = useRef(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  async function handleInput(e) {
    const val = e.target.value
    setQuery(val)
    clearTimeout(debounceRef.current)
    if (!val.trim()) { setResults([]); setOpen(false); return }
    debounceRef.current = setTimeout(async () => {
      const res = await searching(val)
      setResults(res)
      setOpen(res.length > 0)
    }, 350)
  }

  function handleSelect(r) {
    setQuery(r.name)
    setResults([])
    setOpen(false)
    onSearch(r.latitude, r.longitude, r.name, r.country || '')
  }

  async function handleLocate() {
    setLoadingGeo(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => { onLocate(pos.coords.latitude, pos.coords.longitude); setLoadingGeo(false) },
      ()    => { alert('Location access denied.'); setLoadingGeo(false) }
    )
  }

  return (
    <div className="search-wrap" ref={wrapRef}>
      <div className="search-bar">
        <span className="search-icon">⌕</span>
        <input
          value={query}
          onChange={handleInput}
          placeholder="Search city — Mumbai, Delhi, London…"
          onFocus={() => results.length && setOpen(true)}
          onKeyDown={e => e.key === 'Escape' && setOpen(false)}
        />
        <button
          className="locate-btn"
          onClick={handleLocate}
          title="Use my location"
          disabled={loadingGeo}
        >
          {loadingGeo ? '…' : '◎'}
        </button>
      </div>

      {open && results.length > 0 && (
        <div className="search-dropdown">
          {results.map((r, i) => (
            <button key={i} className="search-result" onClick={() => handleSelect(r)}>
              <span className="result-name">{r.name}</span>
              <span className="result-sub">
                {[r.admin1, r.country].filter(Boolean).join(', ')}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}