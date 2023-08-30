import { PlateEditor, Value, WithPlatePlugin } from '@udecode/plate-common';
import { MentionPlugin } from './types';
export declare const withMention: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(editor: E, { options: { id, trigger, query, inputCreation }, }: WithPlatePlugin<MentionPlugin<undefined>, V, E>) => E;
//# sourceMappingURL=withMention.d.ts.map