import { useSyncExternalStore } from 'react'
import { monthOf } from './months.js'

/* global __BUILD_DATE__ */

const subscribe = () => () => {}

// Same approach as useYearsOfExperience: the prerendered HTML uses the build month and the
// browser switches to the current one after hydration, so "Present" jobs stay up to date
export function useCurrentMonth() {
  return useSyncExternalStore(
    subscribe,
    () => monthOf(new Date()),
    () => monthOf(new Date(__BUILD_DATE__)),
  )
}
