import { Value } from '@udecode/slate';
import { NoInfer } from '../types/misc/NoInfer';
import { OverrideByKey } from '../types/OverrideByKey';
import { PlateEditor } from '../types/PlateEditor';
import { PlatePlugin } from '../types/plugin/PlatePlugin';
/**
 * Recursive deep merge of each plugin from `overrideByKey`
 * into plugin with same key (plugin > plugin.plugins).
 */
export declare const overridePluginsByKey: <P = import("@udecode/utils").AnyObject, V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(plugin: PlatePlugin<NoInfer<P>, V, E>, overrideByKey?: OverrideByKey<V, E>, nested?: boolean | undefined) => PlatePlugin<NoInfer<P>, V, E>;
//# sourceMappingURL=overridePluginsByKey.d.ts.map