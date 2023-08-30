/// <reference types="react" />
import { Value } from '@udecode/slate';
import { PlateEditor } from '../types/PlateEditor';
import { PluginKey } from '../types/plugin/PlatePluginKey';
export declare const getPluginInjectProps: <V extends Value>(editor: PlateEditor<V>, key: PluginKey) => {
    classNames?: import("@udecode/utils").AnyObject | undefined;
    defaultNodeValue?: any;
    nodeKey?: string | undefined;
    styleKey?: keyof import("react").CSSProperties | undefined;
    transformClassName?: ((options: import("..").TransformOptions<V>) => any) | undefined;
    transformNodeValue?: ((options: import("..").TransformOptions<V>) => any) | undefined;
    transformStyle?: ((options: import("..").TransformOptions<V>) => import("react").CSSProperties) | undefined;
    validNodeValues?: any[] | undefined;
    validTypes?: string[] | undefined;
};
//# sourceMappingURL=getPluginInjectProps.d.ts.map