import { ToggleMarkPlugin } from '@udecode/plate-common';
export declare const MARK_HIGHLIGHT = "highlight";
/**
 * Enables support for highlights, useful when reviewing
 * content or highlighting it for future reference.
 */
export declare const createHighlightPlugin: <OP = ToggleMarkPlugin, OV extends import("@udecode/plate-common").Value = import("@udecode/plate-common").Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createHighlightPlugin.d.ts.map