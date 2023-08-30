export declare const floatingMediaStore: import("@udecode/plate-common").StoreApi<"floatingMedia", {
    url: string;
    isEditing: boolean;
}, import("@udecode/zustood").SetRecord<{
    url: string;
    isEditing: boolean;
}> & {
    state: import("@udecode/zustood").SetImmerState<{
        url: string;
        isEditing: boolean;
    }>;
    mergeState: import("@udecode/zustood").MergeState<{
        url: string;
        isEditing: boolean;
    }>;
} & {
    reset: () => void;
}, {}>;
export declare const floatingMediaActions: import("@udecode/zustood").SetRecord<{
    url: string;
    isEditing: boolean;
}> & {
    state: import("@udecode/zustood").SetImmerState<{
        url: string;
        isEditing: boolean;
    }>;
    mergeState: import("@udecode/zustood").MergeState<{
        url: string;
        isEditing: boolean;
    }>;
} & {
    reset: () => void;
};
export declare const floatingMediaSelectors: import("@udecode/zustood").StoreApiGet<{
    url: string;
    isEditing: boolean;
}, {}>;
export declare const useFloatingMediaSelectors: () => import("@udecode/zustood").GetRecord<{
    url: string;
    isEditing: boolean;
}>;
//# sourceMappingURL=floatingMediaStore.d.ts.map