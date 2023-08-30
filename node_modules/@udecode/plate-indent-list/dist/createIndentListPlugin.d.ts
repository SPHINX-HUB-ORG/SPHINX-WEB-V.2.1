import { TElement } from '@udecode/plate-common';
import { GetSiblingIndentListOptions } from './queries/getSiblingIndentList';
import { ListStyleType } from './types';
export declare const KEY_LIST_STYLE_TYPE = "listStyleType";
export declare const KEY_LIST_START = "listStart";
export declare const KEY_LIST_RESTART = "listRestart";
export interface IndentListPlugin {
    getSiblingIndentListOptions?: GetSiblingIndentListOptions<TElement>;
    /**
     * Map html element to list style type.
     */
    getListStyleType?: (element: HTMLElement) => ListStyleType;
}
export declare const createIndentListPlugin: <OP = IndentListPlugin, OV extends import("@udecode/plate-common").Value = import("@udecode/plate-common").Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createIndentListPlugin.d.ts.map