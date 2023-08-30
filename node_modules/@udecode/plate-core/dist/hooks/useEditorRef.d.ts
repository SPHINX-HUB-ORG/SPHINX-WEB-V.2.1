import { Value } from '@udecode/slate';
import { PlateEditor } from '../types/PlateEditor';
/**
 * Typed {@link useSlateStatic} & PlateEditor.
 * Needs to be called in a child component of `Plate`.
 * Else, use `usePlateEditorRef`.
 */
export declare const useEditorRef: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>() => E;
//# sourceMappingURL=useEditorRef.d.ts.map