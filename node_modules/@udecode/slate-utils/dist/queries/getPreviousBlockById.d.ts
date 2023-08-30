import { QueryNodeOptions, TEditor, TNodeEntry, Value } from '@udecode/slate';
/**
 * Find the block before a block by id.
 * If not found, find the first block by id and return [null, its previous path]
 */
export declare const getPreviousBlockById: <N extends import("@udecode/slate").ElementOf<TEditor<V>>, V extends Value = Value>(editor: TEditor<V>, id: string, query?: QueryNodeOptions | undefined) => TNodeEntry<N> | undefined;
//# sourceMappingURL=getPreviousBlockById.d.ts.map