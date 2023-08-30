import { TEditor, Value } from './TEditor';
/**
 * Get the marks that would be added to text at the current selection.
 */
export declare const getMarks: <V extends Value>(editor: TEditor<V>) => import("@udecode/utils").Simplify<import("@udecode/utils").UnionToIntersection<import("..").TNodeProps<import("../text/TText").TextOf<TEditor<V>>>>> | null;
//# sourceMappingURL=getMarks.d.ts.map