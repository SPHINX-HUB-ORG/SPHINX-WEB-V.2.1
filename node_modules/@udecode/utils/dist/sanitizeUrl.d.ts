export interface SanitizeUrlOptions {
    allowedSchemes?: string[];
    permitInvalid?: boolean;
}
export declare const sanitizeUrl: (url: string | undefined, { allowedSchemes, permitInvalid }: SanitizeUrlOptions) => string | null;
//# sourceMappingURL=sanitizeUrl.d.ts.map