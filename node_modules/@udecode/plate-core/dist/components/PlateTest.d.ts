/// <reference types="react" />
import { Value } from '@udecode/slate';
import { PlateProps } from './Plate';
export declare const PlateTest: <V extends Value>({ variant, editableProps, normalizeInitialValue, ...props }: {
    variant?: "comment" | "wordProcessor" | undefined;
} & PlateProps<V, import("..").PlateEditor<V>>) => JSX.Element;
//# sourceMappingURL=PlateTest.d.ts.map