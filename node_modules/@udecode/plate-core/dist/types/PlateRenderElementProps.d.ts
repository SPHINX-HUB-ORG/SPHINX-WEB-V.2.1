import { EElement, TElement, Value } from '@udecode/slate';
import { TRenderElementProps } from './slate-react/TRenderElementProps';
import { PlateRenderNodeProps } from './PlateRenderNodeProps';
/**
 * Element props passed by Plate
 */
export declare type PlateRenderElementProps<V extends Value = Value, N extends TElement = EElement<V>> = PlateRenderNodeProps<V> & TRenderElementProps<V, N>;
//# sourceMappingURL=PlateRenderElementProps.d.ts.map