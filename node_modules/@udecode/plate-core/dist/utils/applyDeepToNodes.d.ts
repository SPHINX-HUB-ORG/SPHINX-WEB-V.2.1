import { NodeOf, QueryNodeOptions, TNode } from '@udecode/slate';
import { Path } from 'slate';
export interface ApplyDeepToNodesOptions<N extends TNode> {
    node: N;
    path?: Path;
    source: Record<string, any> | (() => Record<string, any>);
    apply: (node: NodeOf<N>, source: Record<string, any> | (() => Record<string, any>)) => void;
    query?: QueryNodeOptions;
}
/**
 * Recursively apply an operation to children nodes with a query.
 */
export declare const applyDeepToNodes: <N extends TNode>({ node, path, source, apply, query, }: ApplyDeepToNodesOptions<N>) => void;
//# sourceMappingURL=applyDeepToNodes.d.ts.map