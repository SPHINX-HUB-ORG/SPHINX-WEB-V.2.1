import { GetAboveNodeOptions, TEditor, Value } from '@udecode/slate';
import { Range } from 'slate';
/**
 * Whether the range is in the same block.
 */
export declare const isRangeInSameBlock: <V extends Value>(editor: TEditor<V>, { at, ...options }?: Omit<GetAboveNodeOptions<V>, "at"> & {
    at?: import("slate").BaseRange | null | undefined;
}) => boolean | undefined;
//# sourceMappingURL=isRangeInSameBlock.d.ts.map