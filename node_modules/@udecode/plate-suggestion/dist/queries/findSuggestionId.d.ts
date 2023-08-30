import { PlateEditor, Value } from '@udecode/plate-common';
import { Location } from 'slate';
/**
 * Find the suggestion id at the cursor point, the point before and after (if offset = 0).
 */
export declare const findSuggestionId: <V extends Value>(editor: PlateEditor<V>, at: Location) => string | undefined;
//# sourceMappingURL=findSuggestionId.d.ts.map