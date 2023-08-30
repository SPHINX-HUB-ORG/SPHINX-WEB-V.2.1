import { Value } from '@udecode/slate';
import { SetRecord } from '../atoms';
import { EXPOSED_STORE_KEYS, PlateStoreState } from './PlateStore';
export declare type PlateEditorMethods<V extends Value = Value> = {
    reset: () => void;
    redecorate: () => void;
    plate: {
        set: {
            [K in typeof EXPOSED_STORE_KEYS[number]]: ReturnType<SetRecord<PlateStoreState<V>>[K]>;
        };
    };
};
//# sourceMappingURL=PlateEditorMethods.d.ts.map