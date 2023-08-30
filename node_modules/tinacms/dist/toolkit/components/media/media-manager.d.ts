/// <reference types="react" />
import { Media } from '../../core';
export interface MediaRequest {
    directory?: string;
    onSelect?(_media: Media): void;
    close?(): void;
    allowDelete?: boolean;
}
export declare function MediaManager(): JSX.Element;
export declare function MediaPicker({ allowDelete, onSelect, close, ...props }: MediaRequest): JSX.Element;
