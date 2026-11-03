// Whole years elapsed since a "YYYY-MM" start month, counted as full months / 12
export function yearsSince(start, now) {
  const [year, month] = start.split('-').map(Number)
  const months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month)
  return Math.max(0, Math.floor(months / 12))
}
