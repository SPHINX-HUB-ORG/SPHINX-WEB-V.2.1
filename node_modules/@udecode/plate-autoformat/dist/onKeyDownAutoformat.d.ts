import { KeyboardHandlerReturnType, PlateEditor, Value, WithPlatePlugin } from '@udecode/plate-common';
import { AutoformatPlugin } from './types';
export declare const onKeyDownAutoformat: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(editor: PlateEditor<V>, { options: { rules, enableUndoOnDelete }, }: WithPlatePlugin<AutoformatPlugin<Value, PlateEditor<Value>>, V, E>) => KeyboardHandlerReturnType;
//# sourceMappingURL=onKeyDownAutoformat.d.ts.map