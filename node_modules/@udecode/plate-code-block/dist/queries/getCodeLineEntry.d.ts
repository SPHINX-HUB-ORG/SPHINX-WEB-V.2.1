import { PlateEditor, Value } from '@udecode/plate-common';
import { Location } from 'slate';
/**
 * If at (default = selection) is in ul>li>p, return li and ul node entries.
 */
export declare const getCodeLineEntry: <N extends import("@udecode/plate-common").ElementOf<import("@udecode/plate-common").TEditor<V>>, V extends Value = Value>(editor: PlateEditor<V>, { at }?: {
    at?: Location | null | undefined;
}) => {
    codeBlock: import("@udecode/plate-common").TNodeEntry<N>;
    codeLine: import("@udecode/plate-common").TNodeEntry<N>;
} | undefined;
//# sourceMappingURL=getCodeLineEntry.d.ts.map