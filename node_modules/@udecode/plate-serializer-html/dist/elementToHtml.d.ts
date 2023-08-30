import { ComponentClass, FunctionComponent } from 'react';
import { PlateEditor, PlateRenderElementProps, SlateProps, Value } from '@udecode/plate-common';
export declare const elementToHtml: <V extends Value>(editor: PlateEditor<V>, { props, slateProps, preserveClassNames, dndWrapper, }: {
    props: PlateRenderElementProps<V, import("@udecode/plate-common").ElementOf<import("@udecode/plate-common").TEditor<V>>>;
    slateProps?: Partial<SlateProps> | undefined;
    preserveClassNames?: string[] | undefined;
    dndWrapper?: string | FunctionComponent<{}> | ComponentClass<{}, any> | undefined;
}) => string;
//# sourceMappingURL=elementToHtml.d.ts.map