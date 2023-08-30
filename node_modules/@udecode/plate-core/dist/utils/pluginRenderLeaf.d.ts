import { Value } from '@udecode/slate';
import { PlateEditor } from '../types/PlateEditor';
import { PlatePlugin } from '../types/plugin/PlatePlugin';
import { RenderLeaf } from '../types/RenderLeaf';
/**
 * Get a `Editable.renderLeaf` handler for `options.type`.
 * If the type is equals to the slate leaf type, render `options.component`.
 * Else, return `children`.
 */
export declare const pluginRenderLeaf: <V extends Value>(editor: PlateEditor<V>, { key, type, component, props }: PlatePlugin<{}, V, PlateEditor<V>>) => RenderLeaf;
//# sourceMappingURL=pluginRenderLeaf.d.ts.map