import { Value } from '@udecode/slate';
import { SlateProps } from '@udecode/slate-react';
import { PlateId } from '../stores';
/**
 * Get Slate props stored in a global store.
 */
export declare const useSlateProps: <V extends Value>({ id, }: {
    id?: import("jotai/core/atom").Scope | undefined;
}) => Omit<SlateProps, 'children'>;
//# sourceMappingURL=useSlateProps.d.ts.map