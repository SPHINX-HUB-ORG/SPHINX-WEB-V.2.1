import { Modify } from '@udecode/utils';
import { Transforms } from 'slate';
import { NodeMatchOption } from '../../types/NodeMatchOption';
import { TEditor, Value } from '../editor/TEditor';
export declare type MoveNodesOptions<V extends Value = Value> = Modify<NonNullable<Parameters<typeof Transforms.moveNodes>[1]>, NodeMatchOption<V>>;
/**
 * Move the nodes at a location to a new location.
 */
export declare const moveNodes: <V extends Value>(editor: TEditor<V>, options?: MoveNodesOptions<V> | undefined) => void;
//# sourceMappingURL=moveNodes.d.ts.map