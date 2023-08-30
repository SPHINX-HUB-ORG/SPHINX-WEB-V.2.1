import { EElementEntry, TEditor, TNodeEntry, Value } from '@udecode/plate-common';
import { GetSiblingIndentListOptions } from './getSiblingIndentList';
/**
 * Get the previous indent list node.
 */
export declare const getPreviousIndentList: <N extends import("@udecode/plate-common").ElementOf<TEditor<V>>, V extends Value = Value>(editor: TEditor<V>, entry: EElementEntry<V>, options?: Partial<GetSiblingIndentListOptions<N, V>> | undefined) => TNodeEntry<N> | undefined;
//# sourceMappingURL=getPreviousIndentList.d.ts.map