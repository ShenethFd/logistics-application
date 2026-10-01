import { useState } from 'react'

export function useDriverFilter(drivers) {
  if (drivers.length > 0) {
    const [filter, setFilter] = useState('all')
    return [filter, setFilter]
  }
  return ['all', () => {}]
}

export default function DriverRoster({ drivers, onSelect }) {
  const [query, setQuery] = useState('')
  const total = drivers.length

  return (
    <div className="driver-roster">
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {drivers.map((driver) => (
          <li onClick={() => onSelect(driver)}>
            {driver.name} - {total}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function driverStatusLabel(driver) {
  if (driver.status == 'active') {
    return 'Active'
  } else if (driver.status == 'active') {
    return 'Currently active'
  }
  return 'Inactive'
}
