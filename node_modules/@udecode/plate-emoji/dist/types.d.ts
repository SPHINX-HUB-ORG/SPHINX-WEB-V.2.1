/// <reference types="react" />
import { TComboboxItem } from '@udecode/plate-combobox';
import { TEditableProps, Value } from '@udecode/plate-common';
import { IEmojiTriggeringController } from './utils';
declare type ReverseMap<T> = T[keyof T];
export declare type EmojiSettingsType = {
    buttonSize: {
        value: number;
    };
    categories: {
        value?: EmojiCategoryList[];
    };
    perLine: {
        value: number;
    };
    showFrequent: {
        value: boolean;
        limit?: number;
        key?: string;
        prefix?: string;
    };
};
export declare type EmojiComboboxProps = (editableProps: TEditableProps<Value>) => JSX.Element | null;
export declare type EmojiItemData = {
    id: string;
    emoji: string;
    name: string;
    text: string;
};
export interface CreateEmoji<TData extends EmojiItemData = EmojiItemData> {
    (data: TComboboxItem<TData>): string;
}
export interface EmojiPlugin<TData extends EmojiItemData = EmojiItemData> {
    trigger?: string;
    createEmoji?: CreateEmoji<TData>;
    emojiTriggeringController?: IEmojiTriggeringController;
    id?: string;
}
export declare const EmojiCategory: {
    readonly Activity: "activity";
    readonly Custom: "custom";
    readonly Flags: "flags";
    readonly Foods: "foods";
    readonly Frequent: "frequent";
    readonly Nature: "nature";
    readonly Objects: "objects";
    readonly People: "people";
    readonly Places: "places";
    readonly Symbols: "symbols";
};
export declare type EmojiCategoryList = ReverseMap<typeof EmojiCategory>;
export declare type i18nProps = {
    search: string;
    searchResult: string;
    clear: string;
    searchNoResultsTitle: string;
    searchNoResultsSubtitle: string;
    pick: string;
    categories: Record<EmojiCategoryList, string>;
    skins: Record<'choose' | '1' | '2' | '3' | '4' | '5' | '6', string>;
};
export declare type EmojiIconList<T = string> = {
    categories: Record<EmojiCategoryList, {
        outline: T;
        solid: T;
    }>;
    search: {
        loupe: T;
        delete: T;
    };
};
export declare type FindTriggeringInputProps = {
    char?: string;
    action?: 'insert' | 'delete';
};
export {};
//# sourceMappingURL=types.d.ts.map