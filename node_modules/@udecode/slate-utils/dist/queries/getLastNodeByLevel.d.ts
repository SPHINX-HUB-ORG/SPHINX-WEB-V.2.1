import { EElementOrText, TEditor, TNodeEntry, Value } from '@udecode/slate';
/**
 * Get the last node at a given level.
 */
export declare const getLastNodeByLevel: <N extends EElementOrText<V>, V extends Value = Value>(editor: TEditor<V>, level: number) => TNodeEntry<N> | undefined;
//# sourceMappingURL=getLastNodeByLevel.d.ts.map