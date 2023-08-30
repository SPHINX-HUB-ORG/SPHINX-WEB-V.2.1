import { ENodeEntry, TEditor, Value } from '@udecode/plate-common';
import { IndentListPlugin } from './createIndentListPlugin';
export declare const normalizeIndentList: <V extends Value>(editor: TEditor<V>, { getSiblingIndentListOptions }?: IndentListPlugin) => ([node, path]: ENodeEntry<V>) => void;
//# sourceMappingURL=normalizeIndentList.d.ts.map