import { EElement, PlateEditor, TElement, TNodeEntry, Value } from '@udecode/plate-common';
import { ListStyleType } from '../types';
import { GetIndentListSiblingsOptions } from './index';
/**
 * Get the first sibling list style type at the given indent.
 * If none, return the entry list style type.
 */
export declare const getSiblingListStyleType: <V extends Value = Value>(editor: PlateEditor<V>, { entry, indent, ...options }: {
    entry: TNodeEntry<TElement>;
    indent: number;
} & GetIndentListSiblingsOptions<import("@udecode/plate-common").ElementOf<import("@udecode/plate-common").TEditor<V>>, V>) => ListStyleType;
//# sourceMappingURL=getSiblingListStyleType.d.ts.map