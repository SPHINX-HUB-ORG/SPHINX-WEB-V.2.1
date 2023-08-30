import { Value } from '@udecode/plate-common';
import { DeserializeMdPlugin } from './types';
export declare const KEY_DESERIALIZE_MD = "deserializeMd";
export declare const createDeserializeMdPlugin: <OP = DeserializeMdPlugin<Value>, OV extends Value = Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createDeserializeMdPlugin.d.ts.map