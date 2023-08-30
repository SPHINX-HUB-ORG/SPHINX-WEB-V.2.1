import { PlateEditor, Value } from '@udecode/plate-common';
export declare const getSuggestionCurrentUserKey: <V extends Value>(editor: PlateEditor<V>) => string;
export declare const getSuggestionProps: <V extends Value>(editor: PlateEditor<V>, id: string, { suggestionDeletion }?: {
    suggestionDeletion?: boolean | undefined;
}) => {
    [x: string]: string | boolean;
    suggestion: boolean;
    suggestionId: string;
};
//# sourceMappingURL=getSuggestionProps.d.ts.map