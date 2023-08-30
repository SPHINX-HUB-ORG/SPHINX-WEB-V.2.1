export interface Tabbables {
    documentOrder: number;
    tabIndex: number;
    node: HTMLElement | HTMLInputElement;
}
declare const tabbable: (el: HTMLElement, includeRootNode?: boolean) => HTMLElement[];
export default tabbable;
