/// <reference types="react" />
export declare const CheckboxGroupField: (props: import("./wrap-field-with-meta").InputFieldType<import("../components").CheckboxGroupProps, {}>) => JSX.Element;
export declare const CheckboxGroupFieldPlugin: {
    name: string;
    Component: (props: import("./wrap-field-with-meta").InputFieldType<import("../components").CheckboxGroupProps, {}>) => JSX.Element;
    validate(value: any, values: any, meta: any, field: any): string;
};
