import { Value } from '@udecode/slate';
import { PlateEditor } from '../types/PlateEditor';
import { WithPlatePlugin } from '../types/plugin/PlatePlugin';
import { PluginKey } from '../types/plugin/PlatePluginKey';
/**
 * Get `editor.pluginsByKey`
 */
export declare const getPluginsByKey: <P = import("@udecode/utils").AnyObject, V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(editor?: E | undefined) => Record<string, WithPlatePlugin<P, V, E>>;
//# sourceMappingURL=getPluginsByKey.d.ts.map