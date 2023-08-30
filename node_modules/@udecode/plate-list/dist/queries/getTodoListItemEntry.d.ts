import { PlateEditor, TElementEntry, Value } from '@udecode/plate-common';
import { Location } from 'slate';
/**
 * Returns the nearest li and ul / ol wrapping node entries for a given path (default = selection)
 */
export declare const getTodoListItemEntry: <V extends Value>(editor: PlateEditor<V>, { at }?: {
    at?: Location | null | undefined;
}) => {
    list: TElementEntry;
    listItem: TElementEntry;
} | undefined;
//# sourceMappingURL=getTodoListItemEntry.d.ts.map