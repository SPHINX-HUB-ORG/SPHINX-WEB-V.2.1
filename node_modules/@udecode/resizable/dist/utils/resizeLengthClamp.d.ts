import { ResizeLength, ResizeLengthStatic } from '../types';
export interface ResizeLengthClampOptions<T = ResizeLength> {
    min?: T;
    max?: T;
}
export declare const resizeLengthClampStatic: (length: ResizeLengthStatic, { min, max }: ResizeLengthClampOptions<ResizeLengthStatic>) => ResizeLengthStatic;
export declare const resizeLengthClamp: <T extends ResizeLength>(length: T, parentLength: number, { min, max }: ResizeLengthClampOptions<ResizeLength>) => T;
//# sourceMappingURL=resizeLengthClamp.d.ts.map