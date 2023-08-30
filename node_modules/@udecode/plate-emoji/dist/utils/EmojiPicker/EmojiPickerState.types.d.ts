import { EmojiCategoryList } from '../../types';
import { Emoji } from '../EmojiLibrary';
export declare type MapEmojiCategoryList = Map<EmojiCategoryList, boolean>;
export declare type EmojiPickerStateProps = {
    isOpen: boolean;
    searchValue: string;
    hasFound: boolean;
    isSearching: boolean;
    searchResult: Emoji[];
    visibleCategories: MapEmojiCategoryList;
    emoji?: Emoji;
    focusedCategory?: EmojiCategoryList;
    frequentEmoji?: string;
};
export declare type EmojiPickerStateDispatch = {
    type: string;
    payload?: Partial<EmojiPickerStateProps>;
};
//# sourceMappingURL=EmojiPickerState.types.d.ts.map