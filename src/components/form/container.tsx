"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { type FieldValues, type UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface ContainerProps {
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
}

export const Container = ({
  title,
  subtitle,
  isLoading,
  children,
  className,
  showHeader = true,
}: ContainerProps) => {
  const hasHeaderContent = title || subtitle || isLoading;

  return (
    <div
      className={cn(
        "border-brand-white-50 flex w-full flex-col border-y bg-white pb-8",
        "lg:rounded-lg lg:border-x lg:pt-2",
        className,
      )}
    >
      <div
        className={cn("flex flex-row", {
          hidden: !showHeader || !hasHeaderContent,
        })}
      >
        <div
          className={cn(
            "flex grow flex-col gap-2 border-b border-slate-50 px-6 py-4",
            "lg:px-14 lg:py-6",
            { hidden: !title && !subtitle },
          )}
        >
          <h1
            className={cn("text-2xl font-semibold text-slate-600", {
              hidden: !title,
            })}
          >
            {title}
          </h1>
          <p className={cn("text-xs text-slate-500", { hidden: !subtitle })}>
            {subtitle}
          </p>
        </div>

        <div
          className={cn(
            "bg-opacity-90 flex h-full items-center justify-end bg-white px-6 py-4",
            "lg:px-14 lg:py-6",
            { hidden: !isLoading },
          )}
        >
          <Spinner className="size-12" />
        </div>
      </div>

      {children}
    </div>
  );
};

interface Props {
  title?: string;
  subtitle?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
  isLoading: boolean;
  isSubmitting: boolean;
  readOnly?: boolean;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
  hideFooter?: boolean;
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
        <Container
          title={props.title}
          subtitle={props.subtitle}
          isLoading={props.isLoading}
        >
          <form onSubmit={props.onSubmit} ref={ref}>
            <div className="flex flex-col gap-4 px-6 lg:px-14">
              {props.children}
            </div>
            <div className="flex flex-col items-end gap-2">
              <div
                className={cn(
                  "flex w-full justify-between px-6 pt-8",
                  "lg:px-14 lg:pl-6",
                  { "justify-end": !props.footerContent },
                )}
              >
                {props.footerContent}
                <div
                  className={cn("flex justify-end gap-2", {
                    hidden: props.hideFooter,
                  })}
                >
                  <Button
                    variant="destructive-ghost"
                    size="primary"
                    onClick={props.onCancel}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="primary"
                    type="submit"
                    disabled={props.isSubmitting}
                  >
                    {props.isSubmitting && <Spinner />}
                    Salvar informações
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Container>
      </FormContext.Provider>
    );
  },
);
FormContainer.displayName = "FormContainer";
