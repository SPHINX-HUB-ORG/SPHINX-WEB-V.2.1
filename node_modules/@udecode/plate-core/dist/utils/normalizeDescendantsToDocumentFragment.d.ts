import { EDescendant, TEditor, Value } from '@udecode/slate';
import { PlateEditor } from '../types/PlateEditor';
/**
 * Normalize the descendants to a valid document fragment.
 */
export declare const normalizeDescendantsToDocumentFragment: <V extends Value>(editor: PlateEditor<V>, { descendants }: {
    descendants: import("@udecode/slate").DescendantOf<TEditor<V>>[];
}) => import("@udecode/slate").DescendantOf<TEditor<V>>[];
//# sourceMappingURL=normalizeDescendantsToDocumentFragment.d.ts.map