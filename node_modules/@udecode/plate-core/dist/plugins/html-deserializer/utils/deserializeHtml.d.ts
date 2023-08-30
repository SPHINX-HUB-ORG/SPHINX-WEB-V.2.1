import { EDescendant, Value } from '@udecode/slate';
import { PlateEditor } from '../../../types/PlateEditor';
/**
 * Deserialize HTML element to a valid document fragment.
 */
export declare const deserializeHtml: <V extends Value>(editor: PlateEditor<V>, { element, stripWhitespace, }: {
    element: HTMLElement | string;
    stripWhitespace?: boolean | undefined;
}) => import("@udecode/slate").DescendantOf<import("@udecode/slate").TEditor<V>>[];
//# sourceMappingURL=deserializeHtml.d.ts.map