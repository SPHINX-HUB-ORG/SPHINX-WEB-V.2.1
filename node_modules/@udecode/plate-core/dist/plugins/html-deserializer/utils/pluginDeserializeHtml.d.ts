import { Value } from '@udecode/slate';
import { AnyObject } from '@udecode/utils';
import { Nullable } from '../../../types';
import { PlateEditor } from '../../../types/PlateEditor';
import { DeserializeHtml } from '../../../types/plugin/DeserializeHtml';
import { WithPlatePlugin } from '../../../types/plugin/PlatePlugin';
/**
 * Get a deserializer by type, node names, class names and styles.
 */
export declare const pluginDeserializeHtml: <V extends Value>(editor: PlateEditor<V>, plugin: WithPlatePlugin<{}, V, PlateEditor<V>>, { element: el, deserializeLeaf, }: {
    element: HTMLElement;
    deserializeLeaf?: boolean | undefined;
}) => (Nullable<DeserializeHtml> & {
    node: AnyObject;
}) | undefined;
//# sourceMappingURL=pluginDeserializeHtml.d.ts.map