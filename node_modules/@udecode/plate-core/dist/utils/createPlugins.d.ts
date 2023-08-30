import { Value } from '@udecode/slate';
import { OverrideByKey } from '../types/OverrideByKey';
import { PlateEditor } from '../types/PlateEditor';
import { PlatePlugin, PluginOptions } from '../types/plugin/PlatePlugin';
import { PlatePluginComponent } from '../types/plugin/PlatePluginComponent';
/**
 * Creates a new array of plugins by overriding the plugins in the original array.
 * Components can be overridden by key using `components` in the second param.
 * Any other properties can be overridden by key using `overrideByKey` in the second param.
 */
export declare const createPlugins: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(plugins: PlatePlugin<import("@udecode/utils").AnyObject, V, E>[], { components, overrideByKey, }?: {
    /**
     * Override plugin component by key.
     */
    components?: Record<string, PlatePluginComponent<any>> | undefined;
    /**
     * Override plugin by key.
     */
    overrideByKey?: OverrideByKey<V, E> | undefined;
}) => PlatePlugin<import("@udecode/utils").AnyObject, V, E>[];
//# sourceMappingURL=createPlugins.d.ts.map