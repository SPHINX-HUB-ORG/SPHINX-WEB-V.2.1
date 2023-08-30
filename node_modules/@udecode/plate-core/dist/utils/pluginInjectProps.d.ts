import { CSSProperties } from 'react';
import { EElement, EText, Value } from '@udecode/slate';
import { AnyObject } from '@udecode/utils';
import { PlateEditor } from '../types/PlateEditor';
import { WithPlatePlugin } from '../types/plugin/PlatePlugin';
export interface GetInjectPropsOptions<V extends Value = Value> {
    /**
     * Existing className.
     */
    className?: string;
    /**
     * Style value or className key.
     */
    element?: EElement<V>;
    /**
     * Style value or className key.
     */
    text?: EText<V>;
    /**
     * Existing style.
     */
    style?: CSSProperties;
}
export interface GetInjectPropsReturnType extends AnyObject {
    className?: string;
    style?: CSSProperties;
}
/**
 * Return if `element`, `text`, `nodeKey` is defined.
 * Return if `node.type` is not in `validTypes` (if defined).
 * Return if `value = node[nodeKey]` is not in `validNodeValues` (if defined).
 * If `classNames[value]` is defined, override `className` with it.
 * If `styleKey` is defined, override `style` with `[styleKey]: value`.
 */
export declare const pluginInjectProps: <V extends Value>(editor: PlateEditor<V>, { key, inject: { props } }: WithPlatePlugin<{}, V, PlateEditor<V>>, nodeProps: GetInjectPropsOptions<V>) => GetInjectPropsReturnType | undefined;
//# sourceMappingURL=pluginInjectProps.d.ts.map