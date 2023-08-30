import { KeyboardHandlerReturnType, PlateEditor, ToggleMarkPlugin, WithPlatePlugin } from '@udecode/plate-core';
import { Value } from '@udecode/slate';
export declare const onKeyDownToggleMark: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(editor: E, { type, options: { hotkey, clear } }: WithPlatePlugin<ToggleMarkPlugin, V, E>) => KeyboardHandlerReturnType;
//# sourceMappingURL=onKeyDownToggleMark.d.ts.map