import { QueryEditorOptions, TEditor, Value } from '@udecode/slate';
/**
 * Query the editor state.
 */
export declare const queryEditor: <V extends Value = Value, E extends TEditor<V> = TEditor<V>>(editor: E, { filter, selectionAtBlockStart, selectionAtBlockEnd, allow, exclude, at, }?: QueryEditorOptions<V, E>) => boolean;
//# sourceMappingURL=queryEditor.d.ts.map