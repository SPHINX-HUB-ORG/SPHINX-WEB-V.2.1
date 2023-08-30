import { SetNodesOptions, TEditor, Value } from '@udecode/slate';
import { Range } from 'slate';
export interface RemoveMarkOptions<V extends Value = Value> extends Omit<SetNodesOptions<V>, 'match' | 'split'> {
    /**
     * Mark or the array of marks that will be removed
     */
    key: string | string[];
    /**
     * When location is not a Range,
     * setting this to false can prevent the onChange event of the editor to fire
     * @default true
     */
    shouldChange?: boolean;
    /**
     * Range where the mark(s) will be removed
     */
    at?: Range;
}
/**
 * Remove mark and trigger `onChange` if collapsed selection.
 */
export declare const removeMark: <V extends Value>(editor: TEditor<V>, { key, at, shouldChange, ...rest }: RemoveMarkOptions<V>) => void;
//# sourceMappingURL=removeMark.d.ts.map