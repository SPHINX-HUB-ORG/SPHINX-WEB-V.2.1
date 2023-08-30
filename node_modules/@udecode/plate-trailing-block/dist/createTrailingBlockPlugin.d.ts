import { QueryNodeOptions } from '@udecode/plate-common';
export interface TrailingBlockPlugin extends QueryNodeOptions {
    /**
     * Level where the trailing node should be, the first level being 0.
     */
    level?: number;
    /**
     * Type of the trailing block
     */
    type?: string;
}
export declare const KEY_TRAILING_BLOCK = "trailingBlock";
/**
 * @see {@link withTrailingBlock}
 */
export declare const createTrailingBlockPlugin: <OP = TrailingBlockPlugin, OV extends import("@udecode/plate-common").Value = import("@udecode/plate-common").Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createTrailingBlockPlugin.d.ts.map