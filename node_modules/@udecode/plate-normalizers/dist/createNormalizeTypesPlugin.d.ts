import { ErrorHandler } from '@udecode/plate-common';
import { Path } from 'slate';
interface Rule {
    /**
     * Force the type of the node at the given path
     */
    strictType?: string;
    /**
     * Type of the inserted node at the given path if `strictType` is not provided
     */
    type?: string;
    /**
     * Path where the rule applies
     */
    path: Path;
}
export interface NormalizeTypesPlugin extends ErrorHandler {
    /**
     * Set of rules for the types.
     * For each rule, provide a `path` and either `strictType` or `type`.
     * If there is no node existing at `path`:
     * insert a node with `strictType`.
     * If there is a node existing at `path` but its type is not `strictType` or `type`:
     * set the node type to `strictType` or `type`.
     */
    rules?: Rule[];
}
export declare const KEY_NORMALIZE_TYPES = "normalizeTypes";
/**
 * @see {@link withNormalizeTypes}
 */
export declare const createNormalizeTypesPlugin: <OP = NormalizeTypesPlugin, OV extends import("@udecode/plate-common").Value = import("@udecode/plate-common").Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
export {};
//# sourceMappingURL=createNormalizeTypesPlugin.d.ts.map