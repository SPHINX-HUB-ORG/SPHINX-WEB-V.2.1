/// <reference types="react" />
declare global {
    interface Window {
        twttr: any;
    }
}
declare type TwitterEmbedOptions = {
    cards?: 'hidden';
    theme?: 'dark' | 'light';
};
export declare type TweetProps = Readonly<{
    loadingComponent?: JSX.Element | string;
    onError?: (error: string) => void;
    onLoad?: () => void;
    tweetId: string;
    twitterOptions?: TwitterEmbedOptions;
}>;
export declare const Tweet: ({ tweetId, onError, onLoad, loadingComponent, twitterOptions, }: TweetProps) => JSX.Element;
export {};
//# sourceMappingURL=Tweet.d.ts.map