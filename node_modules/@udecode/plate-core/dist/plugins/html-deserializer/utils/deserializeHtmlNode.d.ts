import { EDescendant, Value } from '@udecode/slate';
import { PlateEditor } from '../../../types/PlateEditor';
import { DeserializeHtmlNodeReturnType } from '../types';
/**
 * Deserialize HTML element or child node.
 */
export declare const deserializeHtmlNode: <V extends Value>(editor: PlateEditor<V>) => (node: HTMLElement | ChildNode) => DeserializeHtmlNodeReturnType<import("@udecode/slate").DescendantOf<import("@udecode/slate").TEditor<V>>>;
//# sourceMappingURL=deserializeHtmlNode.d.ts.map