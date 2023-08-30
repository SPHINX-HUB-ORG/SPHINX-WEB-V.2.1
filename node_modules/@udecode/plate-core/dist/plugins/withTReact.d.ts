import { TEditor, Value } from '@udecode/slate';
export declare const withTReact: <V extends Value = Value, E extends TEditor<V> = TEditor<V>, EE extends E = E & Omit<import("slate").BaseEditor, "children" | "operations" | "marks" | "apply" | "getDirtyPaths" | "getFragment" | "markableVoid" | "normalizeNode" | "insertFragment" | "insertNode" | "isInline" | "isVoid" | "id"> & {
    id: any;
    children: V;
    operations: import("@udecode/slate").TOperation<import("@udecode/slate").TDescendant>[];
    marks: Record<string, any> | null;
    isInline: <N extends import("@udecode/slate").TElement>(element: N) => boolean;
    isVoid: <N_1 extends import("@udecode/slate").TElement>(element: N_1) => boolean;
    markableVoid: <N_2 extends import("@udecode/slate").TElement>(element: N_2) => boolean;
    normalizeNode: <N_3 extends import("@udecode/slate").TNode>(entry: import("@udecode/slate").TNodeEntry<N_3>) => void;
    apply: <N_4 extends import("@udecode/slate").TDescendant>(operation: import("@udecode/slate").TOperation<N_4>) => void;
    getFragment: <N_5 extends import("@udecode/slate").TDescendant>() => N_5[];
    insertFragment: <N_6 extends import("@udecode/slate").TDescendant>(fragment: N_6[]) => void;
    insertNode: <N_7 extends import("@udecode/slate").TDescendant>(node: N_7) => void;
    getDirtyPaths: <N_8 extends import("@udecode/slate").TDescendant>(operation: import("@udecode/slate").TOperation<N_8>) => import("slate").Path[];
} & import("@udecode/utils").UnknownObject & Pick<import("slate-react").ReactEditor, "insertData" | "insertFragmentData" | "insertTextData" | "setFragmentData" | "hasRange" | "hasTarget" | "hasEditableTarget" | "hasSelectableTarget" | "isTargetInsideNonReadonlyVoid">>(editor: E) => EE;
//# sourceMappingURL=withTReact.d.ts.map