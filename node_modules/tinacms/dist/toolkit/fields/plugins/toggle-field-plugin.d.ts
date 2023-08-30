/// <reference types="react" />
export declare const ToggleField: (props: import("./wrap-field-with-meta").InputFieldType<import("../components").ToggleProps, {}>) => JSX.Element;
export declare const ToggleFieldPlugin: {
    name: string;
    type: string;
    Component: (props: import("./wrap-field-with-meta").InputFieldType<import("../components").ToggleProps, {}>) => JSX.Element;
    validate(value: any, values: any, meta: any, field: any): string;
};
