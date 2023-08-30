import { EElementOrText, Value } from '@udecode/slate';
import { PlateEditor } from '../types';
import { PlatePluginInsertDataOptions } from '../types/plugin/PlatePluginInsertData';
import { InjectedPlugin } from './getInjectedPlugins';
/**
 * Pipe preInsert then insertFragment.
 */
export declare const pipeInsertFragment: <V extends Value>(editor: PlateEditor<V>, injectedPlugins: Partial<import("../types").PlatePlugin<{}, V, PlateEditor<V>>>[], { fragment, ...options }: PlatePluginInsertDataOptions & {
    fragment: EElementOrText<V>[];
}) => void;
//# sourceMappingURL=pipeInsertFragment.d.ts.map