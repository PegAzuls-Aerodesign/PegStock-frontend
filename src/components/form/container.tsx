"use client";

import React from "react";
import { type FieldValues, type UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface Props {
  title: string;
  subtitle: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
  isLoading: boolean;
  isSubmitting: boolean;
  children: React.ReactNode;
}

export interface FormProps<TSchema extends FieldValues>
  extends Omit<Props, "children"> {
  form: UseFormReturn<TSchema>;
}

const FormContext = React.createContext<Props | undefined>(undefined);

export const useFormProps = () => {
  const formContext = React.useContext(FormContext);
  if (!formContext?.isLoading) {
    return undefined;
  }

  return {
    disabled: formContext.isLoading,
    placeholder: formContext.isLoading ? "Carregando..." : undefined,
  };
};

export const FormContainer = React.forwardRef<HTMLFormElement, Props>(
  (props, ref) => {
    return (
      <FormContext.Provider value={props}>
        <div className="border-brand-white-50 flex w-full flex-col border-y bg-white pb-8 lg:rounded-lg lg:border-x lg:pt-2">
          <div className="flex flex-row">
            <div className="flex grow flex-col gap-2 border-b border-slate-50 px-6 py-4 lg:px-14 lg:py-6">
              <h1 className="text-2xl font-semibold text-slate-600">
                {props.title}
              </h1>
              <p className="text-xs text-slate-500">{props.subtitle}</p>
            </div>
            {props.isLoading && (
              <div className="bg-opacity-90 flex h-full items-center justify-end bg-white px-6 py-4 lg:px-14 lg:py-6">
                <Spinner className="size-12" />
              </div>
            )}
          </div>
          <form onSubmit={props.onSubmit} ref={ref}>
            <div className="flex flex-col gap-4 px-6 lg:px-14">
              {props.children}
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex justify-end gap-2 px-6 pt-8 lg:px-14">
                <Button
                  variant="destructive-ghost"
                  className="px-16"
                  onClick={props.onCancel}
                >
                  Cancelar
                </Button>
                <Button
                  className="px-16"
                  type="submit"
                  disabled={props.isSubmitting}
                >
                  {props.isSubmitting && <Spinner />}
                  Salvar informações
                </Button>
              </div>
            </div>
          </form>
        </div>
      </FormContext.Provider>
    );
  },
);
FormContainer.displayName = "FormContainer";
