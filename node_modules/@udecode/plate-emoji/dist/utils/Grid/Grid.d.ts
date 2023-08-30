import { GridElements, IGrid, IGridSection, SectionElements, SectionId } from './Grid.types';
export declare class Grid<R, T extends SectionId = SectionId> implements IGrid<R, T> {
    protected rowsCount: number;
    protected sectionsIds: T[];
    protected grid: Map<T, IGridSection<R, T>>;
    addSection(sectionId: T, section: IGridSection<R, T>, elements: GridElements): this;
    get size(): number;
    indexOf(sectionId: T): number;
    sections(): IGridSection<R, T>[];
    section(sectionId: T): IGridSection<R, T>;
    updateSection(sectionId: T, elements: SectionElements): this;
}
//# sourceMappingURL=Grid.d.ts.map