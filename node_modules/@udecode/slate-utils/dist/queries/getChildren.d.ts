import { ChildOf, TNode, TNodeEntry } from '@udecode/slate';
/**
 * Get children node entries of a node entry.
 * TODO: try Node.children
 */
export declare const getChildren: <N extends ChildOf<R, number>, R extends TNode = TNode>(nodeEntry: TNodeEntry<R>) => TNodeEntry<N>[];
//# sourceMappingURL=getChildren.d.ts.map