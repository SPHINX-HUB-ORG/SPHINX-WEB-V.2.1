import React, { FC } from 'react';
import { Value } from '@udecode/slate';
import { PlateEditor, PlateStoreState } from '../types';
import { PlateProviderEffectsProps } from './PlateProviderEffects';
export interface PlateProviderProps<V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>> extends PlateProviderEffectsProps<V, E>, Partial<Pick<PlateStoreState<V, E>, 'id' | 'editor'>> {
    /**
     * Initial value of the editor.
     * @default [{ children: [{ text: '' }]}]
     */
    initialValue?: PlateStoreState<V>['value'];
    /**
     * When `true`, it will normalize the initial value passed to the `editor` once it gets created.
     * This is useful when adding normalization rules on already existing content.
     * @default false
     */
    normalizeInitialValue?: boolean;
}
export declare const PlateProvider: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(props: PlateProviderProps<V, E>) => JSX.Element;
export declare const withPlateProvider: <T>(Component: React.FC<T>, hocProps?: T | undefined) => React.FunctionComponent<T>;
//# sourceMappingURL=PlateProvider.d.ts.map