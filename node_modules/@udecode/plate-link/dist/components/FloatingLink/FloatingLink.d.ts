import { HTMLPropsAs } from '@udecode/plate-common';
import { UseVirtualFloatingOptions } from '@udecode/plate-floating';
export declare type FloatingLinkProps = HTMLPropsAs<'div'> & {
    floatingOptions?: UseVirtualFloatingOptions;
};
export declare const FloatingLinkEditRoot: import("@udecode/plate-common").Component<FloatingLinkProps>;
export declare const FloatingLinkInsertRoot: import("@udecode/plate-common").Component<FloatingLinkProps>;
export declare const FloatingLink: {
    EditRoot: import("@udecode/plate-common").Component<FloatingLinkProps>;
    InsertRoot: import("@udecode/plate-common").Component<FloatingLinkProps>;
    UrlInput: import("@udecode/plate-common").Component<import("@udecode/plate-common").AsProps<"input">>;
    TextInput: import("@udecode/plate-common").Component<import("@udecode/plate-common").AsProps<"input">>;
    NewTabInput: import("@udecode/plate-common").Component<import("@udecode/plate-common").AsProps<"input">>;
    EditButton: import("@udecode/plate-common").Component<import("@udecode/plate-common").AsProps<"button">>;
    UnlinkButton: import("@udecode/plate-common").Component<import("@udecode/plate-common").AsProps<"button">>;
    OpenLinkButton: import("@udecode/plate-common").Component<import("@udecode/plate-common").AsProps<"a">>;
};
//# sourceMappingURL=FloatingLink.d.ts.map