import { PlatePlugin } from '@udecode/plate-common';
export declare const ELEMENT_UL = "ul";
export declare const ELEMENT_OL = "ol";
export declare const ELEMENT_LI = "li";
export declare const ELEMENT_LIC = "lic";
/**
 * Enables support for bulleted, numbered and to-do lists.
 */
export declare const createListPlugin: <OP = import("@udecode/plate-common").AnyObject, OV extends import("@udecode/plate-common").Value = import("@udecode/plate-common").Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createListPlugin.d.ts.map