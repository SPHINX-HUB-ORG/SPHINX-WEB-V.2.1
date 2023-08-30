import { TElement } from '@udecode/plate-common';
export declare type TableStoreSizeOverrides = Map<number, number>;
export declare const tableStore: {
    atom: {
        colSizeOverrides: import("jotai").Atom<TableStoreSizeOverrides>;
        rowSizeOverrides: import("jotai").Atom<TableStoreSizeOverrides>;
        marginLeftOverride: import("jotai").Atom<number | null>;
        hoveredColIndex: import("jotai").Atom<number | null>;
        selectedCells: import("jotai").Atom<TElement[] | null>;
    };
    scope?: import("@udecode/plate-common").Scope | undefined;
    extend: <ET, EN>(extendedState: ET, options?: Omit<import("@udecode/plate-common").CreateAtomStoreOptions<{}, EN extends string ? EN : "table">, "initialStore"> | undefined) => import("@udecode/plate-common").AtomStoreApi<{
        colSizeOverrides: TableStoreSizeOverrides;
        rowSizeOverrides: TableStoreSizeOverrides;
        marginLeftOverride: number | null;
        hoveredColIndex: number | null;
        selectedCells: TElement[] | null;
    } & ET, EN extends string ? EN : "table">;
}, useTableStore: (scope?: import("@udecode/plate-common").Scope | undefined) => {
    get: import("@udecode/plate-common").GetRecord<{
        colSizeOverrides: TableStoreSizeOverrides;
        rowSizeOverrides: TableStoreSizeOverrides;
        marginLeftOverride: number | null;
        hoveredColIndex: number | null;
        selectedCells: TElement[] | null;
    }>;
    set: import("@udecode/plate-common").SetRecord<{
        colSizeOverrides: TableStoreSizeOverrides;
        rowSizeOverrides: TableStoreSizeOverrides;
        marginLeftOverride: number | null;
        hoveredColIndex: number | null;
        selectedCells: TElement[] | null;
    }>;
    use: import("@udecode/plate-common").UseRecord<{
        colSizeOverrides: TableStoreSizeOverrides;
        rowSizeOverrides: TableStoreSizeOverrides;
        marginLeftOverride: number | null;
        hoveredColIndex: number | null;
        selectedCells: TElement[] | null;
    }>;
};
export declare const useOverrideColSize: () => (index: number, size: number | null) => void;
export declare const useOverrideRowSize: () => (index: number, size: number | null) => void;
export declare const useOverrideMarginLeft: () => (value: number | null) => void;
//# sourceMappingURL=tableStore.d.ts.map