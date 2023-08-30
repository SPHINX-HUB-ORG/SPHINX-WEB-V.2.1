import { PlateEditor, Value, WithPlatePlugin } from '@udecode/plate-common';
import { EmojiPlugin } from './types';
export declare const withEmoji: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(editor: E, { options: { id, emojiTriggeringController }, }: WithPlatePlugin<EmojiPlugin<import("./types").EmojiItemData>, V, E>) => E;
//# sourceMappingURL=withEmoji.d.ts.map