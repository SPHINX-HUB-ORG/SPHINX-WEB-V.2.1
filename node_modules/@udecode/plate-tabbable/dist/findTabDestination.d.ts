import { PlateEditor, Value } from '@udecode/plate-common';
import { TabbableEntry, TabDestination } from './types';
export interface FindTabDestinationOptions {
    tabbableEntries: TabbableEntry[];
    activeTabbableEntry: TabbableEntry | null;
    direction: 'forward' | 'backward';
}
export declare const findTabDestination: <V extends Value = Value>(editor: PlateEditor<V>, { tabbableEntries, activeTabbableEntry, direction }: FindTabDestinationOptions) => TabDestination | null;
//# sourceMappingURL=findTabDestination.d.ts.map