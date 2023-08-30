/// <reference types="react" />
import { AsProps } from '@udecode/plate-common';
import { ResizeLength } from '@udecode/resizable';
export interface ResizableProps extends AsProps<'div'> {
    /**
     * Node alignment.
     */
    align?: 'left' | 'center' | 'right';
    readOnly?: boolean;
    minWidth?: ResizeLength;
    maxWidth?: ResizeLength;
    renderHandleLeft?: (props: AsProps<'div'>) => JSX.Element;
    renderHandleRight?: (props: AsProps<'div'>) => JSX.Element;
}
export declare const useResizable: ({ align, readOnly, minWidth, maxWidth, renderHandleLeft, renderHandleRight, ...props }: ResizableProps) => {
    wrapperProps: AsProps<"div">;
    resizableProps: AsProps<"div">;
    handleLeft: false | JSX.Element | undefined;
    handleRight: false | JSX.Element | undefined;
    restProps: {
        as?: "div" | undefined;
        asAlias?: "div" | undefined;
    };
};
export declare const Resizable: import("@udecode/plate-common").Component<ResizableProps>;
//# sourceMappingURL=Resizable.d.ts.map