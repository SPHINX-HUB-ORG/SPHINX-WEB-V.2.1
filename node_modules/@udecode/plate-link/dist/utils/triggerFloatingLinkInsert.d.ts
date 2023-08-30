import { PlateEditor, Value } from '@udecode/plate-common';
/**
 * Trigger floating link.
 *
 * Do not trigger when:
 * - selection is across blocks
 * - selection has more than one leaf node
 * - lowest selection is not text
 * - selection has a link node
 */
export declare const triggerFloatingLinkInsert: <V extends Value>(editor: PlateEditor<V>, { focused, }?: {
    focused?: boolean | undefined;
}) => true | undefined;
//# sourceMappingURL=triggerFloatingLinkInsert.d.ts.map