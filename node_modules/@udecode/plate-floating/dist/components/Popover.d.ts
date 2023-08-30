import { ReactNode } from 'react';
import { HTMLPropsAs } from '@udecode/plate-common';
import { UseFloatingProps } from '../libs/floating-ui';
export interface PopoverProps extends HTMLPropsAs<'div'> {
    floatingOptions?: Partial<UseFloatingProps>;
    disabled?: boolean;
    content?: ReactNode;
    children: JSX.Element;
}
/**
 * Popover displayed over children, rendering `content`
 */
export declare const Popover: ({ floatingOptions, children, content, ...props }: PopoverProps) => JSX.Element;
//# sourceMappingURL=Popover.d.ts.map