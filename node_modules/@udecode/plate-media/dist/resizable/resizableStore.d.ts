export declare const resizableStore: {
    atom: {
        width: import("jotai").Atom<import("csstype").Property.Width<string | number> | undefined>;
    };
    scope?: import("@udecode/plate-common").Scope | undefined;
    extend: <ET, EN>(extendedState: ET, options?: Omit<import("@udecode/plate-common").CreateAtomStoreOptions<{}, EN extends string ? EN : "resizable">, "initialStore"> | undefined) => import("@udecode/plate-common").AtomStoreApi<{
        width: import("csstype").Property.Width<string | number> | undefined;
    } & ET, EN extends string ? EN : "resizable">;
}, useResizableStore: (scope?: import("@udecode/plate-common").Scope | undefined) => {
    get: import("@udecode/plate-common").GetRecord<{
        width: import("csstype").Property.Width<string | number> | undefined;
    }>;
    set: import("@udecode/plate-common").SetRecord<{
        width: import("csstype").Property.Width<string | number> | undefined;
    }>;
    use: import("@udecode/plate-common").UseRecord<{
        width: import("csstype").Property.Width<string | number> | undefined;
    }>;
};
//# sourceMappingURL=resizableStore.d.ts.map