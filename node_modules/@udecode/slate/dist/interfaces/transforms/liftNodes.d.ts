import { Modify } from '@udecode/utils';
import { Transforms } from 'slate';
import { NodeMatchOption } from '../../types/NodeMatchOption';
import { TEditor, Value } from '../editor/TEditor';
export declare type LiftNodesOptions<V extends Value = Value> = Modify<NonNullable<Parameters<typeof Transforms.liftNodes>[1]>, NodeMatchOption<V>>;
/**
 * Lift nodes at a specific location upwards in the document tree, splitting
 * their parent in two if necessary.
 */
export declare const liftNodes: <V extends Value>(editor: TEditor<V>, options?: LiftNodesOptions<V> | undefined) => void;
//# sourceMappingURL=liftNodes.d.ts.map