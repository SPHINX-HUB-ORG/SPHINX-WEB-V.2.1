/**
 * Merge props by composing handlers.
 */
export declare const mergeProps: <T>(props?: T | undefined, overrideProps?: T | undefined, { handlerKeys, handlerQuery, }?: {
    /**
     * The keys of the handlers to merge.
     */
    handlerKeys?: string[] | undefined;
    /**
     * A function that returns true if it's a handler to merge.
     *
     * Default: keys having `on` prefix.
     */
    handlerQuery?: ((key: string) => boolean) | null | undefined;
}) => T;
//# sourceMappingURL=mergeProps.d.ts.map