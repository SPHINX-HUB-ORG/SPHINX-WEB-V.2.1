import { GetAboveNodeOptions, TEditor, TNodeEntry, Value } from '@udecode/slate';
/**
 * Get the edge blocks above a location (default: selection).
 */
export declare const getEdgeBlocksAbove: <N1 extends import("@udecode/slate").AncestorOf<TEditor<V>>, N2 extends import("@udecode/slate").AncestorOf<TEditor<V>> = N1, V extends Value = Value>(editor: TEditor<V>, { at: _at, ...options }?: GetAboveNodeOptions<V>) => [TNodeEntry<N1>, TNodeEntry<N2>] | null;
//# sourceMappingURL=getEdgeBlocksAbove.d.ts.map