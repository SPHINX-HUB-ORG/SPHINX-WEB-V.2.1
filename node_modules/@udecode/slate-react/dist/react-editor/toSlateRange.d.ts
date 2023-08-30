import { Value } from '@udecode/slate';
import { ReactEditor } from 'slate-react';
import { TReactEditor } from '../types/TReactEditor';
/**
 * {@link ReactEditor.toSlateRange}
 */
export declare const toSlateRange: <V extends Value>(editor: TReactEditor<V>, domRange: Parameters<typeof ReactEditor.toSlateRange>[1], options: Parameters<typeof ReactEditor.toSlateRange>[2]) => import("slate").BaseRange | null | undefined;
//# sourceMappingURL=toSlateRange.d.ts.map