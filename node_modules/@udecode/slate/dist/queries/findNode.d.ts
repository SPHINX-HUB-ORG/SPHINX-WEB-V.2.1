import { ENode, GetNodeEntriesOptions, TEditor, TNodeEntry, Value } from '../interfaces';
export declare type FindNodeOptions<V extends Value = Value> = GetNodeEntriesOptions<V>;
/**
 * Find node matching the condition.
 */
export declare const findNode: <N extends ENode<V>, V extends Value = Value>(editor: TEditor<V>, options?: FindNodeOptions<V>) => TNodeEntry<N> | undefined;
//# sourceMappingURL=findNode.d.ts.map