/// <reference types="react" />
import { HTMLPropsAs, PlateRenderElementProps, Value } from '@udecode/plate-common';
import { TMediaElement } from './types';
export declare type MediaRootProps = PlateRenderElementProps<Value, TMediaElement> & HTMLPropsAs<'div'> & {
    pluginKey?: string;
};
export declare const useMedia: ({ pluginKey, ...props }: MediaRootProps) => HTMLPropsAs<'iframe'>;
export declare const MediaRoot: import("@udecode/plate-common").Component<import("@udecode/plate-common").PlateRenderNodeProps<Value, import("@udecode/plate-common").PlateEditor<Value>> & Omit<import("slate-react").RenderElementProps, "element"> & {
    element: TMediaElement;
} & import("@udecode/plate-common").AsProps<any> & {
    [index: `data-${string}`]: unknown;
    wrapElement?: import("@udecode/plate-common").WrapElement | undefined;
    children?: import("@udecode/plate-common").Children<any>;
} & Omit<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof import("react").HTMLAttributes<HTMLDivElement>> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, "children" | keyof import("@udecode/plate-common").AsProps<T>>>;
export declare const Media: {
    Root: import("@udecode/plate-common").Component<import("@udecode/plate-common").PlateRenderNodeProps<Value, import("@udecode/plate-common").PlateEditor<Value>> & Omit<import("slate-react").RenderElementProps, "element"> & {
        element: TMediaElement;
    } & import("@udecode/plate-common").AsProps<any> & {
        [index: `data-${string}`]: unknown;
        wrapElement?: import("@udecode/plate-common").WrapElement | undefined;
        children?: import("@udecode/plate-common").Children<any>;
    } & Omit<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof import("react").HTMLAttributes<HTMLDivElement>> & {
        ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
    }, "children" | keyof import("@udecode/plate-common").AsProps<T>>>;
    Resizable: import("@udecode/plate-common").Component<import("../resizable/Resizable").ResizableProps>;
};
//# sourceMappingURL=Media.d.ts.map