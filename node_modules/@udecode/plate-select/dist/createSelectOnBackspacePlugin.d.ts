import { QueryNodeOptions } from '@udecode/plate-common';
export declare type SelectOnBackspacePlugin = {
    query?: QueryNodeOptions;
};
export declare const KEY_SELECT_ON_BACKSPACE = "selectOnBackspace";
/**
 * @see {@link withSelectOnBackspace}
 */
export declare const createSelectOnBackspacePlugin: <OP = SelectOnBackspacePlugin, OV extends import("@udecode/plate-common").Value = import("@udecode/plate-common").Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createSelectOnBackspacePlugin.d.ts.map