/// <reference types="react" />
import { Value } from '@udecode/slate';
import { GetRecord, SetRecord, UseRecord } from '../../atoms/index';
import { Scope } from '../../libs/index';
import { PlateEditor } from '../../types/PlateEditor';
import { PlateStoreState } from '../../types/PlateStore';
/**
 * A unique id used as a provider scope.
 * Use it if you have multiple `PlateProvider` in the same React tree.
 * @default PLATE_SCOPE
 */
export declare type PlateId = Scope;
export declare const PLATE_SCOPE = "plate";
export declare const GLOBAL_PLATE_SCOPE: unique symbol;
export declare const plateIdAtom: import("jotai").Atom<string> & {
    write: (get: {
        <Value_1>(atom: import("jotai").Atom<Value_1 | Promise<Value_1>>): Value_1;
        <Value_2>(atom: import("jotai").Atom<Promise<Value_2>>): Value_2;
        <Value_3>(atom: import("jotai").Atom<Value_3>): Value_3 extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? any : V : V : V : V : V : V : V : V : V : V : Value_3;
    } & {
        <Value_4>(atom: import("jotai").Atom<Value_4 | Promise<Value_4>>, options: {
            unstable_promise: true;
        }): Value_4 | Promise<Value_4>;
        <Value_5>(atom: import("jotai").Atom<Promise<Value_5>>, options: {
            unstable_promise: true;
        }): Value_5 | Promise<Value_5>;
        <Value_6>(atom: import("jotai").Atom<Value_6>, options: {
            unstable_promise: true;
        }): (Value_6 extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? any : V : V : V : V : V : V : V : V : V : V : Value_6) | Promise<Value_6 extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? V extends Promise<infer V> ? any : V : V : V : V : V : V : V : V : V : V : Value_6>;
    }, set: {
        <Value_7, Result extends void | Promise<void>>(atom: import("jotai").WritableAtom<Value_7, undefined, Result>): Result;
        <Value_8, Update, Result_1 extends void | Promise<void>>(atom: import("jotai").WritableAtom<Value_8, Update, Result_1>, update: Update): Result_1;
    }, update: string | ((prev: string) => string)) => void;
    onMount?: (<S extends (update: string | ((prev: string) => string)) => void>(setAtom: S) => void | (() => void)) | undefined;
} & {
    init: string;
};
/**
 * Get the closest `Plate` id.
 */
