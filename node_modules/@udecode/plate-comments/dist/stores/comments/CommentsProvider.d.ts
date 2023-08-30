import { ReactNode } from 'react';
import { Value, WithPartial } from '@udecode/plate-common';
import { CommentUser, TComment } from '../../types';
export declare const SCOPE_COMMENTS: unique symbol;
export interface CommentsStoreState {
    /**
     * Id of the current user.
     */
    myUserId: string | null;
    /**
     * Users data.
     */
    users: Record<string, CommentUser>;
    /**
     * Comments data.
     */
    comments: Record<string, TComment>;
    /**
     * Id of the active comment. If null, no comment is active.
     */
    activeCommentId: string | null;
    addingCommentId: string | null;
    newValue: Value;
    focusTextarea: boolean;
    onCommentAdd: ((value: WithPartial<TComment, 'userId'>) => void) | null;
    onCommentUpdate: ((value: Pick<TComment, 'id'> & Partial<Omit<TComment, 'id'>>) => void) | null;
    onCommentDelete: ((id: string) => void) | null;
}
export declare const commentsStore: {
    atom: {
        myUserId: import("jotai").Atom<string | null>;
        users: import("jotai").Atom<Record<string, CommentUser>>;
        comments: import("jotai").Atom<Record<string, TComment>>;
        activeCommentId: import("jotai").Atom<string | null>;
        addingCommentId: import("jotai").Atom<string | null>;
        newValue: import("jotai").Atom<Value>;
        focusTextarea: import("jotai").Atom<boolean>;
        onCommentAdd: import("jotai").Atom<((value: WithPartial<TComment, 'userId'>) => void) | null>;
        onCommentUpdate: import("jotai").Atom<((value: Pick<TComment, 'id'> & Partial<Omit<TComment, 'id'>>) => void) | null>;
        onCommentDelete: import("jotai").Atom<((id: string) => void) | null>;
    };
    scope?: import("@udecode/plate-common").Scope | undefined;
    extend: <ET, EN>(extendedState: ET, options?: Omit<import("@udecode/plate-common").CreateAtomStoreOptions<{}, EN extends string ? EN : "comments">, "initialStore"> | undefined) => import("@udecode/plate-common").AtomStoreApi<CommentsStoreState & ET, EN extends string ? EN : "comments">;
}, useCommentsStore: (scope?: import("@udecode/plate-common").Scope | undefined) => {
    get: import("@udecode/plate-common").GetRecord<CommentsStoreState>; /**
     * Id of the current user.
     */
    set: import("@udecode/plate-common").SetRecord<CommentsStoreState>;
    use: import("@udecode/plate-common").UseRecord<CommentsStoreState>;
};
export declare const CommentsProvider: ({ children, ...props }: Partial<CommentsStoreState> & {
    children: ReactNode;
}) => JSX.Element;
export declare const useCommentsStates: () => import("@udecode/plate-common").UseRecord<CommentsStoreState>;
export declare const useCommentsSelectors: () => import("@udecode/plate-common").GetRecord<CommentsStoreState>;
export declare const useCommentsActions: () => import("@udecode/plate-common").SetRecord<CommentsStoreState>;
export declare const useCommentById: (id?: string | null | undefined) => TComment | null;
export declare const useUserById: (id: string | null) => CommentUser | null;
export declare const useMyUser: () => CommentUser | null;
export declare const useNewCommentText: () => string;
export declare const useResetNewCommentValue: () => () => void;
export declare const useUpdateComment: (id?: string | null | undefined) => (value: Partial<TComment>) => void;
export declare const useAddRawComment: () => (id: string) => void;
export declare const useAddComment: () => (value: WithPartial<TComment, 'id' | 'userId' | 'createdAt'>) => WithPartial<TComment, "userId">;
export declare const useRemoveComment: () => (id: string | null) => void;
//# sourceMappingURL=CommentsProvider.d.ts.map