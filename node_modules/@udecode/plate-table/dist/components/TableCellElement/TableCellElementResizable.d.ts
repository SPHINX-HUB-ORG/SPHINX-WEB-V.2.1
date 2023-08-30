import { HTMLPropsAs } from '@udecode/plate-common';
import { ResizeHandleProps } from '@udecode/resizable';
import { TableCellElementState } from './useTableCellElementState';
export declare type TableCellElementResizableProps = HTMLPropsAs<'div'> & Pick<TableCellElementState, 'colIndex' | 'rowIndex' | 'readOnly'> & {
    /**
     * Resize by step instead of by pixel.
     */
    step?: number;
    /**
     * Overrides for X and Y axes.
     */
    stepX?: number;
    stepY?: number;
};
export declare const useTableCellElementResizableProps: ({ colIndex, rowIndex, step, stepX, stepY, }: TableCellElementResizableProps) => {
    rightProps: ResizeHandleProps;
    bottomProps: ResizeHandleProps;
    leftProps: ResizeHandleProps;
};
export declare const TableCellElementResizable: import("@udecode/plate-common").Component<TableCellElementResizableProps>;
//# sourceMappingURL=TableCellElementResizable.d.ts.map