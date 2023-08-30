import { PlateEditor, Value } from '@udecode/plate-common';
import { Location } from 'slate';
/**
 * Move selection by cell unit.
 */
export declare const moveSelectionFromCell: <V extends Value = Value>(editor: PlateEditor<V>, { at, reverse, edge, fromOneCell, }?: {
    at?: Location | undefined;
    /**
     * false: move selection to cell below
     * true: move selection to cell above
     */
    reverse?: boolean | undefined;
    /**
     * Expand cell selection to an edge.
     */
    edge?: "top" | "right" | "bottom" | "left" | undefined;
    /**
     * Move selection from one selected cell
     */
    fromOneCell?: boolean | undefined;
}) => true | undefined;
//# sourceMappingURL=moveSelectionFromCell.d.ts.map