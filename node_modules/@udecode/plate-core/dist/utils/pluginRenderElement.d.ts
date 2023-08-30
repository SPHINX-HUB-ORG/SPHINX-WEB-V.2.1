import { Value } from '@udecode/slate';
import { PlateEditor } from '../types/PlateEditor';
import { PlatePlugin } from '../types/plugin/PlatePlugin';
import { RenderElement } from '../types/RenderElement';
/**
 * Get a `Editable.renderElement` handler for `options.type`.
 * If the type is equals to the slate element type, render `options.component`.
 * Else, return `undefined` so the pipeline can check the next plugin.
 */
export declare const pluginRenderElement: <V extends Value>(editor: PlateEditor<V>, { key, type, component: _component, props }: PlatePlugin<{}, V, PlateEditor<V>>) => RenderElement;
//# sourceMappingURL=pluginRenderElement.d.ts.map