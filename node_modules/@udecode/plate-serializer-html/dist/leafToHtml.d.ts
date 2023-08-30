import { PlateEditor, PlateRenderLeafProps, SlateProps, Value } from '@udecode/plate-common';
export declare const leafToHtml: <V extends Value>(editor: PlateEditor<V>, { props, slateProps, preserveClassNames, }: {
    props: PlateRenderLeafProps<V, import("@udecode/plate-common").TextOf<import("@udecode/plate-common").TEditor<V>>>;
    slateProps?: Partial<SlateProps> | undefined;
    preserveClassNames?: string[] | undefined;
}) => any;
//# sourceMappingURL=leafToHtml.d.ts.map