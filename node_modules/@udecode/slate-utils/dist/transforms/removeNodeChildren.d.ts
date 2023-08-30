import { RemoveNodesOptions, TEditor, Value } from '@udecode/slate';
import { Path } from 'slate';
/**
 * Remove node children.
 */
export declare const removeNodeChildren: <V extends Value = Value>(editor: TEditor<V>, path: Path, options?: Omit<RemoveNodesOptions<V>, "at"> | undefined) => void;
//# sourceMappingURL=removeNodeChildren.d.ts.map