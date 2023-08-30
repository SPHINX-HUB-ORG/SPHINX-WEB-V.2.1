import { TEditor, Value } from './TEditor';
/**
 * Add a custom property to the leaf text nodes in the current selection.
 *
 * If the selection is currently collapsed, the marks will be added to the
 * `editor.marks` property instead, and applied when text is inserted next.
 */
export declare const addMark: <V extends Value>(editor: TEditor<V>, key: string, value: any) => void;
//# sourceMappingURL=addMark.d.ts.map