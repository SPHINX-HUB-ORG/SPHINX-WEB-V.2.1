import { Modify } from '@udecode/utils';
import { EditorNodesOptions } from 'slate';
import { ENodeMatchOptions } from '../../utils/match';
import { ENode, TNode } from '../node/TNode';
import { TNodeEntry } from '../node/TNodeEntry';
import { TEditor, Value } from './TEditor';
import { UnhangRangeOptions } from './unhangRange';
export declare type GetNodeEntriesOptions<V extends Value = Value> = Modify<NonNullable<EditorNodesOptions<TNode>>, ENodeMatchOptions<V>> & UnhangRangeOptions;
/**
 * Iterate through all of the nodes in the Editor.
 */
export declare const getNodeEntries: <N extends ENode<V>, V extends Value = Value>(editor: TEditor<V>, options?: GetNodeEntriesOptions<V> | undefined) => Generator<TNodeEntry<N>, void, undefined>;
//# sourceMappingURL=getNodeEntries.d.ts.map