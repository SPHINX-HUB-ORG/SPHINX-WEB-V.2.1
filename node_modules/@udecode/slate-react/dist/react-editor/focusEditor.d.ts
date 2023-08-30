import { Value } from '@udecode/slate';
import { Location } from 'slate';
import { TReactEditor } from '../types/TReactEditor';
/**
 * Focus the editor. Extension:
 *
 * If `target` is defined:
 * - deselect the editor (otherwise it will focus the start of the editor)
 * - select the editor
 * - focus the editor
 */
export declare const focusEditor: <V extends Value>(editor: TReactEditor<V>, target?: Location | undefined) => void;
//# sourceMappingURL=focusEditor.d.ts.map