import { Value } from '@udecode/slate';
import { PlateEditor } from '../types/PlateEditor';
import { WithPlatePlugin } from '../types/plugin/PlatePlugin';
import { PluginKey } from '../types/plugin/PlatePluginKey';
/**
 * Get plugin options by plugin key.
 */
export declare const getPlugin: <P = import("@udecode/utils").AnyObject, V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(editor: E, key: PluginKey) => WithPlatePlugin<P, V, E>;
//# sourceMappingURL=getPlugin.d.ts.map