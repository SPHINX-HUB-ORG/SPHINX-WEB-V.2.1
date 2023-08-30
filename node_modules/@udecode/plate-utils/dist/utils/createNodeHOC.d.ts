import React, { FunctionComponent } from 'react';
import { PlateRenderElementProps } from '@udecode/plate-core';
import { Value } from '@udecode/slate';
export declare const createNodeHOC: <V extends Value, T>(HOC: React.FunctionComponent<T>) => (Component: any, props: T) => (childrenProps: PlateRenderElementProps<V, import("@udecode/slate").ElementOf<import("@udecode/slate").TEditor<V>>>) => JSX.Element;
//# sourceMappingURL=createNodeHOC.d.ts.map