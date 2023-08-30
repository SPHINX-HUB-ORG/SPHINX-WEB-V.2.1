import { TEditor, TElementEntry, Value } from '@udecode/plate-common';
export interface IndentCodeLineOptions {
    codeBlock: TElementEntry;
    codeLine: TElementEntry;
    indentDepth?: number;
}
/**
 * Indent if:
 * - the selection is expanded OR
 * - there are no non-whitespace characters left of the cursor
 * Indentation = 2 spaces.
 */
export declare const indentCodeLine: <V extends Value>(editor: TEditor<V>, { codeLine, indentDepth }: IndentCodeLineOptions) => void;
//# sourceMappingURL=indentCodeLine.d.ts.map