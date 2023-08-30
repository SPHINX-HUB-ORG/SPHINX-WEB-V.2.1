import { RefAttributes, RefObject } from 'react';
import { TextareaAutosizeProps } from 'react-textarea-autosize';
import { AsProps } from '@udecode/plate-common';
export interface CaptionTextareaProps extends TextareaAutosizeProps, RefAttributes<HTMLTextAreaElement>, AsProps<'textarea'> {
}
/**
 * Focus textareaRef when focusCaptionPath is set to the image path.
 */
export declare const useCaptionTextareaFocus: (textareaRef: RefObject<HTMLTextAreaElement>) => void;
export declare const useCaptionTextarea: (props: CaptionTextareaProps) => TextareaAutosizeProps & RefAttributes<HTMLTextAreaElement>;
export declare const CaptionTextarea: import("@udecode/plate-common").Component<CaptionTextareaProps>;
//# sourceMappingURL=CaptionTextarea.d.ts.map