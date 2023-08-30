import * as React from 'react';
import { Form } from '../../forms';
export declare const FormsView: ({ children, }: {
    children?: React.ReactChild | React.ReactChild[];
}) => JSX.Element;
export interface MultiformFormHeaderProps {
    activeForm: {
        activeFieldName?: string;
        tinaForm: Form;
    };
}
export declare const MultiformFormHeader: ({ activeForm, }: MultiformFormHeaderProps) => JSX.Element;
export interface FormHeaderProps {
    activeForm: {
        activeFieldName?: string;
        tinaForm: Form;
    };
}
export declare const FormHeader: ({ activeForm }: FormHeaderProps) => JSX.Element;
