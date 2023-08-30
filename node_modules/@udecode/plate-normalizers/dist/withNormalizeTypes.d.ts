import { PlateEditor, Value, WithPlatePlugin } from '@udecode/plate-common';
import { NormalizeTypesPlugin } from './createNormalizeTypesPlugin';
export declare const withNormalizeTypes: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(editor: E, { options: { rules, onError } }: WithPlatePlugin<NormalizeTypesPlugin, V, E>) => E;
//# sourceMappingURL=withNormalizeTypes.d.ts.map