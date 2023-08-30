import { AnchorHTMLAttributes } from 'react';
import { RangeBeforeOptions } from '@udecode/plate-common';
export declare const ELEMENT_LINK = "a";
export interface LinkPlugin {
    forceSubmit?: boolean;
    /**
     * Allow custom config for rangeBeforeOptions.
     * @example default
     * {
     *   matchString: ' ',
     *   skipInvalid: true,
     *   afterMatch: true,
     * }
     */
    rangeBeforeOptions?: RangeBeforeOptions;
    /**
     * Hotkeys to trigger floating link.
     * @default 'meta+k, ctrl+k'
     */
    triggerFloatingLinkHotkeys?: string | string[];
    /**
     * List of allowed URL schemes.
     * @default ['http', 'https', 'mailto', 'tel']
     */
    allowedSchemes?: string[];
    /**
     * Skips sanitation of links.
     * @default false
     */
    dangerouslySkipSanitization?: boolean;
    /**
     * Default HTML attributes for link elements.
     * @default {}
     */
    defaultLinkAttributes?: AnchorHTMLAttributes<HTMLAnchorElement>;
    /**
     * Keeps selected text on pasting links by default.
     * @default true
     */
    keepSelectedTextOnPaste?: boolean;
    /**
     * Callback to validate an url.
     * @default isUrl
     */
    isUrl?: (text: string) => boolean;
    /**
     * Callback to optionally get the href for a url
     * @returns href: an optional link to be used that is different from the text content (example https://google.com for google.com)
     */
    getUrlHref?: (url: string) => string | undefined;
    /**
     * On keyboard shortcut or toolbar mousedown, get the link url by calling this promise. The
     * default behavior is to use the browser's native `prompt`.
     */
    getLinkUrl?: (prevUrl: string | null) => Promise<string | null>;
}
/**
 * Enables support for hyperlinks.
 */
export declare const createLinkPlugin: <OP = LinkPlugin, OV extends import("@udecode/plate-common").Value = import("@udecode/plate-common").Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createLinkPlugin.d.ts.map