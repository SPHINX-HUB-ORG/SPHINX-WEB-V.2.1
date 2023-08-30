import { PlateEditor, Value } from '@udecode/plate-common';
import { GetEmptyCellNodeOptions } from './getEmptyCellNode';
export interface GetEmptyRowNodeOptions extends GetEmptyCellNodeOptions {
    colCount?: number;
}
export declare const getEmptyRowNode: <V extends Value>(editor: PlateEditor<V>, { colCount, ...options }?: GetEmptyRowNodeOptions) => {
    type: string;
    children: {
        type: string;
        children: import("@udecode/plate-common").TDescendant[];
    }[];
};
//# sourceMappingURL=getEmptyRowNode.d.ts.map