import { EElementOrText, Value } from '@udecode/slate';
import { PlateEditor } from '../types/PlateEditor';
import { PlatePluginInsertDataOptions } from '../types/plugin/PlatePluginInsertData';
import { InjectedPlugin } from './getInjectedPlugins';
/**
 * Pipe editor.insertData.transformFragment
 */
export declare const pipeTransformFragment: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(plugins: Partial<import("..").PlatePlugin<{}, V, E>>[], { fragment, ...options }: PlatePluginInsertDataOptions & {
    fragment: EElementOrText<V>[];
}) => EElementOrText<V>[];
//# sourceMappingURL=pipeTransformFragment.d.ts.map