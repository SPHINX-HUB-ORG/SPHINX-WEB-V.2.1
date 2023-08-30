import { CSSProperties, MutableRefObject } from 'react';
import { ClientRectObject } from '@floating-ui/core';
import { ReferenceType, UseFloatingProps, UseFloatingReturn, VirtualElement } from '../libs/floating-ui';
export interface UseVirtualFloatingOptions extends Partial<UseFloatingProps> {
    getBoundingClientRect?: () => ClientRectObject;
    open?: boolean;
}
export interface UseVirtualFloatingReturn<RT extends ReferenceType = ReferenceType> extends UseFloatingReturn<RT> {
    virtualElementRef: MutableRefObject<VirtualElement>;
    style: CSSProperties;
}
/**
 * `useFloating` with a controlled virtual element. Used to follow cursor position.
 *
 * Default options:
 * - `whileElementsMounted: autoUpdate`
 *
 * Additional options:
 * - `getBoundingClientRect` to get the bounding client rect.
 * - `hidden` to hide the floating element
 *
 * Additional returns:
 * - `style` to apply to the floating element
 * - `virtualElementRef`
 *
 * @see useFloating
 * @see https://floating-ui.com/docs/react-dom#virtual-element
 */
export declare const useVirtualFloating: <RT extends ReferenceType = ReferenceType>({ getBoundingClientRect, ...floatingOptions }: UseVirtualFloatingOptions) => UseVirtualFloatingReturn<RT>;
//# sourceMappingURL=useVirtualFloating.d.ts.map