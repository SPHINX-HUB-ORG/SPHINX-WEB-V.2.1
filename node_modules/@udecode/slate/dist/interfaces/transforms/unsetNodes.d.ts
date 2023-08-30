import { Modify } from '@udecode/utils';
import { Transforms } from 'slate';
import { NodeMatchOption } from '../../types/NodeMatchOption';
import { TEditor, Value } from '../editor/TEditor';
import { ENode, TNodeProps } from '../node/TNode';
export declare type UnsetNodesOptions<V extends Value = Value> = Modify<NonNullable<Parameters<typeof Transforms.unsetNodes>[2]>, NodeMatchOption<V>>;
/**
 * Unset properties on the nodes at a location.
 */
export declare const unsetNodes: <N extends ENode<V>, V extends Value = Value>(editor: TEditor<V>, props: keyof TNodeProps<N> | (keyof TNodeProps<N>)[], options?: UnsetNodesOptions<V> | undefined) => void;
//# sourceMappingURL=unsetNodes.d.ts.map