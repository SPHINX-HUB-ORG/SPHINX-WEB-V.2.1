export declare type FloatingLinkMode = '' | 'insert' | 'edit';
export declare const floatingLinkStore: import("@udecode/plate-common").StoreApi<"floatingLink", {
    openEditorId: string | null;
    mouseDown: boolean;
    updated: boolean;
    url: string;
    text: string;
    newTab: boolean;
    mode: FloatingLinkMode;
    isEditing: boolean;
}, import("@udecode/zustood").SetRecord<{
    openEditorId: string | null;
    mouseDown: boolean;
    updated: boolean;
    url: string;
    text: string;
    newTab: boolean;
    mode: FloatingLinkMode;
    isEditing: boolean;
}> & {
    state: import("@udecode/zustood").SetImmerState<{
        openEditorId: string | null;
        mouseDown: boolean;
        updated: boolean;
        url: string;
        text: string;
        newTab: boolean;
        mode: FloatingLinkMode;
        isEditing: boolean;
    }>;
    mergeState: import("@udecode/zustood").MergeState<{
        openEditorId: string | null;
        mouseDown: boolean;
        updated: boolean;
        url: string;
        text: string;
        newTab: boolean;
        mode: FloatingLinkMode;
        isEditing: boolean;
    }>;
} & {
    reset: () => void;
} & {
    show: (mode: FloatingLinkMode, editorId: string) => void;
    hide: () => void;
}, {
    isOpen: (editorId: string) => boolean;
}>;
export declare const floatingLinkActions: import("@udecode/zustood").SetRecord<{
    openEditorId: string | null;
    mouseDown: boolean;
    updated: boolean;
    url: string;
    text: string;
    newTab: boolean;
    mode: FloatingLinkMode;
    isEditing: boolean;
}> & {
    state: import("@udecode/zustood").SetImmerState<{
        openEditorId: string | null;
        mouseDown: boolean;
        updated: boolean;
        url: string;
        text: string;
        newTab: boolean;
        mode: FloatingLinkMode;
        isEditing: boolean;
    }>;
    mergeState: import("@udecode/zustood").MergeState<{
        openEditorId: string | null;
        mouseDown: boolean;
        updated: boolean;
        url: string;
        text: string;
        newTab: boolean;
        mode: FloatingLinkMode;
        isEditing: boolean;
    }>;
} & {
    reset: () => void;
} & {
    show: (mode: FloatingLinkMode, editorId: string) => void;
    hide: () => void;
};
export declare const floatingLinkSelectors: import("@udecode/zustood").StoreApiGet<{
    openEditorId: string | null;
    mouseDown: boolean;
    updated: boolean;
    url: string;
    text: string;
    newTab: boolean;
    mode: FloatingLinkMode;
    isEditing: boolean;
}, {
    isOpen: (editorId: string) => boolean;
}>;
export declare const useFloatingLinkSelectors: () => import("@udecode/zustood").StoreApiUse<{
    openEditorId: string | null;
    mouseDown: boolean;
    updated: boolean;
    url: string;
    text: string;
    newTab: boolean;
    mode: FloatingLinkMode;
    isEditing: boolean;
}, {
    isOpen: (editorId: string) => boolean;
}>;
//# sourceMappingURL=floatingLinkStore.d.ts.map