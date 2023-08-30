import { EElementEntry, TEditor, TNodeEntry, Value } from '@udecode/plate-common';
import { GetSiblingIndentListOptions } from '../queries/getSiblingIndentList';
export declare const normalizeNextIndentListStart: <V extends Value>(editor: TEditor<V>, entry: TNodeEntry<import("@udecode/plate-common").TNode>, prevEntry?: TNodeEntry<import("@udecode/plate-common").TNode> | undefined) => boolean;
export declare const normalizeIndentListStart: <N extends import("@udecode/plate-common").ElementOf<TEditor<V>>, V extends Value = Value>(editor: TEditor<V>, entry: EElementEntry<V>, options?: Partial<GetSiblingIndentListOptions<N, V>> | undefined) => boolean;
//# sourceMappingURL=normalizeIndentListStart.d.ts.map