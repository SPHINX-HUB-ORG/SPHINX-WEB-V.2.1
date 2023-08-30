import { PlateEditor, RenderFunction, Value } from '@udecode/plate-common';
export declare type EmbedUrlData = {
    url?: string;
    provider?: string;
    id?: string;
    component?: RenderFunction<EmbedUrlData>;
};
export declare const parseMediaUrl: <V extends Value>(editor: PlateEditor<V>, { pluginKey, url, }: {
    pluginKey: string;
    url?: string | undefined;
}) => EmbedUrlData | undefined;
//# sourceMappingURL=parseMediaUrl.d.ts.map