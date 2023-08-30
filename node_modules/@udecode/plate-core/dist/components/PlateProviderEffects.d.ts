import { ReactNode } from 'react';
import { Value } from '@udecode/slate';
import { UsePlateEffectsProps } from '../hooks';
import { PlateEditor } from '../types';
export interface PlateProviderEffectsProps<V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>> extends UsePlateEffectsProps<V, E> {
    children: ReactNode;
}
export declare const PlateProviderEffects: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>({ children, ...props }: PlateProviderEffectsProps<V, E>) => JSX.Element;
//# sourceMappingURL=PlateProviderEffects.d.ts.map