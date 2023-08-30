import { EmojiTriggeringControllerOptions, IEmojiTriggeringController } from './EmojiTriggeringController.types';
export declare class EmojiTriggeringController implements IEmojiTriggeringController {
    protected options: EmojiTriggeringControllerOptions;
    private _isTriggering;
    private _hasTriggeringMark;
    protected text: string;
    protected pos: any;
    constructor(options?: EmojiTriggeringControllerOptions);
    get isTriggering(): boolean;
    setIsTriggering(isTriggering: boolean): this;
    get hasTriggeringMark(): boolean;
    hasEnclosingTriggeringMark(): boolean;
    setText(text: string): this;
    private startsWithTriggeringMark;
    private endsWithEnclosingMark;
    getText(): string;
    getTextSize(): number;
    reset(): this;
}
//# sourceMappingURL=EmojiTriggeringController.d.ts.map