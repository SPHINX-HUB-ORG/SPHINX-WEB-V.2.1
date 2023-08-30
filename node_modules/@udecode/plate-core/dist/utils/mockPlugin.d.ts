import { Value } from '@udecode/slate';
import { NoInfer } from '../types/misc/NoInfer';
import { PlateEditor } from '../types/PlateEditor';
import { PlatePlugin, WithPlatePlugin } from '../types/plugin/PlatePlugin';
export declare const mockPlugin: <P = import("@udecode/utils").AnyObject, V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(plugin?: Partial<PlatePlugin<NoInfer<P>, Value, PlateEditor<Value>>> | undefined) => WithPlatePlugin<NoInfer<P>, V, E>;
//# sourceMappingURL=mockPlugin.d.ts.map