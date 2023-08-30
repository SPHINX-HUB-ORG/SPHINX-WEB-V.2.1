import { BorderStyle, TTableCellElement } from '../../types';
export interface BorderStylesDefault {
    bottom: Required<BorderStyle>;
    right: Required<BorderStyle>;
    left?: Required<BorderStyle>;
    top?: Required<BorderStyle>;
}
export declare const getTableCellBorders: (element: TTableCellElement, { isFirstCell, isFirstRow, defaultBorder, }?: {
    defaultBorder?: Required<BorderStyle> | undefined;
    isFirstCell?: boolean | undefined;
    isFirstRow?: boolean | undefined;
}) => BorderStylesDefault;
//# sourceMappingURL=getTableCellBorders.d.ts.map