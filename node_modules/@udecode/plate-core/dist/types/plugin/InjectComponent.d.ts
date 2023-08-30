import { Value } from '@udecode/slate';
import { RenderFunction } from '../misc/RenderFunction';
import { PlateRenderElementProps } from '../PlateRenderElementProps';
export interface InjectComponentProps<V extends Value = Value> extends PlateRenderElementProps<V> {
    key: string;
}
export declare type InjectComponentReturnType<V extends Value = Value> = RenderFunction<PlateRenderElementProps<V>> | undefined;
export declare type InjectComponent<V extends Value = Value> = (props: InjectComponentProps<V>) => InjectComponentReturnType;
//# sourceMappingURL=InjectComponent.d.ts.map