import { GetNodeEntriesOptions, PlateEditor, Value } from '@udecode/plate-common';
import { TSuggestionText } from '../types';
export declare const getSuggestionNodeEntries: <V extends Value = Value>(editor: PlateEditor<V>, suggestionId: string, { at, match, ...options }?: Omit<import("slate").EditorNodesOptions<import("@udecode/plate-common").TNode>, keyof import("@udecode/plate-common").ENodeMatchOptions<V_1>> & import("@udecode/plate-common").ENodeMatchOptions<V> & import("slate").EditorUnhangRangeOptions & {
    unhang?: boolean | undefined;
} & {
    match?: ((suggestion: TSuggestionText) => boolean) | undefined;
}) => Generator<import("@udecode/plate-common").TNodeEntry<TSuggestionText>, void, undefined>;
//# sourceMappingURL=getSuggestionNodeEntries.d.ts.map