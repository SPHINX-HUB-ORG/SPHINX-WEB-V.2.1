import { PlateEditor, Value } from '@udecode/plate-common';
/**
 * Unwrap link node.
 */
export declare const unwrapLink: <V extends Value>(editor: PlateEditor<V>, options?: (Omit<{
    at?: import("slate").Location | undefined;
    match?: import("slate").NodeMatch<import("slate").Node> | undefined;
    mode?: import("slate").MaximizeMode | undefined;
    split?: boolean | undefined;
    voids?: boolean | undefined;
}, keyof import("@udecode/plate-common").ENodeMatchOptions<V_1>> & import("@udecode/plate-common").ENodeMatchOptions<Value> & {
    split?: boolean | undefined;
}) | undefined) => boolean;
//# sourceMappingURL=unwrapLink.d.ts.map