import { PlateEditor, Value } from '@udecode/plate-common';
import { UpsertLinkOptions } from './upsertLink';
/**
 * If the text is different than the link above text, replace link children by a new text.
 * The new text has the same marks than the first text replaced.
 */
export declare const upsertLinkText: <V extends Value>(editor: PlateEditor<V>, { text }: UpsertLinkOptions<V>) => void;
//# sourceMappingURL=upsertLinkText.d.ts.map