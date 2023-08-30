import { Value } from '@udecode/slate';
import { Point } from 'slate';
import { TReactEditor } from '../types/TReactEditor';
/**
 * Find a native DOM selection point from a Slate point.
 */
export declare const toDOMPoint: <V extends Value>(editor: TReactEditor<V>, point: Point) => import("slate-react/dist/utils/dom").DOMPoint | undefined;
//# sourceMappingURL=toDOMPoint.d.ts.map