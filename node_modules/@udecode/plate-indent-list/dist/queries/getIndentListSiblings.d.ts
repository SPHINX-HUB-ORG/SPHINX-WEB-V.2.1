import { EElement, EElementEntry, TEditor, TNodeEntry, Value } from '@udecode/plate-common';
import { GetSiblingIndentListOptions } from './getSiblingIndentList';
export interface GetIndentListSiblingsOptions<N extends EElement<V>, V extends Value = Value> extends Partial<GetSiblingIndentListOptions<N, V>> {
    previous?: boolean;
    current?: boolean;
    next?: boolean;
}
export declare const getIndentListSiblings: <N extends import("@udecode/plate-common").ElementOf<TEditor<V>>, V extends Value = Value>(editor: TEditor<V>, entry: EElementEntry<V>, { previous, current, next, ...options }?: GetIndentListSiblingsOptions<N, V>) => TNodeEntry<import("@udecode/plate-common").TNode>[];
//# sourceMappingURL=getIndentListSiblings.d.ts.map