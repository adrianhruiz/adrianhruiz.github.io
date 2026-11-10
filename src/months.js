// Helpers for "YYYY-MM" months, the format used for dates in src/data/

const NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const toIndex = (month) => {
  const [year, number] = month.split('-').map(Number)
  return year * 12 + number - 1
}

export const monthOf = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

export const formatMonth = (month) => {
  const [year, number] = month.split('-').map(Number)
  return `${NAMES[number - 1]} ${year}`
}

// Length of a job counting both the first and the last month, as LinkedIn does: "5 yrs 5 mos"
export function formatDuration(start, end) {
  const months = Math.max(1, toIndex(end) - toIndex(start) + 1)
  const years = Math.floor(months / 12)
  const rest = months % 12
  const parts = []
  if (years) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`)
  if (rest) parts.push(`${rest} ${rest === 1 ? 'mo' : 'mos'}`)
  return parts.join(' ')
}
