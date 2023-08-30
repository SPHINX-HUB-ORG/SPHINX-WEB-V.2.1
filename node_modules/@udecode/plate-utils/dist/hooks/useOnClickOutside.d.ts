import { RefObject } from 'react';
export declare const DEFAULT_IGNORE_CLASS = "ignore-onclickoutside";
export interface UseOnClickOutsideCallback<T extends Event = Event> {
    (event: T): void;
}
declare type El = HTMLElement;
declare type Refs = RefObject<El>[];
export interface UseOnClickOutsideOptions {
    refs?: Refs;
    disabled?: boolean;
    eventTypes?: string[];
    excludeScrollbar?: boolean;
    ignoreClass?: string | string[];
    detectIFrame?: boolean;
}
export interface UseOnClickOutsideReturn {
    (element: El | null): void;
}
export declare const useOnClickOutside: (callback: UseOnClickOutsideCallback, { refs: refsOpt, disabled, eventTypes, excludeScrollbar, ignoreClass, detectIFrame, }?: UseOnClickOutsideOptions) => UseOnClickOutsideReturn;
export {};
//# sourceMappingURL=useOnClickOutside.d.ts.map