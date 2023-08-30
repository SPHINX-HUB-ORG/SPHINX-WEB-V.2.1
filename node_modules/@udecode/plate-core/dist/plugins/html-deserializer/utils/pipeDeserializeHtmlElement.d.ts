import { Value } from '@udecode/slate';
import { AnyObject } from '@udecode/utils';
import { DeserializeHtml, PlateEditor } from '../../../types';
import { Nullable } from '../../../types/misc/Nullable';
export declare const pipeDeserializeHtmlElement: <V extends Value>(editor: PlateEditor<V>, element: HTMLElement) => (Nullable<DeserializeHtml> & {
    node: AnyObject;
}) | undefined;
//# sourceMappingURL=pipeDeserializeHtmlElement.d.ts.map