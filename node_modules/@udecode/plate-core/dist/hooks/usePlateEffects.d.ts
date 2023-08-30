import { ForwardedRef } from 'react';
import { Value } from '@udecode/slate';
import { Nullable, PlateEditor, PlatePlugin, PlateStoreState, PluginOptions, TEditableProps } from '../types';
export declare type UsePlateEffectsProps<V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>> = Partial<Pick<PlateStoreState<V, E>, 'id' | 'value' | 'readOnly'>> & {
    plugins?: PlatePlugin<PluginOptions, V, E>[];
} & Nullable<{
    /**
     * If `true`, disable all the core plugins.
     * If an object, disable the core plugin properties that are `true` in the object.
     */
    disableCorePlugins?: {
        deserializeAst?: boolean;
        deserializeHtml?: boolean;
        editorProtocol?: boolean;
        eventEditor?: boolean;
        inlineVoid?: boolean;
        insertData?: boolean;
        history?: boolean;
        nodeFactory?: boolean;
        react?: boolean;
        selection?: boolean;
    } | boolean;
    /**
     * Controlled callback called when the editor state changes.
     */
    onChange?: (value: V) => void;
    /**
     * Access the editor object using a React ref.
     */
    editorRef?: ForwardedRef<E>;
    decorate?: TEditableProps<V>['decorate'];
    renderElement?: TEditableProps<V>['renderElement'];
    renderLeaf?: TEditableProps<V>['renderLeaf'];
}>;
export declare const usePlateEffects: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>({ id, disableCorePlugins, value: valueProp, onChange: onChangeProp, plugins: pluginsProp, editorRef: editorRefProp, decorate: decorateProp, renderElement: renderElementProp, renderLeaf: renderLeafProp, readOnly: readOnlyProp, }: UsePlateEffectsProps<V, E>) => void;
//# sourceMappingURL=usePlateEffects.d.ts.map