import * as React from 'react'
export declare function useKey<T extends Window>(
  target: T | null,
  listeners: Record<string, (event: KeyboardEvent) => any>
): void
export declare function useKey<T extends Document>(
  target: T | null,
  listeners: Record<string, (event: KeyboardEvent) => any>
): void
export declare function useKey<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  listeners: Record<string, (event: KeyboardEvent) => any>
): void
export default useKey
