import { EElementEntry, TEditor, TNodeEntry, Value } from '@udecode/plate-common';
import { GetSiblingIndentListOptions } from './getSiblingIndentList';
/**
 * Get the next indent list.
 */
export declare const getNextIndentList: <N extends import("@udecode/plate-common").ElementOf<TEditor<V>>, V extends Value = Value>(editor: TEditor<V>, entry: EElementEntry<V>, options?: Partial<GetSiblingIndentListOptions<N, V>> | undefined) => TNodeEntry<N> | undefined;
//# sourceMappingURL=getNextIndentList.d.ts.map