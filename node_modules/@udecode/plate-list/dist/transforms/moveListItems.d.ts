import { GetNodeEntriesOptions, PlateEditor, Value } from '@udecode/plate-common';
export declare type MoveListItemsOptions = {
    increase?: boolean;
    at?: GetNodeEntriesOptions['at'];
    enableResetOnShiftTab?: boolean;
};
export declare const moveListItems: <V extends Value>(editor: PlateEditor<V>, { increase, at, enableResetOnShiftTab, }?: MoveListItemsOptions) => boolean | undefined;
//# sourceMappingURL=moveListItems.d.ts.map