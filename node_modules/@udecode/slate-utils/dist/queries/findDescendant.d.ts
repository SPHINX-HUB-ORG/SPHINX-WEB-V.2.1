/**
 * Iterate through all of the nodes in the editor and return the first match. If
 * no match is found, return undefined.
 */
import { FindNodeOptions, TEditor, TNodeEntry, Value } from '@udecode/slate';
/**
 * Get the first descendant node matching the condition.
 */
export declare const findDescendant: <N extends import("@udecode/slate").DescendantOf<TEditor<V>>, V extends Value = Value>(editor: TEditor<V>, options: FindNodeOptions<V>) => TNodeEntry<N> | undefined;
//# sourceMappingURL=findDescendant.d.ts.map