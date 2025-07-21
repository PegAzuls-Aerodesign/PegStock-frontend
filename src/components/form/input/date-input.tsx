import { ErrorMessage } from "@/components/form/error-message";
import { Input } from "@/components/ui/input";
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
import { type GenericInputProps } from "./generic-input";

export interface DateInputProps extends Omit<GenericInputProps, "type"> {}

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, icon, ...props }, ref) => {
    const formProps = useFormProps();

    return (
      <FloatingLabel
        label={label}
        disabled={props.disabled || formProps?.disabled}
        readOnly={props.readOnly}
      >
        <Input type="date" {...props} {...formProps} ref={ref} />
        {icon}
      </FloatingLabel>
    );
  },
);

DateInput.displayName = "DateInput";

interface ControlledDateInputProps<
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
> extends Omit<DateInputProps, "label" | "value" | "onChange" | "type"> {
  control: Control<TForm>;
  name: string extends PathValue<TForm, TField> ? TField : never;
  label?: string;
}

export const ControlledDateInput = <
  TForm extends FieldValues,
  TField extends FieldPath<TForm>,
>({
  control,
  name,
  label,
  isRequired,
  ...props
}: ControlledDateInputProps<TForm, TField>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <DateInput
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
