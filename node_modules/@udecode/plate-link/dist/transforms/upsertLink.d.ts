import { InsertNodesOptions, PlateEditor, UnwrapNodesOptions, Value, WrapNodesOptions } from '@udecode/plate-common';
import { CreateLinkNodeOptions } from '../utils/index';
export declare type UpsertLinkOptions<V extends Value = Value> = CreateLinkNodeOptions & {
    /**
     * If true, insert text when selection is in url.
     */
    insertTextInLink?: boolean;
    insertNodesOptions?: InsertNodesOptions<V>;
    unwrapNodesOptions?: UnwrapNodesOptions<V>;
    wrapNodesOptions?: WrapNodesOptions<V>;
    skipValidation?: boolean;
};
/**
 * If selection in a link or is not url:
 * - insert text with url, exit
 * If selection is expanded or `update` in a link:
 * - remove link node, get link text
 * Then:
 * - insert link node
 */
export declare const upsertLink: <V extends Value>(editor: PlateEditor<V>, { url, text, target, insertTextInLink, insertNodesOptions, skipValidation, }: UpsertLinkOptions<V>) => true | undefined;
//# sourceMappingURL=upsertLink.d.ts.map