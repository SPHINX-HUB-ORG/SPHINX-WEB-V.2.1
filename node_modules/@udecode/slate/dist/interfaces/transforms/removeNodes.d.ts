import { Modify } from '@udecode/utils';
import { Transforms } from 'slate';
import { NodeMatchOption } from '../../types/NodeMatchOption';
import { TEditor, Value } from '../editor/TEditor';
export declare type RemoveNodesOptions<V extends Value = Value> = Modify<NonNullable<Parameters<typeof Transforms.removeNodes>[1]>, NodeMatchOption<V>>;
/**
 * Remove the nodes at a specific location in the document.
 */
export declare const removeNodes: <V extends Value>(editor: TEditor<V>, options?: RemoveNodesOptions<V> | undefined) => void;
//# sourceMappingURL=removeNodes.d.ts.map