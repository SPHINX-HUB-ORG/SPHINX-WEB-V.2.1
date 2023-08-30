import { MutableRefObject } from 'react';
import { EmojiCategoryList } from '../types';
import { IEmojiFloatingLibrary } from './EmojiLibrary';
import { MapEmojiCategoryList } from './EmojiPicker';
export declare type SetFocusedAndVisibleSectionsType = (visibleSections: MapEmojiCategoryList, categoryId?: EmojiCategoryList) => void;
export declare type ObserverCategoriesType = {
    ancestorRef: MutableRefObject<HTMLDivElement | null>;
    emojiLibrary: IEmojiFloatingLibrary;
    setFocusedAndVisibleSections: SetFocusedAndVisibleSectionsType;
};
export declare const observeCategories: ({ ancestorRef, emojiLibrary, setFocusedAndVisibleSections, }: ObserverCategoriesType) => IntersectionObserver;
//# sourceMappingURL=EmojiObserver.d.ts.map