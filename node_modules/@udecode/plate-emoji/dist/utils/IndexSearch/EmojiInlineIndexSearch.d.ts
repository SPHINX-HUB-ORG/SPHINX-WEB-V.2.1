import { Emoji, IEmojiLibrary } from '../EmojiLibrary';
import { AIndexSearch } from './IndexSearch';
export declare class EmojiInlineIndexSearch extends AIndexSearch {
    protected library: IEmojiLibrary;
    protected static instance?: EmojiInlineIndexSearch;
    private constructor();
    static getInstance(): EmojiInlineIndexSearch;
    protected transform(emoji: Emoji): {
        key: string;
        text: string;
        data: {
            id: string;
            emoji: string;
            name: string;
            text: string;
        };
    };
}
//# sourceMappingURL=EmojiInlineIndexSearch.d.ts.map