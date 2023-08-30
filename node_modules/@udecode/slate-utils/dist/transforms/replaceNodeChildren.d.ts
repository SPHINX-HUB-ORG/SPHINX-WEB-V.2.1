import { EElementOrText, InsertNodesOptions, RemoveNodesOptions, TEditor, Value } from '@udecode/slate';
import { Path } from 'slate';
export interface ReplaceNodeChildrenOptions<N extends EElementOrText<V>, V extends Value = Value> {
    at: Path;
    nodes: N | N[];
    removeOptions?: Omit<RemoveNodesOptions<V>, 'at'>;
    insertOptions?: Omit<InsertNodesOptions<V>, 'at'>;
}
/**
 * Replace node children: remove then insert.
 */
export declare const replaceNodeChildren: <N extends EElementOrText<V>, V extends Value = Value>(editor: TEditor<V>, { at, nodes, insertOptions, removeOptions }: ReplaceNodeChildrenOptions<N, V>) => void;
//# sourceMappingURL=replaceNodeChildren.d.ts.map