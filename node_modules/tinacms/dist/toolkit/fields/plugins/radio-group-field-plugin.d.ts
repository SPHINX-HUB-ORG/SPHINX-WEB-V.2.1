/// <reference types="react" />
export declare const RadioGroupField: (props: import("./wrap-field-with-meta").InputFieldType<import("../components").RadioGroupProps, {}>) => JSX.Element;
export declare const RadioGroupFieldPlugin: {
    name: string;
    Component: (props: import("./wrap-field-with-meta").InputFieldType<import("../components").RadioGroupProps, {}>) => JSX.Element;
    validate(value: any, values: any, meta: any, field: any): string;
};
