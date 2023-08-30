export declare type Unknown = unknown;
export declare type GridRow = {
    id: number;
    elements: string[];
};
export declare type GridRows = GridRow[];
export declare type SectionId = string;
export declare type SectionElements = string[];
export interface IGridSection<R, T> {
    setIndexRowStart: (start: number) => this;
    getRows: () => GridRows;
    addElements: (elements: SectionElements) => this;
    updateElements: (elements: SectionElements) => this;
    id: T;
    rowsNum: number;
    root: R;
}
export declare type GridElements<S extends SectionId = SectionId> = Record<S, string[]>;
export interface IGrid<R, T extends SectionId> {
    updateSection: (sectionId: T, elements: SectionElements) => this;
    addSection: (sectionId: T, section: IGridSection<R, T>, elements: GridElements) => this;
    sections: () => IGridSection<R, T>[];
    section: (sectionId: T) => IGridSection<R, T>;
    indexOf: (sectionId: T) => number;
    size: number;
}
//# sourceMappingURL=Grid.types.d.ts.map