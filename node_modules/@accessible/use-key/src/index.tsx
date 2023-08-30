import * as React from 'react'
import useEvent from '@react-hook/event'

export function useKey<T extends Window>(
  target: T | null,
  listeners: Record<string, (event: KeyboardEvent) => any>
): void
export function useKey<T extends Document>(
  target: T | null,
  listeners: Record<string, (event: KeyboardEvent) => any>
): void
export function useKey<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  listeners: Record<string, (event: KeyboardEvent) => any>
): void
export function useKey(
  target: any,
  listeners: Record<string, (event: KeyboardEvent) => any>
) {
  useEvent(target, 'keydown', (event): void => {
    const listener = listeners[LEGACY_COMPAT[event.key] || event.key]
    if (listener) listener(event)
  })
}

// IE 11 and some versions of Edge have non-standard value
const LEGACY_COMPAT: Record<string, string> = {
  Up: 'ArrowUp',
  Right: 'ArrowRight',
  Down: 'ArrowDown',
  Left: 'ArrowLeft',
  Esc: 'Escape',
  Spacebar: ' ',
  Del: 'Delete',
  Crsel: 'CrSel',
  Exsel: 'ExSel',
  Add: '+',
  Subtract: '-',
  Multiply: '*',
  Divide: '/',
  Decimal: '.',
  Scroll: 'ScrollLock',
}

export default useKey
