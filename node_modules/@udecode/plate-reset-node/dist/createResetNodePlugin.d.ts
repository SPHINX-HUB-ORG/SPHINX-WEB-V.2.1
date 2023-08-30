import { ResetNodePlugin } from './types';
export declare const KEY_RESET_NODE = "resetNode";
/**
 * Enables support for resetting block type from rules.
 */
export declare const createResetNodePlugin: <OP = ResetNodePlugin<import("@udecode/plate-common").Value, import("@udecode/plate-common").PlateEditor<import("@udecode/plate-common").Value>>, OV extends import("@udecode/plate-common").Value = import("@udecode/plate-common").Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createResetNodePlugin.d.ts.map