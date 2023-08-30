import { HTMLPropsAs, PlateRenderElementProps, Value } from '@udecode/plate-common';
import { TLinkElement } from '../types';
export declare type LinkRootProps = PlateRenderElementProps<Value, TLinkElement> & HTMLPropsAs<'a'>;
export declare const useLink: (props: LinkRootProps) => HTMLPropsAs<'a'>;
export declare const LinkRoot: import("@udecode/plate-common").Component<LinkRootProps>;
export declare const Link: {
    Root: import("@udecode/plate-common").Component<LinkRootProps>;
};
//# sourceMappingURL=Link.d.ts.map