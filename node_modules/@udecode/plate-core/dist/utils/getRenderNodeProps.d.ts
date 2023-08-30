import { Value } from '@udecode/slate';
import { AnyObject } from '@udecode/utils';
import { PlateRenderNodeProps } from '../types/PlateRenderNodeProps';
import { WithPlatePlugin } from '../types/plugin/PlatePlugin';
/**
 * Override node props with plugin props.
 * `props.element.attributes` are passed as `nodeProps`.
 * Extend the class name with the node type.
 */
export declare const getRenderNodeProps: <V extends Value>({ attributes, nodeProps, props, type, }: Pick<WithPlatePlugin<V, Value, import("..").PlateEditor<Value>>, "props" | "type"> & {
    attributes?: AnyObject | undefined;
    nodeProps: PlateRenderNodeProps<V, import("..").PlateEditor<V>>;
}) => PlateRenderNodeProps<V, import("..").PlateEditor<V>>;
//# sourceMappingURL=getRenderNodeProps.d.ts.map