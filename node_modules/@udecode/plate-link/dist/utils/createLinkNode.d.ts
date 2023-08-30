import { PlateEditor, TText, Value } from '@udecode/plate-common';
import { TLinkElement } from '../types';
export interface CreateLinkNodeOptions {
    url: string;
    text?: string;
    target?: string;
    children?: TText[];
}
export declare const createLinkNode: <V extends Value>(editor: PlateEditor<V>, { url, text, target, children }: CreateLinkNodeOptions) => TLinkElement;
//# sourceMappingURL=createLinkNode.d.ts.map