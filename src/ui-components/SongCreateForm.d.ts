/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SongCreateFormInputValues = {
    title?: string;
    description?: string;
    filePath?: string;
    like?: number;
    owner?: string;
};
export declare type SongCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    filePath?: ValidationFunction<string>;
    like?: ValidationFunction<number>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SongCreateFormOverridesProps = {
    SongCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    filePath?: PrimitiveOverrideProps<TextFieldProps>;
    like?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SongCreateFormProps = React.PropsWithChildren<{
    overrides?: SongCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SongCreateFormInputValues) => SongCreateFormInputValues;
    onSuccess?: (fields: SongCreateFormInputValues) => void;
    onError?: (fields: SongCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SongCreateFormInputValues) => SongCreateFormInputValues;
    onValidate?: SongCreateFormValidationValues;
} & React.CSSProperties>;
export default function SongCreateForm(props: SongCreateFormProps): React.ReactElement;
