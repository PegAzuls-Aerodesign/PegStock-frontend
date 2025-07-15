import { ErrorMessage } from "@/components/form/error-message";
import { Input, type InputProps } from "@/components/ui/input";
import React from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from "react-hook-form";
import { useFormProps } from "../container";
import { FloatingLabel } from "../floating-label";

export interface GenericInputProps extends Omit<InputProps, "value"> {
  value?: string | number | readonly string[] | undefined;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  isRequired?: boolean;
}

export const GenericInput = React.forwardRef<
  HTMLInputElement,
  GenericInputProps
>(({ label, icon, ...props }, ref) => {
  const formProps = useFormProps();

  return (
    <FloatingLabel
      label={label}
      disabled={props.disabled || formProps?.disabled}
      readOnly={props.readOnly}
    >
      <Input {...props} {...formProps} ref={ref} />
      {icon}
    </FloatingLabel>
  );
});

GenericInput.displayName = "GenericInput";

interface ControlledGenericInputProps<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
> extends Omit<GenericInputProps, "label" | "value" | "onChange"> {
  control: Control<TForm>;
  name: string extends PathValue<TForm, TField> ? TField : never;
  label?: string;
}

export const ControlledGenericInput = <
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
>({
  control,
  name,
  label,
  isRequired,
  ...props
}: ControlledGenericInputProps<TForm, TField>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <GenericInput
            label={
              <span className={fieldState.error && "text-red-500"}>
                {label} {isRequired && <span className="text-red-500">*</span>}
              </span>
            }
            {...field}
            {...props}
          />
          {fieldState.error && (
            <ErrorMessage>{fieldState.error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};
