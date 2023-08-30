import { GetAboveNodeOptions, TEditor, Value } from '@udecode/slate';
/**
 * Get the block above a location (default: selection).
 */
export declare const getBlockAbove: <N extends import("@udecode/slate").AncestorOf<TEditor<V>>, V extends Value = Value>(editor: TEditor<V>, options?: GetAboveNodeOptions<V>) => import("@udecode/slate").TNodeEntry<N> | undefined;
//# sourceMappingURL=getBlockAbove.d.ts.map