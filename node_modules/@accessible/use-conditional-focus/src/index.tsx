import * as React from 'react'
import tabbable from '@accessible/tabbable'
import useEvent from '@react-hook/event'

function useConditionalFocus<T extends Window>(
  target: T | null,
  shouldFocus?: boolean,
  options?: UseConditionalFocusOptions
): void
function useConditionalFocus<T extends Document>(
  target: T | null,
  shouldFocus?: boolean,
  options?: UseConditionalFocusOptions
): void
function useConditionalFocus<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  shouldFocus?: boolean,
  options?: UseConditionalFocusOptions
): void
function useConditionalFocus(
  target: any,
  shouldFocus = false,
  {includeRoot, preventScroll} = defaultOptions
) {
  const didFocus = React.useRef(false)
  const didFocusAfterEvent = React.useRef(false)

  React.useEffect(() => {
    const element = target && 'current' in target ? target.current : target
    if (!element || !shouldFocus || didFocus.current) return
    const tabbableEls = tabbable(element, includeRoot)
    if (tabbableEls.length > 0) tabbableEls[0].focus({preventScroll})
    didFocus.current = true
  }, [target, includeRoot, preventScroll, shouldFocus])

  React.useEffect(() => {
    return () => {
      didFocus.current = false
      didFocusAfterEvent.current = false
    }
  }, [shouldFocus])

  useEvent(target, 'transitionend', () => {
    const element = target && 'current' in target ? target.current : target
    if (!element || !shouldFocus || didFocusAfterEvent.current) return
    const tabbableEls = tabbable(element, includeRoot)
    if (tabbableEls.length > 0) tabbableEls[0].focus({preventScroll})
    didFocusAfterEvent.current = true
  })
}

const defaultOptions: UseConditionalFocusOptions = {
  includeRoot: false,
  preventScroll: false,
}

export type UseConditionalFocusOptions = {
  includeRoot?: boolean
  preventScroll?: boolean
}

export default useConditionalFocus
