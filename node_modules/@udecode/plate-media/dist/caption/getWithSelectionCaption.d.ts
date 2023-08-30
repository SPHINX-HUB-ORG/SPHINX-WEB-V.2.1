import { PlateEditor, Value, WithPlatePlugin } from '@udecode/plate-common';
import { ImagePlugin } from '../image/index';
/**
 * TODO: tests
 * https://github.com/udecode/editor-protocol/issues/79
 */
/**
 * Selection table:
 * - If anchor is in table, focus in a block before: set focus to start of table
 * - If anchor is in table, focus in a block after: set focus to end of table
 * - If focus is in table, anchor in a block before: set focus to end of table
 * - If focus is in table, anchor in a block after: set focus to the point before start of table
 */
export declare const getWithSelectionCaption: (pluginKey: string) => <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(editor: E, plugin: WithPlatePlugin<ImagePlugin, V, E>) => E;
//# sourceMappingURL=getWithSelectionCaption.d.ts.map