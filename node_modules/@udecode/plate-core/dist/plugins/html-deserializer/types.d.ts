import { TDescendant } from '@udecode/slate';
export declare type DeserializeHtmlChildren<N extends TDescendant> = ChildNode | N | string | null;
/**
 * De
 *
 */
export declare type DeserializeHtmlNodeReturnType<N extends TDescendant> = string | null | N[] | N | DeserializeHtmlChildren<N>[];
//# sourceMappingURL=types.d.ts.map