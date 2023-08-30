import { TEditor, Value } from '@udecode/slate';
import { Location, Range } from 'slate';
import { PointBeforeOptions } from './getPointBeforeLocation';
export interface RangeBeforeOptions extends PointBeforeOptions {
}
/**
 * Get range from {@link getPointBeforeLocation} to the end point of `at`.
 */
export declare const getRangeBefore: <V extends Value>(editor: TEditor<V>, at: Location, options?: RangeBeforeOptions | undefined) => Range | undefined;
//# sourceMappingURL=getRangeBefore.d.ts.map