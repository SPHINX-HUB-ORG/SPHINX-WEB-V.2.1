import { PlateEditor, TElement, Value } from '@udecode/plate-common';
import { BorderDirection } from '../../types';
export declare const getOnSelectTableBorderFactory: <V extends Value>(editor: PlateEditor<V>, selectedCells: TElement[] | null) => (border: BorderDirection | 'outer' | 'none') => () => void;
//# sourceMappingURL=getOnSelectTableBorderFactory.d.ts.map