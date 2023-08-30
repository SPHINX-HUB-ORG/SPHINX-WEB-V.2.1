import { PlateEditor, Value } from '@udecode/plate-common';
import { Path } from 'slate';
export declare const insertTableRow: <V extends Value>(editor: PlateEditor<V>, { header, fromRow, at, disableSelect, }?: {
    header?: boolean | undefined;
    fromRow?: Path | undefined;
    /**
     * Exact path of the row to insert the column at.
     * Will overrule `fromRow`.
     */
    at?: Path | undefined;
    disableSelect?: boolean | undefined;
}) => void;
//# sourceMappingURL=insertTableRow.d.ts.map