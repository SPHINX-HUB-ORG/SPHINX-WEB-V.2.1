import { SoftBreakPlugin } from './types';
export declare const KEY_SOFT_BREAK = "softBreak";
/**
 * Insert soft break following configurable rules.
 * Each rule specifies a hotkey and query options.
 */
export declare const createSoftBreakPlugin: <OP = SoftBreakPlugin, OV extends import("@udecode/plate-common").Value = import("@udecode/plate-common").Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createSoftBreakPlugin.d.ts.map