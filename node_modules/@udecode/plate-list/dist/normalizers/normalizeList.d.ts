import { PlateEditor, TNodeEntry, Value } from '@udecode/plate-common';
import { ListPlugin } from '../types';
/**
 * Normalize list node to force the ul>li>p+ul structure.
 */
export declare const normalizeList: <V extends Value>(editor: PlateEditor<V>, { validLiChildrenTypes }: ListPlugin) => ([node, path]: TNodeEntry<import("@udecode/plate-common").TNode>) => void;
//# sourceMappingURL=normalizeList.d.ts.map