import { PlateEditor, Value } from '@udecode/plate-common';
import { Path } from 'slate';
import { TTableCellElement } from '../types';
export declare const getTopTableCell: <V extends Value>(editor: PlateEditor<V>, { at: cellPath, }?: {
    at?: Path;
}) => import("@udecode/plate-common").TNodeEntry<TTableCellElement> | undefined;
//# sourceMappingURL=getTopTableCell.d.ts.map