import { TablePlugin } from './types';
export declare const ELEMENT_TABLE = "table";
export declare const ELEMENT_TH = "th";
export declare const ELEMENT_TR = "tr";
export declare const ELEMENT_TD = "td";
/**
 * Enables support for tables.
 */
export declare const createTablePlugin: <OP = TablePlugin<import("@udecode/plate-common").Value>, OV extends import("@udecode/plate-common").Value = import("@udecode/plate-common").Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createTablePlugin.d.ts.map