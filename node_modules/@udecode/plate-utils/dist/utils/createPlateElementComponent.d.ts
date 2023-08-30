import { ElementType } from 'react';
import { TElement, Value } from '@udecode/slate';
import { UseElementPropsOptions } from '../hooks';
import { As } from '../types';
export declare type CreatePlateElementComponentOptions<T extends TElement = TElement, A extends As = 'div'> = {
    as?: ElementType;
} & Pick<UseElementPropsOptions<T, A>, 'elementToAttributes'>;
/**
 * Create the top-level React component for a Slate element.
 */
export declare const createPlateElementComponent: <T extends TElement = TElement, A extends As<any> = "div">({ as, elementToAttributes, }?: CreatePlateElementComponentOptions<T, A>) => import("../types").Component<import("@udecode/plate-core").PlateRenderNodeProps<Value, import("@udecode/plate-core").PlateEditor<Value>> & Omit<import("slate-react").RenderElementProps, "element"> & {
    element: T;
} & import("../types").AsProps<any> & {
    [index: `data-${string}`]: unknown;
    wrapElement?: import("../types").WrapElement | undefined;
    children?: import("../types").Children<any>;
} & Omit<import("react").ComponentPropsWithRef<NonNullable<A>>, "children" | keyof import("../types").AsProps<T_1>>>;
//# sourceMappingURL=createPlateElementComponent.d.ts.map