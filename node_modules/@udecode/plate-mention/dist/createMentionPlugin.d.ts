import { MentionPlugin } from './types';
export declare const ELEMENT_MENTION = "mention";
export declare const ELEMENT_MENTION_INPUT = "mention_input";
/**
 * Enables support for autocompleting @mentions.
 */
export declare const createMentionPlugin: <OP = MentionPlugin<undefined>, OV extends import("@udecode/plate-common").Value = import("@udecode/plate-common").Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createMentionPlugin.d.ts.map