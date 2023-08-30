/// <reference types="react" />
import { TEditor, Value } from '@udecode/slate';
import { PlateProps } from '../components/Plate';
import { PlateEditor } from '../types/PlateEditor';
export interface WithPlateOptions<V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>> extends Pick<PlateProps<V, E>, 'disableCorePlugins' | 'plugins'> {
    id?: any;
}
/**
 * Apply `withInlineVoid` and all plate plugins `withOverrides`.
 * Overrides:
 * - `id`: id of the editor.
 * - `key`: random key for the <Slate> component so each time the editor is created, the component resets.
 * - `options`: Plate options
 */
export declare const withPlate: <V extends Value = Value, E extends TEditor<V> = TEditor<V>>(e: E, { id, plugins, disableCorePlugins, }?: WithPlateOptions<V, E & Omit<import("slate").BaseEditor, "children" | "operations" | "marks" | "apply" | "getDirtyPaths" | "getFragment" | "markableVoid" | "normalizeNode" | "insertFragment" | "insertNode" | "isInline" | "isVoid" | "id"> & {
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
} & import("@udecode/utils").UnknownObject & Pick<import("slate-history").HistoryEditor, "history" | "undo" | "redo"> & Pick<import("slate-react").ReactEditor, "insertData" | "insertFragmentData" | "insertTextData" | "setFragmentData" | "hasRange" | "hasTarget" | "hasEditableTarget" | "hasSelectableTarget" | "isTargetInsideNonReadonlyVoid"> & import("..").PlateEditorMethods<V> & {
    key: any;
    plugins: import("..").WithPlatePlugin<{}, V, PlateEditor<V>>[];
    pluginsByKey: Record<string, import("..").WithPlatePlugin<{}, V, PlateEditor<V>>>;
    prevSelection: import("slate").BaseRange | null;
    blockFactory: (node?: Partial<import("@udecode/slate").TElement> | undefined, path?: import("slate").Path | undefined) => import("@udecode/slate").ElementOf<TEditor<V>>;
    childrenFactory: () => V;
    currentKeyboardEvent: import("react").KeyboardEvent<Element> | null;
}>) => E & Omit<import("slate").BaseEditor, "children" | "operations" | "marks" | "apply" | "getDirtyPaths" | "getFragment" | "markableVoid" | "normalizeNode" | "insertFragment" | "insertNode" | "isInline" | "isVoid" | "id"> & {
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
} & import("@udecode/utils").UnknownObject & Pick<import("slate-history").HistoryEditor, "history" | "undo" | "redo"> & Pick<import("slate-react").ReactEditor, "insertData" | "insertFragmentData" | "insertTextData" | "setFragmentData" | "hasRange" | "hasTarget" | "hasEditableTarget" | "hasSelectableTarget" | "isTargetInsideNonReadonlyVoid"> & import("..").PlateEditorMethods<V> & {
    key: any;
    plugins: import("..").WithPlatePlugin<{}, V, PlateEditor<V>>[];
    pluginsByKey: Record<string, import("..").WithPlatePlugin<{}, V, PlateEditor<V>>>;
    prevSelection: import("slate").BaseRange | null;
    blockFactory: (node?: Partial<import("@udecode/slate").TElement> | undefined, path?: import("slate").Path | undefined) => import("@udecode/slate").ElementOf<TEditor<V>>;
    childrenFactory: () => V;
    currentKeyboardEvent: import("react").KeyboardEvent<Element> | null;
};
//# sourceMappingURL=withPlate.d.ts.map