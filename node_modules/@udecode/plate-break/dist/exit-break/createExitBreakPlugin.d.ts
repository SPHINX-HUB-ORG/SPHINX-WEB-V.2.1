import { ExitBreakPlugin } from './types';
export declare const KEY_EXIT_BREAK = "exitBreak";
/**
 * Insert soft break following configurable rules.
 * Each rule specifies a hotkey and query options.
 */
export declare const createExitBreakPlugin: <OP = ExitBreakPlugin, OV extends import("@udecode/plate-common").Value = import("@udecode/plate-common").Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createExitBreakPlugin.d.ts.map