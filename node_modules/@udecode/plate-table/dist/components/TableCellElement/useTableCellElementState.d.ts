import { BorderStylesDefault } from './getTableCellBorders';
export declare type TableCellElementState = {
    colIndex: number;
    rowIndex: number;
    readOnly: boolean;
    hovered: boolean;
    hoveredLeft: boolean;
    selected: boolean;
    rowSize: number | undefined;
    borders: BorderStylesDefault;
};
export declare const useTableCellElementState: ({ ignoreReadOnly, }?: {
    /**
     * Ignores editable readOnly mode
     */
    ignoreReadOnly?: boolean | undefined;
}) => TableCellElementState;
//# sourceMappingURL=useTableCellElementState.d.ts.map