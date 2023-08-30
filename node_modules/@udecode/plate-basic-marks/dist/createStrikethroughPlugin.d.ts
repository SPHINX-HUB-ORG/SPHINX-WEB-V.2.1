import { ToggleMarkPlugin } from '@udecode/plate-common';
export declare const MARK_STRIKETHROUGH = "strikethrough";
/**
 * Enables support for strikethrough formatting.
 */
export declare const createStrikethroughPlugin: <OP = ToggleMarkPlugin, OV extends import("@udecode/plate-common").Value = import("@udecode/plate-common").Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createStrikethroughPlugin.d.ts.map