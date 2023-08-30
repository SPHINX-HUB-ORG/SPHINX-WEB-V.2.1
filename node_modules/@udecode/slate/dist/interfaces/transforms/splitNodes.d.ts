import { Modify } from '@udecode/utils';
import { Transforms } from 'slate';
import { NodeMatchOption } from '../../types/NodeMatchOption';
import { TEditor, Value } from '../editor/TEditor';
export declare type SplitNodesOptions<V extends Value = Value> = Modify<NonNullable<Parameters<typeof Transforms.splitNodes>[1]>, NodeMatchOption<V>>;
/**
 * Split the nodes at a specific location.
 */
export declare const splitNodes: <V extends Value>(editor: TEditor<V>, options?: SplitNodesOptions<V> | undefined) => void;
//# sourceMappingURL=splitNodes.d.ts.map