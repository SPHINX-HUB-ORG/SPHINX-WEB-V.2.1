import { PlatePlugin } from '@udecode/plate-common';
import { HeadingsPlugin } from './types';
/**
 * Enables support for headings with configurable levels
 * (from 1 to 6).
 */
export declare const createHeadingPlugin: <OP = HeadingsPlugin, OV extends import("@udecode/plate-common").Value = import("@udecode/plate-common").Value, OE extends import("@udecode/plate-common").PlateEditor<OV> = import("@udecode/plate-common").PlateEditor<OV>>(override?: Partial<PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createHeadingPlugin.d.ts.map