export declare const usePlateId: () => string;
export declare const createPlateStore: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>({ decorate, editor, id, isRendered, keyDecorate, keyEditor, keySelection, onChange, editorRef, plugins, rawPlugins, readOnly, renderElement, renderLeaf, value, ...state }?: Partial<PlateStoreState<V, E>>) => {
    plateStore: {
        atom: {
            id: import("jotai").Atom<Scope>;
            editor: import("jotai").Atom<E>;
            rawPlugins: import("jotai").Atom<import("../..").PlatePlugin<import("@udecode/utils").AnyObject, V, E>[]>;
            readOnly: import("jotai").Atom<boolean>;
            plugins: import("jotai").Atom<import("../..").WithPlatePlugin<import("@udecode/utils").AnyObject, V, E>[]>;
            value: import("jotai").Atom<V>;
            isRendered: import("jotai").Atom<boolean | null>;
            keyEditor: import("jotai").Atom<string | null>;
            keySelection: import("jotai").Atom<string | null>;
            keyDecorate: import("jotai").Atom<string | null>;
            onChange: import("jotai").Atom<{
                fn: (value: V) => void;
            } | null>;
            editorRef: import("jotai").Atom<{
                ref: import("react").ForwardedRef<E>;
            } | null>;
            decorate: import("jotai").Atom<{
                fn: (entry: import("@udecode/slate").ENodeEntry<V>) => import("slate").BaseRange[];
            } | null>;
            renderElement: import("jotai").Atom<{
                fn: import("../..").RenderElementFn<V>;
            } | null>;
            renderLeaf: import("jotai").Atom<{
                fn: import("@udecode/slate").RenderLeafFn<V>;
            } | null>;
        };
        scope?: Scope | undefined;
        extend: <ET, EN>(extendedState: ET, options?: Omit<import("../../atoms/createAtomStore").CreateAtomStoreOptions<{}, EN extends string ? EN : "plate">, "initialStore"> | undefined) => import("../../atoms/createAtomStore").AtomStoreApi<{
            id: Scope;
            editor: E;
            rawPlugins: import("../..").PlatePlugin<import("@udecode/utils").AnyObject, V, E>[];
            readOnly: boolean;
            plugins: import("../..").WithPlatePlugin<import("@udecode/utils").AnyObject, V, E>[];
            value: V;
        } & import("../..").Nullable<{
            isRendered: boolean;
            keyEditor: string;
            keySelection: string;
            keyDecorate: string;
            onChange: {
                fn: (value: V) => void;
            };
            editorRef: {
                ref: import("react").ForwardedRef<E>;
            };
            decorate: {
                fn: (entry: import("@udecode/slate").ENodeEntry<V>) => import("slate").BaseRange[];
            };
            renderElement: {
                fn: import("../..").RenderElementFn<V>;
            };
            renderLeaf: {
                fn: import("@udecode/slate").RenderLeafFn<V>;
            };
        }> & ET, EN extends string ? EN : "plate">;
    };
    usePlateStore: (_id?: Scope | undefined) => {
        get: GetRecord<{
            id: Scope;
            editor: E;
            rawPlugins: import("../..").PlatePlugin<import("@udecode/utils").AnyObject, V, E>[];
            readOnly: boolean;
            plugins: import("../..").WithPlatePlugin<import("@udecode/utils").AnyObject, V, E>[];
            value: V;
        } & import("../..").Nullable<{
            isRendered: boolean;
            keyEditor: string;
            keySelection: string;
            keyDecorate: string;
            onChange: {
                fn: (value: V) => void;
            };
            editorRef: {
                ref: import("react").ForwardedRef<E>;
            };
            decorate: {
                fn: (entry: import("@udecode/slate").ENodeEntry<V>) => import("slate").BaseRange[];
            };
            renderElement: {
                fn: import("../..").RenderElementFn<V>;
            };
            renderLeaf: {
                fn: import("@udecode/slate").RenderLeafFn<V>;
            };
        }>>;
        set: SetRecord<{
            id: Scope;
            editor: E;
            rawPlugins: import("../..").PlatePlugin<import("@udecode/utils").AnyObject, V, E>[];
            readOnly: boolean;
            plugins: import("../..").WithPlatePlugin<import("@udecode/utils").AnyObject, V, E>[];
            value: V;
        } & import("../..").Nullable<{
            isRendered: boolean;
            keyEditor: string;
            keySelection: string;
            keyDecorate: string;
            onChange: {
                fn: (value: V) => void;
            };
            editorRef: {
                ref: import("react").ForwardedRef<E>;
            };
            decorate: {
                fn: (entry: import("@udecode/slate").ENodeEntry<V>) => import("slate").BaseRange[];
            };
            renderElement: {
                fn: import("../..").RenderElementFn<V>;
            };
            renderLeaf: {
                fn: import("@udecode/slate").RenderLeafFn<V>;
            };
        }>>;
        use: UseRecord<{
            id: Scope;
            editor: E;
            rawPlugins: import("../..").PlatePlugin<import("@udecode/utils").AnyObject, V, E>[];
            readOnly: boolean;
            plugins: import("../..").WithPlatePlugin<import("@udecode/utils").AnyObject, V, E>[];
            value: V;
        } & import("../..").Nullable<{
            isRendered: boolean;
            keyEditor: string;
            keySelection: string;
            keyDecorate: string;
            onChange: {
                fn: (value: V) => void;
            };
            editorRef: {
                ref: import("react").ForwardedRef<E>;
            };
            decorate: {
                fn: (entry: import("@udecode/slate").ENodeEntry<V>) => import("slate").BaseRange[];
            };
            renderElement: {
                fn: import("../..").RenderElementFn<V>;
            };
            renderLeaf: {
                fn: import("@udecode/slate").RenderLeafFn<V>;
            };
        }>>;
    };
};
export declare const plateStore: {
    atom: {
        id: import("jotai").Atom<Scope>;
        editor: import("jotai").Atom<PlateEditor<Value>>;
        rawPlugins: import("jotai").Atom<import("../..").PlatePlugin<import("@udecode/utils").AnyObject, Value, PlateEditor<Value>>[]>;
        readOnly: import("jotai").Atom<boolean>;
        plugins: import("jotai").Atom<import("../..").WithPlatePlugin<import("@udecode/utils").AnyObject, Value, PlateEditor<Value>>[]>;
        value: import("jotai").Atom<Value>;
        isRendered: import("jotai").Atom<boolean | null>;
        keyEditor: import("jotai").Atom<string | null>;
        keySelection: import("jotai").Atom<string | null>;
        keyDecorate: import("jotai").Atom<string | null>;
        onChange: import("jotai").Atom<{
            fn: (value: Value) => void;
        } | null>;
        editorRef: import("jotai").Atom<{
            ref: import("react").ForwardedRef<PlateEditor<Value>>;
        } | null>;
        decorate: import("jotai").Atom<{
            fn: (entry: import("@udecode/slate").ENodeEntry<Value>) => import("slate").BaseRange[];
        } | null>;
        renderElement: import("jotai").Atom<{
            fn: import("../..").RenderElementFn<Value>;
        } | null>;
        renderLeaf: import("jotai").Atom<{
            fn: import("@udecode/slate").RenderLeafFn<Value>;
        } | null>;
    };
    scope?: Scope | undefined;
    extend: <ET, EN>(extendedState: ET, options?: Omit<import("../../atoms/createAtomStore").CreateAtomStoreOptions<{}, EN extends string ? EN : "plate">, "initialStore"> | undefined) => import("../../atoms/createAtomStore").AtomStoreApi<{
        id: Scope;
        editor: PlateEditor<Value>;
        rawPlugins: import("../..").PlatePlugin<import("@udecode/utils").AnyObject, Value, PlateEditor<Value>>[];
        readOnly: boolean;
        plugins: import("../..").WithPlatePlugin<import("@udecode/utils").AnyObject, Value, PlateEditor<Value>>[];
        value: Value;
    } & import("../..").Nullable<{
        isRendered: boolean;
        keyEditor: string;
        keySelection: string;
        keyDecorate: string;
        onChange: {
            fn: (value: Value) => void;
        };
        editorRef: {
            ref: import("react").ForwardedRef<PlateEditor<Value>>;
        };
        decorate: {
            fn: (entry: import("@udecode/slate").ENodeEntry<Value>) => import("slate").BaseRange[];
        };
        renderElement: {
            fn: import("../..").RenderElementFn<Value>;
        };
        renderLeaf: {
            fn: import("@udecode/slate").RenderLeafFn<Value>;
        };
    }> & ET, EN extends string ? EN : "plate">;
}, usePlateStore: (_id?: Scope | undefined) => {
    get: GetRecord<{
        id: Scope;
        editor: PlateEditor<Value>;
        rawPlugins: import("../..").PlatePlugin<import("@udecode/utils").AnyObject, Value, PlateEditor<Value>>[];
        readOnly: boolean;
        plugins: import("../..").WithPlatePlugin<import("@udecode/utils").AnyObject, Value, PlateEditor<Value>>[];
        value: Value;
    } & import("../..").Nullable<{
        isRendered: boolean;
        keyEditor: string;
        keySelection: string;
        keyDecorate: string;
        onChange: {
            fn: (value: Value) => void;
        };
        editorRef: {
            ref: import("react").ForwardedRef<PlateEditor<Value>>;
        };
        decorate: {
            fn: (entry: import("@udecode/slate").ENodeEntry<Value>) => import("slate").BaseRange[];
        };
        renderElement: {
            fn: import("../..").RenderElementFn<Value>;
        };
        renderLeaf: {
            fn: import("@udecode/slate").RenderLeafFn<Value>;
        };
    }>>;
    set: SetRecord<{
        id: Scope;
        editor: PlateEditor<Value>;
        rawPlugins: import("../..").PlatePlugin<import("@udecode/utils").AnyObject, Value, PlateEditor<Value>>[];
        readOnly: boolean;
        plugins: import("../..").WithPlatePlugin<import("@udecode/utils").AnyObject, Value, PlateEditor<Value>>[];
        value: Value;
    } & import("../..").Nullable<{
        isRendered: boolean;
        keyEditor: string;
        keySelection: string;
        keyDecorate: string;
        onChange: {
            fn: (value: Value) => void;
        };
        editorRef: {
            ref: import("react").ForwardedRef<PlateEditor<Value>>;
        };
        decorate: {
            fn: (entry: import("@udecode/slate").ENodeEntry<Value>) => import("slate").BaseRange[];
        };
        renderElement: {
            fn: import("../..").RenderElementFn<Value>;
        };
        renderLeaf: {
            fn: import("@udecode/slate").RenderLeafFn<Value>;
        };
    }>>;
    use: UseRecord<{
        id: Scope;
        editor: PlateEditor<Value>;
        rawPlugins: import("../..").PlatePlugin<import("@udecode/utils").AnyObject, Value, PlateEditor<Value>>[];
        readOnly: boolean;
        plugins: import("../..").WithPlatePlugin<import("@udecode/utils").AnyObject, Value, PlateEditor<Value>>[];
        value: Value;
    } & import("../..").Nullable<{
        isRendered: boolean;
        keyEditor: string;
        keySelection: string;
        keyDecorate: string;
        onChange: {
            fn: (value: Value) => void;
        };
        editorRef: {
            ref: import("react").ForwardedRef<PlateEditor<Value>>;
        };
        decorate: {
            fn: (entry: import("@udecode/slate").ENodeEntry<Value>) => import("slate").BaseRange[];
        };
        renderElement: {
            fn: import("../..").RenderElementFn<Value>;
        };
        renderLeaf: {
            fn: import("@udecode/slate").RenderLeafFn<Value>;
        };
    }>>;
};
export declare const usePlateSelectors: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(id?: Scope | undefined) => GetRecord<PlateStoreState<V, E>>;
export declare const usePlateActions: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(id?: Scope | undefined) => SetRecord<PlateStoreState<V, E>>;
export declare const usePlateStates: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(id?: Scope | undefined) => UseRecord<PlateStoreState<V, E>>;
//# sourceMappingURL=createPlateStore.d.ts.map