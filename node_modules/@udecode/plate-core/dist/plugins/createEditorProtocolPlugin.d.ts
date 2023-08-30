import { Value } from '@udecode/slate';
import { PlateEditor } from '../types/index';
export declare const KEY_EDITOR_PROTOCOL = "editorProtocol";
export declare const withEditorProtocol: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(editor: E) => E;
export declare const createEditorProtocolPlugin: <OP = import("@udecode/utils").AnyObject, OV extends Value = Value, OE extends PlateEditor<OV> = PlateEditor<OV>>(override?: Partial<import("../types/index").PlatePlugin<import("../types/index").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("../types/OverrideByKey").OverrideByKey<OV, OE>) => import("../types/index").PlatePlugin<import("../types/index").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createEditorProtocolPlugin.d.ts.map