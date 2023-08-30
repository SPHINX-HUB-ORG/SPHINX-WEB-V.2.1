import { HotkeyPlugin } from '@udecode/plate-common';
export declare const ELEMENT_BLOCKQUOTE = "blockquote";
/**
 * Enables support for block quotes, useful for
 * quotations and passages.
 */
export declare const createBlockquotePlugin: <OP = HotkeyPlugin, OV extends import("@udecode/plate-common").Value = import("@udecode/plate-common").Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createBlockquotePlugin.d.ts.map