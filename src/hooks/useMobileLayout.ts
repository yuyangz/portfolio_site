import { useSyncExternalStore } from 'react'

/** Matches `Layout.css` — coarse pointer or typical phone viewport + no hover */
export const MOBILE_LAYOUT_QUERY =
  '(pointer: coarse), ((hover: none) and (max-width: 932px))'

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
