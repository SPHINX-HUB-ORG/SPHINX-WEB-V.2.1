import React from 'react';
import { SlateProps } from '@udecode/plate-common';
/**
 * Create a React element wrapped in a Slate provider.
 * By default, it will use an empty editor.
 * TODO: allow other providers
 */
export declare const createElementWithSlate: (slateProps?: Partial<SlateProps> | undefined, dndWrapper?: string | React.FunctionComponent<{}> | React.ComponentClass<{}, any> | undefined) => React.FunctionComponentElement<{
    editor: import("slate-react").ReactEditor;
    value: import("slate").Descendant[];
    children: React.ReactNode;
    onChange?: ((value: import("slate").Descendant[]) => void) | undefined;
}> | React.ReactElement<{}, string | React.JSXElementConstructor<any>>;
//# sourceMappingURL=createElementWithSlate.d.ts.map