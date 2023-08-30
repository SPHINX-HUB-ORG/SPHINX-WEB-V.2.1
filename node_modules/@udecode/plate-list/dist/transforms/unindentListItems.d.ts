import { PlateEditor, Value } from '@udecode/plate-common';
import { MoveListItemsOptions } from './moveListItems';
export declare type UnindentListItemsOptions = Omit<MoveListItemsOptions, 'increase'>;
export declare const unindentListItems: <V extends Value>(editor: PlateEditor<V>, options?: UnindentListItemsOptions) => boolean | undefined;
//# sourceMappingURL=unindentListItems.d.ts.map