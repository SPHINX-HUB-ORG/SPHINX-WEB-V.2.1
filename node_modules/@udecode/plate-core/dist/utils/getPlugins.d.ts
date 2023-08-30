import { Value } from '@udecode/slate';
import { PlateEditor } from '../types/PlateEditor';
import { PlatePlugin, PluginOptions } from '../types/plugin/PlatePlugin';
/**
 * Get `editor.plugins`
 */
export declare const getPlugins: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(editor: E) => PlatePlugin<import("@udecode/utils").AnyObject, V, E>[];
//# sourceMappingURL=getPlugins.d.ts.map