import { EmojiCategoryList, EmojiSettingsType } from '../../types';
import { EmojiFloatingGridType } from './EmojiFloatingGrid.types';
import { IEmojiFloatingLibrary, IFrequentEmojiStorage } from './EmojiFloatingLibrary.types';
import { EmojiInlineLibrary } from './EmojiInlineLibrary';
import { EmojiLibrary } from './EmojiLibrary.types';
export declare class EmojiFloatingLibrary extends EmojiInlineLibrary implements IEmojiFloatingLibrary {
    protected settings: EmojiSettingsType;
    protected localStorage: IFrequentEmojiStorage;
    protected library: EmojiLibrary;
    private static instance?;
    private categories;
    private emojis;
    private grid;
    private constructor();
    static getInstance(settings: EmojiSettingsType, localStorage: IFrequentEmojiStorage, library?: EmojiLibrary): EmojiFloatingLibrary;
    private initEmojis;
    updateFrequentCategory(emojiId: string): void;
    getGrid(): EmojiFloatingGridType;
    indexOf(focusedCategory: EmojiCategoryList): number;
}
//# sourceMappingURL=EmojiFloatingLibrary.d.ts.map