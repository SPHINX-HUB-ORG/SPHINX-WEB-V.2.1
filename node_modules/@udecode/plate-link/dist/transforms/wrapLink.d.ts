import { PlateEditor, Value, WrapNodesOptions } from '@udecode/plate-common';
export interface WrapLinkOptions<V extends Value = Value> extends WrapNodesOptions<V> {
    url: string;
    target?: string;
}
/**
 * Wrap a link node with split.
 */
export declare const wrapLink: <V extends Value>(editor: PlateEditor<V>, { url, target, ...options }: WrapLinkOptions<V>) => void;
//# sourceMappingURL=wrapLink.d.ts.map