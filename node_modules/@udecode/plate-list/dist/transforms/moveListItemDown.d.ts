import { PlateEditor, TElementEntry, Value } from '@udecode/plate-common';
export interface MoveListItemDownOptions {
    list: TElementEntry;
    listItem: TElementEntry;
}
export declare const moveListItemDown: <V extends Value>(editor: PlateEditor<V>, { list, listItem }: MoveListItemDownOptions) => false | undefined;
//# sourceMappingURL=moveListItemDown.d.ts.map