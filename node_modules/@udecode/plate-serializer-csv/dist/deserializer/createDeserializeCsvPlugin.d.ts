import { DeserializeCsvPlugin } from './types';
export declare const KEY_DESERIALIZE_CSV = "deserializeCsv";
/**
 * Enables support for deserializing content
 * from CSV format to Slate format.
 */
export declare const createDeserializeCsvPlugin: <OP = DeserializeCsvPlugin, OV extends import("@udecode/plate-common").Value = import("@udecode/plate-common").Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createDeserializeCsvPlugin.d.ts.map