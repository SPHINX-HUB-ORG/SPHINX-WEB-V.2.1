import { Emoji, IEmojiLibrary } from '../EmojiLibrary';
import { AIndexSearch } from './IndexSearch';
export declare class EmojiFloatingIndexSearch extends AIndexSearch<Emoji> {
    protected library: IEmojiLibrary;
    protected static instance?: EmojiFloatingIndexSearch;
    private constructor();
    static getInstance(library: IEmojiLibrary): EmojiFloatingIndexSearch;
    protected transform(emoji: Emoji): Emoji;
}
//# sourceMappingURL=EmojiFloatingIndexSearch.d.ts.map