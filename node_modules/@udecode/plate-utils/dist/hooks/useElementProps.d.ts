import { PlateRenderElementProps } from '@udecode/plate-core';
import { TElement } from '@udecode/slate';
import { As, HTMLPropsAs } from '../types';
export declare type UseElementPropsOptions<T extends TElement = TElement, A extends As = 'div'> = {
    /**
     * Get HTML attributes from Slate element. Alternative to `PlatePlugin.props`.
     */
    elementToAttributes?: (element: T) => Partial<HTMLPropsAs<A>>;
} & PlateRenderElementProps & HTMLPropsAs<A>;
/**
 * Get root element props for Slate element.
 */
export declare const useElementProps: <T extends TElement = TElement, A extends As<any> = "div">({ attributes, nodeProps, element, editor, elementToAttributes, ...props }: UseElementPropsOptions<T, A>) => HTMLPropsAs<A>;
//# sourceMappingURL=useElementProps.d.ts.map