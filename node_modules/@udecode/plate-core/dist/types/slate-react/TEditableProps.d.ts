import { ENodeEntry, RenderLeafFn, Value } from '@udecode/slate';
import { Range } from 'slate';
import { EditableProps } from 'slate-react/dist/components/editable';
import { RenderElementFn } from './TRenderElementProps';
export declare type TEditableProps<V extends Value = Value> = Omit<EditableProps, 'decorate' | 'renderElement' | 'renderLeaf'> & {
    decorate?: (entry: ENodeEntry<V>) => Range[];
    renderElement?: RenderElementFn<V>;
    renderLeaf?: RenderLeafFn<V>;
};
//# sourceMappingURL=TEditableProps.d.ts.map