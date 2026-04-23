import { useState } from 'react'

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initial
    } catch { return initial }
  })

  const set = (val) => {
    const next = typeof val === 'function' ? val(value) : val
    setValue(next)
    localStorage.setItem(key, JSON.stringify(next))
  }

  return [value, set]
}