import { TText, Value } from '@udecode/plate-common';
import { MdastNode, RemarkPluginOptions } from './types';
export declare const remarkTransformText: <V extends Value>(node: MdastNode, options: RemarkPluginOptions<V>, inheritedMarkProps?: {
    [key: string]: boolean;
}) => TText | TText[];
//# sourceMappingURL=remarkTransformText.d.ts.map