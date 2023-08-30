import { EAncestorEntry, EElementOrText, Value } from '@udecode/slate';
import { Path } from 'slate';
/**
 * Get the next sibling nodes after a path.
 * @param ancestorEntry Ancestor of the sibling nodes
 * @param path Path of the reference node
 */
export declare const getNextSiblingNodes: <V extends Value>(ancestorEntry: EAncestorEntry<V>, path: Path) => EElementOrText<V>[];
//# sourceMappingURL=getNextSiblingNodes.d.ts.map