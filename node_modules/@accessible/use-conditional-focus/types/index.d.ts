import * as React from 'react';
declare function useConditionalFocus<T extends Window>(target: T | null, shouldFocus?: boolean, options?: UseConditionalFocusOptions): void;
declare function useConditionalFocus<T extends Document>(target: T | null, shouldFocus?: boolean, options?: UseConditionalFocusOptions): void;
declare function useConditionalFocus<T extends HTMLElement>(target: React.RefObject<T> | T | null, shouldFocus?: boolean, options?: UseConditionalFocusOptions): void;
export declare type UseConditionalFocusOptions = {
    includeRoot?: boolean;
    preventScroll?: boolean;
};
export default useConditionalFocus;
