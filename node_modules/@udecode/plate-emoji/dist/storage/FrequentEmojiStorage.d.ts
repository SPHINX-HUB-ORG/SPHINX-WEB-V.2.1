import { FrequentEmojis, FrequentEmojiStorageProps, IFrequentEmojiStorage } from '../utils';
import { LocalStorage } from './LocalStorage';
export declare class FrequentEmojiStorage implements IFrequentEmojiStorage {
    protected defaultValue: FrequentEmojis;
    protected limit: number;
    protected prefix: string;
    protected key: "frequent";
    protected localStorage: LocalStorage<FrequentEmojis>;
    constructor(props: FrequentEmojiStorageProps, defaultValue?: FrequentEmojis);
    update(emojiId: string): FrequentEmojis;
    get(): FrequentEmojis;
    getList(): string[];
    set(value: any): void;
}
//# sourceMappingURL=FrequentEmojiStorage.d.ts.map