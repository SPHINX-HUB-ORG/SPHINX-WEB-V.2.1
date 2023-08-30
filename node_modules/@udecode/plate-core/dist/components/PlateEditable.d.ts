import React, { ReactNode, Ref } from 'react';
import { Value } from '@udecode/slate';
import { PlateId } from '../stores';
import { TEditableProps } from '../types/slate-react/TEditableProps';
export interface PlateEditableExtendedProps {
    id?: PlateId;
    /**
     * The children rendered inside `Slate`, after `Editable`.
     */
    children?: ReactNode;
    /**
     * Ref to the `Editable` component.
     */
    editableRef?: Ref<HTMLDivElement>;
    /**
     * The first children rendered inside `Slate`, before `Editable`.
     * Slate DOM is not yet resolvable on first render, for that case use `children` instead.
     */
    firstChildren?: ReactNode;
    /**
     * Custom `Editable` node.
     */
    renderEditable?: (editable: ReactNode) => ReactNode;
}
export interface PlateEditableProps<V extends Value = Value> extends Omit<TEditableProps<V>, 'id'>, PlateEditableExtendedProps {
}
export declare const PlateEditable: <V extends Value = Value>({ children, renderEditable, editableRef, firstChildren, ...props }: PlateEditableProps<V>) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
//# sourceMappingURL=PlateEditable.d.ts.map