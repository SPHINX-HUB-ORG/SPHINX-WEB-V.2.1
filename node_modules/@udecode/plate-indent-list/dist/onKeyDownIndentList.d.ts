import { KeyboardHandlerReturnType, PlateEditor, Value, WithPlatePlugin } from '@udecode/plate-common';
import { IndentListPlugin } from './createIndentListPlugin';
export declare const onKeyDownIndentList: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(editor: E, plugin: WithPlatePlugin<IndentListPlugin, V, E>) => KeyboardHandlerReturnType;
//# sourceMappingURL=onKeyDownIndentList.d.ts.map