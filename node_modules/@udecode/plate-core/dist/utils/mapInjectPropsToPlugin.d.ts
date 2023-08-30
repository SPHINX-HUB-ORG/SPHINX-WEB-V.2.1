import { Value } from '@udecode/slate';
import { PlateEditor } from '../types/PlateEditor';
import { PlatePlugin, WithPlatePlugin } from '../types/plugin/PlatePlugin';
/**
 * Map plugin inject props to injected plugin
 */
export declare const mapInjectPropsToPlugin: <P = import("@udecode/utils").AnyObject, V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(editor: E, plugin: WithPlatePlugin<P, V, E>, injectedPlugin: Partial<PlatePlugin>) => {
    inject: {
        pluginsByKey: Record<string, Partial<PlatePlugin<import("@udecode/utils").AnyObject, Value, PlateEditor<Value>>>>;
    };
} | undefined;
//# sourceMappingURL=mapInjectPropsToPlugin.d.ts.map