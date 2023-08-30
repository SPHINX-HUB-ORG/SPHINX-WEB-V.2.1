import { ILocalStorage } from './LocalStorage.types';
export declare class LocalStorage<T> implements ILocalStorage<T> {
    protected key: string;
    protected defaultValue: T;
    constructor(key: string, defaultValue: T);
    set(value: any): void;
    get(): T;
}
//# sourceMappingURL=LocalStorage.d.ts.map