import { PlateEditor, Value } from '@udecode/plate-common';
import { Path } from 'slate';
import { BorderDirection } from '../types';
export declare const setBorderSize: <V extends Value>(editor: PlateEditor<V>, size: number, { at, border, }?: {
    at?: Path | undefined;
    border?: BorderDirection | "all" | undefined;
}) => void;
//# sourceMappingURL=setBorderSize.d.ts.map