import { Value } from '@udecode/slate';
import { PlateEditor } from '../types/PlateEditor';
import { PlatePlugin } from '../types/plugin/PlatePlugin';
/**
 * Recursively merge plugin.plugins into editor.plugins and editor.pluginsByKey
 */
export declare const flattenDeepPlugins: <V extends Value>(editor: PlateEditor<V>, plugins?: PlatePlugin<{}, V, PlateEditor<V>>[] | undefined) => void;
//# sourceMappingURL=flattenDeepPlugins.d.ts.map