import { EmbedUrlData } from './parseMediaUrl';
export declare const mediaStore: {
    atom: {
        urlData: import("jotai").Atom<EmbedUrlData>;
    };
    scope?: import("@udecode/plate-common").Scope | undefined;
    extend: <ET, EN>(extendedState: ET, options?: Omit<import("@udecode/plate-common").CreateAtomStoreOptions<{}, EN extends string ? EN : "media">, "initialStore"> | undefined) => import("@udecode/plate-common").AtomStoreApi<{
        urlData: EmbedUrlData;
    } & ET, EN extends string ? EN : "media">;
}, useMediaStore: (scope?: import("@udecode/plate-common").Scope | undefined) => {
    get: import("@udecode/plate-common").GetRecord<{
        urlData: EmbedUrlData;
    }>;
    set: import("@udecode/plate-common").SetRecord<{
        urlData: EmbedUrlData;
    }>;
    use: import("@udecode/plate-common").UseRecord<{
        urlData: EmbedUrlData;
    }>;
};
//# sourceMappingURL=mediaStore.d.ts.map