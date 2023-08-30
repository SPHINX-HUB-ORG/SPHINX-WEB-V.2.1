import { PlateEditor, Value } from '@udecode/plate-common';
import { ExitBreakRule } from '../types';
export declare const exitBreak: <V extends Value>(editor: PlateEditor<V>, { level, relative, defaultType, query, before, }: Omit<ExitBreakRule, 'hotkey'>) => true | undefined;
//# sourceMappingURL=exitBreak.d.ts.map