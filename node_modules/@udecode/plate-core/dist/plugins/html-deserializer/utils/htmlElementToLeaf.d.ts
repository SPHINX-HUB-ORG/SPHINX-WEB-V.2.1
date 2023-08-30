import { Value } from '@udecode/slate';
import { PlateEditor } from '../../../types';
/**
 * Deserialize HTML to TDescendant[] with marks on Text.
 * Build the leaf from the leaf deserializers of each plugin.
 */
export declare const htmlElementToLeaf: <V extends Value>(editor: PlateEditor<V>, element: HTMLElement) => import("@udecode/slate").DescendantOf<import("@udecode/slate").TEditor<V>>[];
//# sourceMappingURL=htmlElementToLeaf.d.ts.map