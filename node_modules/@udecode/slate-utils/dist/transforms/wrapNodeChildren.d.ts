import { TEditor, Value, WrapNodesOptions } from '@udecode/slate';
import { Modify } from '@udecode/utils';
import { Path } from 'slate';
/**
 * Wrap node children into a single element:
 * - wraps the first child node into the element
 * - move the other child nodes next to the element children.
 */
export declare const wrapNodeChildren: <N extends import("@udecode/slate").ElementOf<TEditor<V>>, V extends Value = Value>(editor: TEditor<V>, element: N, options: Modify<WrapNodesOptions<V>, {
    at: Path;
}>) => void;
//# sourceMappingURL=wrapNodeChildren.d.ts.map