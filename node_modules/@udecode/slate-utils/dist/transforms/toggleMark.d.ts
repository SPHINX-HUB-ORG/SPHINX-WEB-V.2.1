import { TEditor, Value } from '@udecode/slate';
export interface ToggleMarkOptions {
    clear?: string | string[];
    key: string;
}
/**
 * Add/remove marks in the selection.
 * @param editor
 * @param key mark to toggle
 * @param clear marks to clear when adding mark
 */
export declare const toggleMark: <V extends Value = Value>(editor: TEditor<V>, { key, clear }: ToggleMarkOptions) => void;
//# sourceMappingURL=toggleMark.d.ts.map