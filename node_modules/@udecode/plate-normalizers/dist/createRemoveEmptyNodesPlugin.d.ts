export interface RemoveEmptyNodesPlugin {
    types?: string | string[];
}
/**
 * @see {@link withRemoveEmptyNodes}
 */
export declare const createRemoveEmptyNodesPlugin: <OP = RemoveEmptyNodesPlugin, OV extends import("@udecode/plate-common").Value = import("@udecode/plate-common").Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createRemoveEmptyNodesPlugin.d.ts.map