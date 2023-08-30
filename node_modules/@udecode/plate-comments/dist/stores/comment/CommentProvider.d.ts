import { ReactNode } from 'react';
import { Scope, Value } from '@udecode/plate-common';
import { CommentUser, TComment } from '../../types';
export declare const SCOPE_COMMENT: unique symbol;
export declare const SCOPE_ACTIVE_COMMENT: unique symbol;
export interface CommentStoreState {
    id: string;
    isMenuOpen: boolean;
    editingValue: Value | null;
}
export declare const commentStore: {
    atom: {
        id: import("jotai").Atom<string>;
        isMenuOpen: import("jotai").Atom<boolean>;
        editingValue: import("jotai").Atom<Value | null>;
    };
    scope?: Scope | undefined;
    extend: <ET, EN>(extendedState: ET, options?: Omit<import("@udecode/plate-common").CreateAtomStoreOptions<{}, EN extends string ? EN : "comment">, "initialStore"> | undefined) => import("@udecode/plate-common").AtomStoreApi<CommentStoreState & ET, EN extends string ? EN : "comment">;
}, useCommentStore: (scope?: Scope | undefined) => {
    get: import("@udecode/plate-common").GetRecord<CommentStoreState>;
    set: import("@udecode/plate-common").SetRecord<CommentStoreState>;
    use: import("@udecode/plate-common").UseRecord<CommentStoreState>;
};
export declare const useCommentStates: () => import("@udecode/plate-common").UseRecord<CommentStoreState>;
export declare const useCommentSelectors: () => import("@udecode/plate-common").GetRecord<CommentStoreState>;
export declare const useCommentActions: () => import("@udecode/plate-common").SetRecord<CommentStoreState>;
export declare const CommentProvider: ({ children, scope, ...props }: Partial<CommentStoreState> & {
    children: ReactNode;
    scope?: Scope | undefined;
}) => JSX.Element;
export declare const useCommentUser: (scope?: Scope | undefined) => CommentUser | null;
export declare const useCommentReplies: (scope?: Scope | undefined) => Record<string, TComment>;
export declare const useComment: (scope?: Scope | undefined) => TComment | null;
export declare const useCommentText: (scope?: Scope | undefined) => string | null;
export declare const useEditingCommentText: () => string | null;
//# sourceMappingURL=CommentProvider.d.ts.map