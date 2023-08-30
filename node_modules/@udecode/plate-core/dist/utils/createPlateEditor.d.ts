/// <reference types="react" />
import { TEditor, Value } from '@udecode/slate';
import { WithPlateOptions } from '../plugins/withPlate';
import { OverrideByKey } from '../types/OverrideByKey';
import { PlateEditor } from '../types/PlateEditor';
import { PlatePlugin, PluginOptions } from '../types/plugin/PlatePlugin';
import { PlatePluginComponent } from '../types/plugin/PlatePluginComponent';
export interface CreatePlateEditorOptions<V extends Value = Value, E extends TEditor<V> = TEditor<V>> extends Omit<WithPlateOptions<V, E & PlateEditor<V>>, 'plugins'> {
    /**
     * Initial editor (without `withPlate`).
     */
    editor?: E;
    /**
     * Editor plugins.
     */
    plugins?: PlatePlugin<PluginOptions, V>[];
    /**
     * Inject components into plugins.
     */
    components?: Record<string, PlatePluginComponent>;
    /**
     * Override plugins by key.
     */
    overrideByKey?: OverrideByKey<V>;
    /**
     * Normalize editor.
     */
    normalizeInitialValue?: boolean;
}
/**
 * Create a plate editor with:
 * - `createTEditor` or custom `editor`
 * - `withPlate`
 * - custom `components`
 */
export declare const createPlateEditor: <V extends Value = Value, E extends TEditor<V> = TEditor<V>>({ editor, plugins, components, overrideByKey, normalizeInitialValue: shouldNormalizeInitialValue, ...withPlateOptions }?: CreatePlateEditorOptions<V, E>) => E & Omit<import("slate").BaseEditor, "children" | "operations" | "marks" | "apply" | "getDirtyPaths" | "getFragment" | "markableVoid" | "normalizeNode" | "insertFragment" | "insertNode" | "isInline" | "isVoid" | "id"> & {
    id: any;
    children: V; /**
     * Initial editor (without `withPlate`).
     */
    operations: import("@udecode/slate").TOperation<import("@udecode/slate").TDescendant>[];
    marks: Record<string, any> | null;
    /**
     * Editor plugins.
     */
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
    plugins: import("../types/plugin/PlatePlugin").WithPlatePlugin<{}, V, PlateEditor<V>>[];
    pluginsByKey: Record<string, import("../types/plugin/PlatePlugin").WithPlatePlugin<{}, V, PlateEditor<V>>>;
    prevSelection: import("slate").BaseRange | null;
    blockFactory: (node?: Partial<import("@udecode/slate").TElement> | undefined, path?: import("slate").Path | undefined) => import("@udecode/slate").ElementOf<TEditor<V>>;
    childrenFactory: () => V;
    currentKeyboardEvent: import("react").KeyboardEvent<Element> | null;
};
//# sourceMappingURL=createPlateEditor.d.ts.map