import { PlateEditor, TElementEntry, Value } from '@udecode/plate-common';
/**
 * If list is not nested and if li is not the first child, move li up.
 */
export declare const removeFirstListItem: <V extends Value>(editor: PlateEditor<V>, { list, listItem, }: {
    list: TElementEntry<import("@udecode/plate-common").TNode>;
    listItem: TElementEntry<import("@udecode/plate-common").TNode>;
}) => boolean;
//# sourceMappingURL=removeFirstListItem.d.ts.map