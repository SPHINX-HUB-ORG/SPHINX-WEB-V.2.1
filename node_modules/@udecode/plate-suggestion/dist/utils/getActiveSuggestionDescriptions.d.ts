import { PlateEditor, Value } from '@udecode/plate-common';
export declare type TSuggestionCommonDescription = {
    userId: string;
    suggestionId: string;
};
export declare type TSuggestionInsertionDescription = TSuggestionCommonDescription & {
    type: 'insertion';
    insertedText: string;
};
export declare type TSuggestionDeletionDescription = TSuggestionCommonDescription & {
    type: 'deletion';
    deletedText: string;
};
export declare type TSuggestionReplacementDescription = TSuggestionCommonDescription & {
    type: 'replacement';
    insertedText: string;
    deletedText: string;
};
export declare type TSuggestionDescription = TSuggestionInsertionDescription | TSuggestionDeletionDescription | TSuggestionReplacementDescription;
/**
 * Get the suggestion descriptions of the selected node.
 * A node can have multiple suggestions (multiple users).
 * Each description maps to a user suggestion.
 */
export declare const getActiveSuggestionDescriptions: <V extends Value = Value>(editor: PlateEditor<V>) => TSuggestionDescription[];
//# sourceMappingURL=getActiveSuggestionDescriptions.d.ts.map