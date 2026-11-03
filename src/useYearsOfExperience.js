import { useSyncExternalStore } from 'react'
import { yearsSince } from './yearsSince.js'

/* global __BUILD_DATE__ */

const subscribe = () => () => {}

// The prerendered HTML carries the value at build time (server snapshot); the browser
// reads today's date after hydration, so it stays right without redeploying
export function useYearsOfExperience(start) {
  return useSyncExternalStore(
    subscribe,
    () => yearsSince(start, new Date()),
    () => yearsSince(start, new Date(__BUILD_DATE__)),
  )
}
