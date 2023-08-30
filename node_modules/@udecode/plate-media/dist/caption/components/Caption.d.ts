import { HTMLPropsAs } from '@udecode/plate-common';
export interface CaptionProps extends HTMLPropsAs<'figcaption'> {
    readOnly?: boolean;
}
export declare const useCaption: ({ readOnly, ...props }?: CaptionProps) => HTMLPropsAs<'figcaption'>;
export declare const useCaptionState: (props: CaptionProps) => {
    captionString: string;
    selected: boolean;
    readOnly: boolean;
};
export declare const CaptionRoot: import("@udecode/plate-common").Component<CaptionProps>;
export declare const Caption: {
    Root: import("@udecode/plate-common").Component<CaptionProps>;
    Textarea: import("@udecode/plate-common").Component<import("./CaptionTextarea").CaptionTextareaProps>;
};
//# sourceMappingURL=Caption.d.ts.map