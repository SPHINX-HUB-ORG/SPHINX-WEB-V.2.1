import { PlateEditor, TDescendant, Value } from '@udecode/plate-common';
import { DeserializeCsvParseOptions } from '../types';
export declare const deserializeCsv: <V extends Value>(editor: PlateEditor<V>, { data, ...parseOptions }: DeserializeCsvParseOptions & {
    data: string;
}) => TDescendant[] | undefined;
//# sourceMappingURL=deserializeCsv.d.ts.map