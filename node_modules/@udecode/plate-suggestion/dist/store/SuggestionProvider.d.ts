import { ReactNode } from 'react';
import { WithPartial } from '@udecode/plate-common';
import { SuggestionUser, TSuggestion } from '../types';
export declare const SCOPE_SUGGESTION: unique symbol;
export interface SuggestionStoreState {
    /**
     * Users data.
     */
    users: Record<string, SuggestionUser>;
    currentUserId: string | null;
    /**
     * Suggestions data.
     */
    suggestions: Record<string, TSuggestion>;
    isSuggesting: boolean;
    /**
     * Id of the active suggestion. If null, no suggestion is active.
     */
    activeSuggestionId: string | null;
    onSuggestionAdd: ((value: Partial<TSuggestion>) => void) | null;
    onSuggestionUpdate: ((value: Pick<TSuggestion, 'id'> & Partial<Omit<TSuggestion, 'id'>>) => void) | null;
    onSuggestionDelete: ((id: string) => void) | null;
}
export declare const suggestionStore: {
    atom: {
        users: import("jotai").Atom<Record<string, SuggestionUser>>;
        currentUserId: import("jotai").Atom<string | null>;
        suggestions: import("jotai").Atom<Record<string, TSuggestion>>;
        isSuggesting: import("jotai").Atom<boolean>;
        activeSuggestionId: import("jotai").Atom<string | null>;
        onSuggestionAdd: import("jotai").Atom<((value: Partial<TSuggestion>) => void) | null>;
        onSuggestionUpdate: import("jotai").Atom<((value: Pick<TSuggestion, 'id'> & Partial<Omit<TSuggestion, 'id'>>) => void) | null>;
        onSuggestionDelete: import("jotai").Atom<((id: string) => void) | null>;
    };
    scope?: import("@udecode/plate-common").Scope | undefined;
    extend: <ET, EN>(extendedState: ET, options?: Omit<import("@udecode/plate-common").CreateAtomStoreOptions<{}, EN extends string ? EN : "suggestion">, "initialStore"> | undefined) => import("@udecode/plate-common").AtomStoreApi<SuggestionStoreState & ET, EN extends string ? EN : "suggestion">;
}, useSuggestionStore: (scope?: import("@udecode/plate-common").Scope | undefined) => {
    get: import("@udecode/plate-common").GetRecord<SuggestionStoreState>;
    set: import("@udecode/plate-common").SetRecord<SuggestionStoreState>;
    use: import("@udecode/plate-common").UseRecord<SuggestionStoreState>;
};
export declare const SuggestionProvider: ({ children, ...props }: Partial<SuggestionStoreState> & {
    children: ReactNode;
}) => JSX.Element;
export declare const useSuggestionStates: () => import("@udecode/plate-common").UseRecord<SuggestionStoreState>;
export declare const useSuggestionSelectors: () => import("@udecode/plate-common").GetRecord<SuggestionStoreState>;
export declare const useSuggestionActions: () => import("@udecode/plate-common").SetRecord<SuggestionStoreState>;
export declare const useSuggestionById: (id?: string | null | undefined) => TSuggestion | null;
export declare const useSuggestionUserById: (id: string | null) => SuggestionUser | null;
export declare const useCurrentSuggestionUser: () => SuggestionUser | null;
export declare const useUpdateSuggestion: (id?: string | null | undefined) => (value: Partial<TSuggestion>) => void;
export declare const useAddSuggestion: () => (value: WithPartial<TSuggestion, 'id' | 'userId' | 'createdAt'>) => void;
export declare const useRemoveSuggestion: () => (id: string | null) => void;
//# sourceMappingURL=SuggestionProvider.d.ts.map