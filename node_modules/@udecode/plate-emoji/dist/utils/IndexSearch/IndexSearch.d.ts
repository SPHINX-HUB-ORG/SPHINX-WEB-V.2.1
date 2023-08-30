import { TComboboxItem } from '@udecode/plate-combobox';
import { EmojiItemData } from '../../types';
import { Emoji, IEmojiLibrary } from '../EmojiLibrary';
declare type IndexSearchReturnData = TComboboxItem<EmojiItemData>;
interface IIndexSearch<R> {
    search: (input: string) => void;
    hasFound: () => boolean;
    get: () => R[];
}
export declare abstract class AIndexSearch<RData = IndexSearchReturnData> implements IIndexSearch<RData> {
    protected library: IEmojiLibrary;
    protected result: string[];
    protected scores: {};
    protected maxResult: number;
    protected input: string | undefined;
    protected constructor(library: IEmojiLibrary);
    search(input: string): this;
    private createSearchResult;
    private sortResultByScores;
    hasFound(exact?: boolean): boolean;
    get(): RData[];
    getEmoji(): RData | undefined;
    protected abstract transform(emoji: Emoji): RData;
}
export {};
//# sourceMappingURL=IndexSearch.d.ts.map