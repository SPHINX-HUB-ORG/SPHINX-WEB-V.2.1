import { PlateEditor, Value, WithPlatePlugin } from '@udecode/plate-common';
import { SuggestionEditorProps, SuggestionPlugin } from './types';
export declare const withSuggestion: <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>, EE extends E & SuggestionEditorProps = E & SuggestionEditorProps>(e: E, plugin: WithPlatePlugin<SuggestionPlugin, V, E>) => EE;
//# sourceMappingURL=withSuggestion.d.ts.map