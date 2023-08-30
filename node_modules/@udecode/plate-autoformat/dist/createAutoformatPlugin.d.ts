import { AutoformatPlugin } from './types';
export declare const KEY_AUTOFORMAT = "autoformat";
/**
 * @see {@link withAutoformat}
 */
export declare const createAutoformatPlugin: <OP = AutoformatPlugin<import("@udecode/plate-common").Value, import("@udecode/plate-common").PlateEditor<import("@udecode/plate-common").Value>>, OV extends import("@udecode/plate-common").Value = import("@udecode/plate-common").Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createAutoformatPlugin.d.ts.map