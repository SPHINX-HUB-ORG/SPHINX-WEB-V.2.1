import { PlateId } from '../stores';
import { TEditableProps } from '../types/slate-react/TEditableProps';
export declare const useEditableProps: ({ id, ...editableProps }?: Omit<import("slate-react/dist/components/editable").EditableProps, "decorate" | "renderElement" | "renderLeaf"> & {
    decorate?: ((entry: import("@udecode/slate").ENodeEntry<import("@udecode/slate").Value>) => import("slate").BaseRange[]) | undefined;
    renderElement?: import("..").RenderElementFn<import("@udecode/slate").Value> | undefined;
    renderLeaf?: import("@udecode/slate").RenderLeafFn<import("@udecode/slate").Value> | undefined;
} & {
    id?: import("jotai/core/atom").Scope | undefined;
}) => TEditableProps;
//# sourceMappingURL=useEditableProps.d.ts.map