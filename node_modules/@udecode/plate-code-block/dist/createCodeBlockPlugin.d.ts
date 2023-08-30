import { PlateEditor, Value } from '@udecode/plate-common';
import { CodeBlockPlugin } from './types';
/**
 * Enables support for pre-formatted code blocks.
 */
export declare const createCodeBlockPlugin: <OP = CodeBlockPlugin, OV extends Value = Value, OE extends PlateEditor<OV> = PlateEditor<OV>>(override?: Partial<import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>> | undefined, overrideByKey?: import("@udecode/plate-common").OverrideByKey<OV, OE> | undefined) => import("@udecode/plate-common").PlatePlugin<import("@udecode/plate-common").NoInfer<OP>, OV, OE>;
//# sourceMappingURL=createCodeBlockPlugin.d.ts.map