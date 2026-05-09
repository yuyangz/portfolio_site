import { useSyncExternalStore } from 'react'

/** Matches `Layout.css` touch-mobile block — `(pointer: coarse)` avoids treating narrow desktop windows as mobile */
export const MOBILE_LAYOUT_QUERY = '(max-width: 640px) and (pointer: coarse)'

function getMq() {
  return window.matchMedia(MOBILE_LAYOUT_QUERY)
}

function subscribe(onChange: () => void) {
  const mq = getMq()
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

function getSnapshot() {
  return getMq().matches
}

function getServerSnapshot() {
  return false
}

export function useMobileLayout(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
