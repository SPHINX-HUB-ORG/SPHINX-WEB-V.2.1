import { QueryNodeOptions } from '@udecode/plate-common';
export interface NodeIdPlugin extends QueryNodeOptions {
    /**
     * Node key to store the id.
     * @default 'id'
     */
    idKey?: string;
    /**
     * ID factory, e.g. `uuid`
     * @default () => Date.now()
     */
    idCreator?: Function;
    /**
     * Filter `Text` nodes.
     * @default true
     */
    filterText?: boolean;
    /**
     * Reuse ids on undo/redo and copy/pasting if not existing in the document.
     * This is disabled by default to avoid duplicate ids across documents.
     * @default false
     */
    reuseId?: boolean;
}
export declare const KEY_NODE_ID = "nodeId";
/**
 * @see {@link withNodeId}
 */
export declare const createNodeIdPlugin: <OP = NodeIdPlugin, OV extends import("@udecode/plate-common").Value = import("@udecode/plate-common").Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createNodeIdPlugin.d.ts.map