/// <reference types="react" />
import { EElement, TElement, Value } from '@udecode/slate';
import { RenderElementProps } from 'slate-react';
export declare type TRenderElementProps<V extends Value = Value, N extends TElement = EElement<V>> = Omit<RenderElementProps, 'element'> & {
    element: N;
};
export declare type RenderElementFn<V extends Value = Value> = (props: TRenderElementProps<V>) => JSX.Element;
//# sourceMappingURL=TRenderElementProps.d.ts.map