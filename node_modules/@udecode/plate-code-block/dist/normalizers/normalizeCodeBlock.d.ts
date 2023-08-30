import { PlateEditor, TNodeEntry, Value } from '@udecode/plate-common';
/**
 * Normalize code block node to force the pre>code>div.codeline structure.
 */
export declare const normalizeCodeBlock: <V extends Value>(editor: PlateEditor<V>) => ([node, path]: TNodeEntry<import("@udecode/plate-common").TNode>) => void;
//# sourceMappingURL=normalizeCodeBlock.d.ts.map