/// <reference types="react" />
import { Value } from '@udecode/slate';
import { PlateEditor } from '../types/PlateEditor';
import { TEditableProps } from '../types/slate-react/TEditableProps';
import { PlateEditableExtendedProps } from './PlateEditable';
import { PlateProviderProps } from './PlateProvider';
export interface PlateProps<V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>> extends Omit<PlateProviderProps<V, E>, 'children'>, PlateEditableExtendedProps {
    editableProps?: TEditableProps<V>;
}
export declare const Plate: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>({ children, editableRef, firstChildren, renderEditable, editableProps, ...props }: PlateProps<V, E>) => JSX.Element;
//# sourceMappingURL=Plate.d.ts.map