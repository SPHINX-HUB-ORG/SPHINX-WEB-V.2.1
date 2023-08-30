export declare type ResizeDirection = 'top' | 'right' | 'bottom' | 'left';
export declare type ResizeLengthStatic = number;
export declare type ResizeLengthRelative = string;
export declare type ResizeLength = ResizeLengthStatic | ResizeLengthRelative;
export declare type ResizeEvent = {
    initialSize: ResizeLengthStatic;
    delta: ResizeLengthStatic;
    finished: boolean;
    direction: ResizeDirection;
};
//# sourceMappingURL=types.d.ts.map