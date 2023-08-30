import { PlateEditor, Value, WithPlatePlugin } from '@udecode/plate-common';
import { TodoListPlugin } from './types';
export declare const withTodoList: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(editor: E, { options }: WithPlatePlugin<TodoListPlugin, V, E>) => E;
//# sourceMappingURL=withTodoList.d.ts.map