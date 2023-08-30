import { Value } from '@udecode/slate';
import { PlateEditor } from '../types/PlateEditor';
/**
 * Typed {@link useSlate} & PlateEditor.
 * Needs to be called in a child component of `Plate`.
 * Else, use `usePlateEditorState`.
 */
export declare const useEditorState: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>() => E;
//# sourceMappingURL=useEditorState.d.ts.map