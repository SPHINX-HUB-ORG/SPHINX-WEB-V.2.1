import { DelayFunction } from "../types";
/**
 * Internal use of Subscription link
 * @private
 */
export declare class NonRetryableError extends Error {
    readonly nonRetryable = true;
    constructor(message: string);
}
/**
 * @private
 * Internal use of Subscription link
 */
export declare function retry(functionToRetry: Function, args: any[], delayFn: DelayFunction, attempt?: number): any;
/**
 * @private
 * Internal use of Subscription link
 */
export declare const jitteredExponentialRetry: (functionToRetry: Function, args: any[], maxDelayMs?: number) => any;
