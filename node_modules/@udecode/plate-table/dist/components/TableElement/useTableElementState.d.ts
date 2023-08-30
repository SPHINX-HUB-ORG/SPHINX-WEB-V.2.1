export interface TableElementState {
    colSizes: number[];
    isSelectingCell: boolean;
    minColumnWidth: number;
    marginLeft: number;
}
export declare const useTableElementState: ({ transformColSizes, }?: {
    /**
     * Transform node column sizes
     */
    transformColSizes?: ((colSizes: number[]) => number[]) | undefined;
}) => TableElementState;
//# sourceMappingURL=useTableElementState.d.ts.map