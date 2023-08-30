import { FunctionComponent } from 'react';
import { AnyObject } from '@udecode/utils';
export declare type CreateHOCOptions<T> = Partial<T> & AnyObject & {
    /**
     * Set HOC by key.
     */
    key?: string;
    /**
     * Set HOC by key.
     */
    keys?: string[];
};
/**
 * Create components HOC by plugin key.
 */
export declare const createNodesHOC: <T>(HOC: FunctionComponent<T>) => (components: any, options: CreateHOCOptions<T> | CreateHOCOptions<T>[]) => any;
/**
 * Create components HOC by plugin key with a custom HOC.
 */
export declare const createNodesWithHOC: <T>(withHOC: (component: any, props: T) => any) => (components: any, options: CreateHOCOptions<T> | CreateHOCOptions<T>[]) => any;
//# sourceMappingURL=createNodesHOC.d.ts.map