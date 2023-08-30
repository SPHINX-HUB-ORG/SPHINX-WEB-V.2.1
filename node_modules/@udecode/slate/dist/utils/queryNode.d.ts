import { TNode, TNodeEntry } from '../interfaces';
import { QueryNodeOptions } from '../types/QueryNodeOptions';
/**
 * Query the node entry.
 */
export declare const queryNode: <N extends TNode>(entry?: TNodeEntry<N> | undefined, { filter, allow, exclude, level, maxLevel }?: QueryNodeOptions) => boolean;
//# sourceMappingURL=queryNode.d.ts.map