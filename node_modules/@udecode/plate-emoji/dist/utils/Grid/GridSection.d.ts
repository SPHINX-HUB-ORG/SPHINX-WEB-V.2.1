import { GridRows, IGridSection, SectionElements, SectionId, Unknown } from './Grid.types';
export declare abstract class AGridSection<R extends Unknown, T = SectionId> implements IGridSection<R, T> {
    protected _id: T;
    protected perLine: number;
    protected rows: GridRows;
    protected _root: R;
    protected _rowsNum: number;
    protected _indexRowStart: number;
    constructor(_id: T, perLine?: number);
    protected abstract createRootRef(): void;
    setIndexRowStart(start: number): this;
    addElements(elements: SectionElements): this;
    updateElements(elements: SectionElements): this;
    private initRows;
    private addRow;
    get rowsNum(): number;
    get id(): T;
    get root(): R;
    getRows(): GridRows;
}
//# sourceMappingURL=GridSection.d.ts.map