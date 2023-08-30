/// <reference types="react" />
export declare const SelectField: (props: import("./wrap-field-with-meta").InputFieldType<import("../components").SelectProps, {}>) => JSX.Element;
export declare const SelectFieldPlugin: {
    name: string;
    type: string;
    Component: (props: import("./wrap-field-with-meta").InputFieldType<import("../components").SelectProps, {}>) => JSX.Element;
    parse: (value?: string) => string;
    validate(value: any, values: any, meta: any, field: any): string;
};
