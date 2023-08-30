import { TEditor, Value } from '@udecode/slate';
import { ReactEditor } from 'slate-react';
export declare type TReactEditor<V extends Value = Value> = TEditor<V> & Pick<ReactEditor, 'insertData' | 'insertFragmentData' | 'insertTextData' | 'setFragmentData' | 'hasRange' | 'hasTarget' | 'hasEditableTarget' | 'hasSelectableTarget' | 'isTargetInsideNonReadonlyVoid'>;
//# sourceMappingURL=TReactEditor.d.ts.map