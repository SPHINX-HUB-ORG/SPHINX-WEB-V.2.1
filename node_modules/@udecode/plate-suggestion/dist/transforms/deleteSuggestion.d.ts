import { PlateEditor, Value } from '@udecode/plate-common';
import { Range } from 'slate';
/**
 * Suggest deletion one character at a time until target point is reached.
 * Suggest additions are safely deleted.
 */
export declare const deleteSuggestion: <V extends Value>(editor: PlateEditor<V>, at: Range, { reverse, }?: {
    reverse?: boolean | undefined;
}) => void;
//# sourceMappingURL=deleteSuggestion.d.ts.map