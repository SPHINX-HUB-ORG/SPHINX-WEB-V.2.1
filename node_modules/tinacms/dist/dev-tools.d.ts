/// <reference types="react" />
import type { TinaMarkdownContent } from './rich-text';
declare type RenderValue = (args: {
    value: unknown;
    keyName: string;
    parentValue: object | object[];
    parentKeyName: string;
}) => JSX.Element;
declare type RenderRichText = (args: {
    value: TinaMarkdownContent;
}) => JSX.Element;
export declare const Explorer: (props: {
    value: object;
    renderValue: RenderValue;
    renderRichText: RenderRichText;
}) => JSX.Element;
export declare function Json({ src, withDataTinaFieldState, }: {
    src: object;
    withDataTinaFieldState?: boolean;
}): JSX.Element;
export {};
