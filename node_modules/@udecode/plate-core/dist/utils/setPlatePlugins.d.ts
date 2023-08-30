import { Value } from '@udecode/slate';
import { PlateProps } from '../components/Plate';
import { PlateEditor } from '../types/PlateEditor';
/**
 * Flatten deep plugins then set editor.plugins and editor.pluginsByKey
 */
export declare const setPlatePlugins: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(editor: E, { disableCorePlugins, plugins: _plugins, }: Pick<PlateProps<V, E>, "plugins" | "disableCorePlugins">) => void;
//# sourceMappingURL=setPlatePlugins.d.ts.map