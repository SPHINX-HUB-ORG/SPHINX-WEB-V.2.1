import { Value } from '@udecode/slate';
import { PlateEditor } from '../types/PlateEditor';
import { TEditableProps } from '../types/slate-react/TEditableProps';
/**
 * @see {@link Decorate}.
 * Optimization: return undefined if empty list so Editable uses a memo.
 */
export declare const pipeDecorate: <V extends Value>(editor: PlateEditor<V>, decorateProp?: ((entry: import("@udecode/slate").ENodeEntry<V>) => import("slate").BaseRange[]) | undefined) => ((entry: import("@udecode/slate").ENodeEntry<V>) => import("slate").BaseRange[]) | undefined;
//# sourceMappingURL=pipeDecorate.d.ts.map