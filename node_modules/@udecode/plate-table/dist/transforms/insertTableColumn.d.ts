import { PlateEditor, Value } from '@udecode/plate-common';
import { Path } from 'slate';
export declare const insertTableColumn: <V extends Value>(editor: PlateEditor<V>, { disableSelect, fromCell, at, header, }?: {
    header?: boolean | undefined;
    /**
     * Path of the cell to insert the column from.
     */
    fromCell?: Path | undefined;
    /**
     * Exact path of the cell to insert the column at.
     * Will overrule `fromCell`.
     */
    at?: Path | undefined;
    /**
     * Disable selection after insertion.
     */
    disableSelect?: boolean | undefined;
}) => void;
//# sourceMappingURL=insertTableColumn.d.ts.map