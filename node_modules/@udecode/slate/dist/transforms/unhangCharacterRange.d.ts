import { Range } from 'slate';
import { TEditor, Value } from '../interfaces';
/**
 * Unhang the range of length 1 so both edges are in the same text node.
 */
export declare const unhangCharacterRange: <V extends Value>(editor: TEditor<V>, at: Range) => {
    anchor: import("slate").BasePoint;
    focus: import("slate").BasePoint;
};
//# sourceMappingURL=unhangCharacterRange.d.ts.map