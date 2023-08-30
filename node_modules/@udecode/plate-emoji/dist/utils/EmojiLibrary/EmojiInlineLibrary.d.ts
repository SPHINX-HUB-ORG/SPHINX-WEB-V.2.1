import { THash } from './EmojiInlineLibrary.types';
import { Emoji, EmojiLibrary, Emojis, IEmojiLibrary } from './EmojiLibrary.types';
export declare class EmojiInlineLibrary implements IEmojiLibrary {
    protected _hash: THash;
    protected _keys: string[];
    protected _emojis: Emojis;
    constructor(library?: EmojiLibrary);
    private init;
    private createSearchableString;
    private getName;
    get keys(): string[];
    getEmoji(id: string): Emoji;
    getEmojiId(key: string): string;
}
//# sourceMappingURL=EmojiInlineLibrary.d.ts.map