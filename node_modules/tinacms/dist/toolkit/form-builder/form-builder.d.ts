import * as React from 'react';
import { FC } from 'react';
import { Form } from '../forms';
export interface FormBuilderProps {
    form: {
        tinaForm: Form;
        activeFieldName?: string;
    };
    hideFooter?: boolean;
    label?: string;
    onPristineChange?: (_pristine: boolean) => unknown;
}
export declare const FormBuilder: FC<FormBuilderProps>;
export declare const FormStatus: ({ pristine }: {
    pristine: any;
}) => JSX.Element;
export declare const FormWrapper: ({ header, children, id, }: {
    header?: React.ReactNode;
    children: React.ReactNode;
    id: string;
}) => JSX.Element;
export declare const CreateBranchModel: ({ close, safeSubmit, relativePath, values, crudType, }: {
    safeSubmit: () => Promise<void>;
    close: () => void;
    relativePath: string;
    values: Record<string, unknown>;
    crudType: string;
}) => JSX.Element;
export declare const PrefixedTextField: ({ prefix, ...props }: {
    [x: string]: any;
    prefix?: string;
}) => JSX.Element;
