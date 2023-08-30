import { PlateEditor, Value } from '@udecode/plate-common';
/**
 * Selection table:
 * - If anchor is in table, focus in a block before: set focus to start of table
 * - If anchor is in table, focus in a block after: set focus to end of table
 * - If focus is in table, anchor in a block before: set focus to end of table
 * - If focus is in table, anchor in a block after: set focus to the point before start of table
 */
export declare const withSelectionTable: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(editor: E) => E;
//# sourceMappingURL=withSelectionTable.d.ts.map