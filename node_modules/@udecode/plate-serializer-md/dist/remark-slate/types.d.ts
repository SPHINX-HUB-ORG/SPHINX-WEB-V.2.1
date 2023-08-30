import { PlateEditor, TElement, Value } from '@udecode/plate-common';
export declare type MdastElementType = 'paragraph' | 'heading' | 'list' | 'listItem' | 'link' | 'image' | 'blockquote' | 'code' | 'thematicBreak';
export declare type MdastTextType = 'emphasis' | 'strong' | 'delete' | 'inlineCode' | 'html' | 'text';
export declare type MdastNodeType = MdastElementType | MdastTextType;
export interface MdastNode {
    type?: MdastNodeType;
    ordered?: boolean;
    value?: string;
    text?: string;
    children?: Array<MdastNode>;
    depth?: 1 | 2 | 3 | 4 | 5 | 6;
    url?: string;
    alt?: string;
    lang?: string;
    position?: any;
    spread?: any;
    checked?: any;
    indent?: any;
}
export declare type RemarkElementRule<V extends Value> = {
    transform: (node: MdastNode, options: RemarkPluginOptions<V>) => TElement | TElement[];
};
export declare type RemarkElementRules<V extends Value> = {
    [key in MdastElementType]?: RemarkElementRule<V>;
};
export declare type RemarkTextRule<V extends Value> = {
    mark?: (options: RemarkPluginOptions<V>) => string;
    transform?: (text: string) => string;
};
export declare type RemarkTextRules<V extends Value> = {
    [key in MdastTextType]?: RemarkTextRule<V>;
};
export declare type RemarkPluginOptions<V extends Value> = {
    editor: PlateEditor<V>;
    elementRules: RemarkElementRules<V>;
    textRules: RemarkTextRules<V>;
};
//# sourceMappingURL=types.d.ts.map