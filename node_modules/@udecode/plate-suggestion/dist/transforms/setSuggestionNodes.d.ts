/// <reference types="react" />
import { PlateEditor, Value } from '@udecode/plate-common';
import { SuggestionEditorProps } from '../types';
export declare const setSuggestionNodes: <V extends Value = Value>(editor: Omit<import("slate").BaseEditor, "id" | "children" | "operations" | "marks" | "apply" | "getDirtyPaths" | "getFragment" | "markableVoid" | "normalizeNode" | "insertFragment" | "insertNode" | "isInline" | "isVoid"> & {
    id: any;
    children: V;
    operations: import("@udecode/plate-common").TOperation<import("@udecode/plate-common").TDescendant>[];
    marks: Record<string, any> | null;
    isInline: <N extends import("@udecode/plate-common").TElement>(element: N) => boolean;
    isVoid: <N_1 extends import("@udecode/plate-common").TElement>(element: N_1) => boolean;
    markableVoid: <N_2 extends import("@udecode/plate-common").TElement>(element: N_2) => boolean;
    normalizeNode: <N_3 extends import("@udecode/plate-common").TNode>(entry: import("@udecode/plate-common").TNodeEntry<N_3>) => void;
    apply: <N_4 extends import("@udecode/plate-common").TDescendant>(operation: import("@udecode/plate-common").TOperation<N_4>) => void;
    getFragment: <N_5 extends import("@udecode/plate-common").TDescendant>() => N_5[];
    insertFragment: <N_6 extends import("@udecode/plate-common").TDescendant>(fragment: N_6[]) => void;
    insertNode: <N_7 extends import("@udecode/plate-common").TDescendant>(node: N_7) => void;
    getDirtyPaths: <N_8 extends import("@udecode/plate-common").TDescendant>(operation: import("@udecode/plate-common").TOperation<N_8>) => import("slate").Path[];
} & import("@udecode/plate-common").UnknownObject & Pick<import("slate-history").HistoryEditor, "history" | "undo" | "redo"> & Pick<import("slate-react").ReactEditor, "insertData" | "insertFragmentData" | "insertTextData" | "setFragmentData" | "hasRange" | "hasTarget" | "hasEditableTarget" | "hasSelectableTarget" | "isTargetInsideNonReadonlyVoid"> & import("@udecode/plate-common").PlateEditorMethods<V> & {
    key: any;
    plugins: import("@udecode/plate-common").WithPlatePlugin<{}, V, PlateEditor<V>>[];
    pluginsByKey: Record<string, import("@udecode/plate-common").WithPlatePlugin<{}, V, PlateEditor<V>>>;
    prevSelection: import("slate").BaseRange | null;
    blockFactory: (node?: Partial<import("@udecode/plate-common").TElement> | undefined, path?: import("slate").Path | undefined) => import("@udecode/plate-common").ElementOf<import("@udecode/plate-common").TEditor<V>>;
    childrenFactory: () => V;
    currentKeyboardEvent: import("react").KeyboardEvent<Element> | null;
} & SuggestionEditorProps, options?: (Omit<{
    at?: import("slate").Location | undefined;
    match?: import("slate").NodeMatch<import("slate").Node> | undefined;
    mode?: import("slate").MaximizeMode | undefined;
    hanging?: boolean | undefined;
    split?: boolean | undefined;
    voids?: boolean | undefined;
    compare?: import("slate").PropsCompare | undefined;
    merge?: import("slate").PropsMerge | undefined;
}, "match"> & import("@udecode/plate-common").NodeMatchOption<Value> & {
    suggestionDeletion?: boolean | undefined;
    suggestionId?: string | undefined;
}) | undefined) => void;
//# sourceMappingURL=setSuggestionNodes.d.ts.map