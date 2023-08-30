import { PlateEditor, Value, WithPlatePlugin } from '@udecode/plate-common';
import { CommentsPlugin } from './types';
export declare const withComments: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(editor: E, plugin: WithPlatePlugin<CommentsPlugin, V, E>) => E;
//# sourceMappingURL=withComments.d.ts.map