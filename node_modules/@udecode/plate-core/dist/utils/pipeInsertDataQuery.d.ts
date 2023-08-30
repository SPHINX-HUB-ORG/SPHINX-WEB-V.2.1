import { Value } from '@udecode/slate';
import { PlateEditor } from '../types/PlateEditor';
import { PlatePluginInsertDataOptions } from '../types/plugin/PlatePluginInsertData';
import { InjectedPlugin } from './getInjectedPlugins';
/**
 * Is the plugin disabled by another plugin.
 */
export declare const pipeInsertDataQuery: <P = import("@udecode/utils").AnyObject, V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(plugins: Partial<import("../types/plugin/PlatePlugin").PlatePlugin<P, V, E>>[], { data, dataTransfer }: PlatePluginInsertDataOptions) => boolean;
//# sourceMappingURL=pipeInsertDataQuery.d.ts.map