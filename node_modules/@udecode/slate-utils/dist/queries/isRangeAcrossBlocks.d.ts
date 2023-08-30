import { GetAboveNodeOptions, TEditor, Value } from '@udecode/slate';
import { Range } from 'slate';
/**
 * Is the range (default: selection) across blocks.
 * - return undefined if block not found
 * - return boolean whether one of the block is not found, but the other is found
 * - return boolean whether block paths are unequal
 */
export declare const isRangeAcrossBlocks: <V extends Value>(editor: TEditor<V>, { at, ...options }?: Omit<GetAboveNodeOptions<V>, "at"> & {
    at?: import("slate").BaseRange | null | undefined;
}) => boolean | undefined;
//# sourceMappingURL=isRangeAcrossBlocks.d.ts.map