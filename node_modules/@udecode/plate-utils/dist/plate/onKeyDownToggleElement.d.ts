import { HotkeyPlugin, KeyboardHandlerReturnType, PlateEditor, WithPlatePlugin } from '@udecode/plate-core';
import { Value } from '@udecode/slate';
export declare const onKeyDownToggleElement: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(editor: E, { type, options: { hotkey } }: WithPlatePlugin<HotkeyPlugin, V, E>) => KeyboardHandlerReturnType;
//# sourceMappingURL=onKeyDownToggleElement.d.ts.map