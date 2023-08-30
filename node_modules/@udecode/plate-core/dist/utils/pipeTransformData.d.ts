import { Value } from '@udecode/slate';
import { PluginOptions } from '../types/plugin/PlatePlugin';
import { PlatePluginInsertDataOptions } from '../types/plugin/PlatePluginInsertData';
import { InjectedPlugin } from './getInjectedPlugins';
/**
 * Pipe editor.insertData.transformData
 */
export declare const pipeTransformData: <V extends Value>(plugins: Partial<import("../types/plugin/PlatePlugin").PlatePlugin<import("@udecode/utils").AnyObject, V, import("..").PlateEditor<V>>>[], { data, dataTransfer }: PlatePluginInsertDataOptions) => string;
//# sourceMappingURL=pipeTransformData.d.ts.map