import { PlateEditor, Value } from '@udecode/plate-common';
import { TablePlugin } from '../types';
export interface GetEmptyCellNodeOptions extends TablePlugin {
    /**
     * Header cell
     */
    header?: boolean;
}
export declare const getEmptyCellNode: <V extends Value>(editor: PlateEditor<V>, { header, newCellChildren }: GetEmptyCellNodeOptions) => {
    type: string;
    children: import("@udecode/plate-common").TDescendant[];
};
//# sourceMappingURL=getEmptyCellNode.d.ts.map