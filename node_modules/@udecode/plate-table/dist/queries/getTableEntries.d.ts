import { PlateEditor, Value } from '@udecode/plate-common';
import { Location } from 'slate';
/**
 * If at (default = selection) is in table>tr>td|th,
 * return table, row, and cell node entries.
 */
export declare const getTableEntries: <V extends Value>(editor: PlateEditor<V>, { at }?: {
    at?: Location | null | undefined;
}) => {
    table: import("@udecode/plate-common").TNodeEntry<import("@udecode/plate-common").AncestorOf<import("@udecode/plate-common").TEditor<V>>>;
    row: import("@udecode/plate-common").TNodeEntry<import("@udecode/plate-common").AncestorOf<import("@udecode/plate-common").TEditor<V>>>;
    cell: import("@udecode/plate-common").TNodeEntry<import("@udecode/plate-common").ENode<V>>;
} | undefined;
//# sourceMappingURL=getTableEntries.d.ts.map