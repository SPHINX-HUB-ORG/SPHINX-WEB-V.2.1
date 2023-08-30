import { ComponentClass, FunctionComponent } from 'react';
import { EDescendant, PlateEditor, SlateProps, Value } from '@udecode/plate-common';
/**
 * Convert Slate Nodes into HTML string
 */
export declare const serializeHtml: <V extends Value>(editor: PlateEditor<V>, { nodes, slateProps, stripDataAttributes, preserveClassNames, stripWhitespace, convertNewLinesToHtmlBr, dndWrapper, }: {
    /**
     * Slate nodes to convert to HTML.
     */
    nodes: import("@udecode/plate-common").DescendantOf<import("@udecode/plate-common").TEditor<V>>[];
    /**
     * Enable stripping data attributes
     */
    stripDataAttributes?: boolean | undefined;
    /**
     * List of className prefixes to preserve from being stripped out
     */
    preserveClassNames?: string[] | undefined;
    /**
     * Slate props to provide if the rendering depends on slate hooks
     */
    slateProps?: Partial<SlateProps> | undefined;
    /**
     * Whether stripping whitespaces from serialized HTML
     * @default true
     */
    stripWhitespace?: boolean | undefined;
    /**
     * Optionally convert new line chars (\n) to HTML <br /> tags
     * @default false
     */
    convertNewLinesToHtmlBr?: boolean | undefined;
    /**
     *  Drag and drop component
     */
    dndWrapper?: string | FunctionComponent<{}> | ComponentClass<{}, any> | undefined;
}) => string;
//# sourceMappingURL=serializeHtml.d.ts.map