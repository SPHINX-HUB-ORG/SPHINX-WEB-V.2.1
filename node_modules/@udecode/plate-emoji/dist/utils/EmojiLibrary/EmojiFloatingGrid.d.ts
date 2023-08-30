import { RefObject } from 'react';
import { EmojiCategoryList } from '../../types';
import { AGridSection, Grid } from '../Grid';
export declare class EmojiFloatingGrid extends Grid<RefObject<HTMLDivElement>, EmojiCategoryList> {
    createRootRef(): RefObject<HTMLDivElement>;
}
export declare class EmojiGridSectionWithRoot extends AGridSection<RefObject<HTMLDivElement>, EmojiCategoryList> {
    protected createRootRef(): void;
}
//# sourceMappingURL=EmojiFloatingGrid.d.ts.map