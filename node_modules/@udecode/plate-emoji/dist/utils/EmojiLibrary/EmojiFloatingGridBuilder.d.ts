import { EmojiCategoryList, EmojiSettingsType } from '../../types';
import { GridElements } from '../Grid';
import { EmojiFloatingGrid } from './EmojiFloatingGrid';
import { IFrequentEmojiStorage } from './EmojiFloatingLibrary.types';
export declare class EmojiFloatingGridBuilder {
    protected localStorage: IFrequentEmojiStorage;
    protected sections: EmojiCategoryList[];
    protected elements: GridElements;
    protected settings: EmojiSettingsType;
    protected grid: EmojiFloatingGrid;
    constructor(localStorage: IFrequentEmojiStorage, sections: EmojiCategoryList[], elements: GridElements, settings: EmojiSettingsType);
    private addFrequent;
    build(): EmojiFloatingGrid;
}
//# sourceMappingURL=EmojiFloatingGridBuilder.d.ts.map