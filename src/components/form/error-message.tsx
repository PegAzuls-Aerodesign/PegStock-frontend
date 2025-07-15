import { capitalizar, cn } from "@/lib/utils";
import {
  type FieldError,
  type FieldErrors,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

interface NestedFieldError {
  path: string;
  message: string;
}

interface ErrorMessageProps {
  children: React.ReactNode;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
  return <p className="text-xs font-medium text-red-500">{children}</p>;
};

export const FormErrorsContainer = <T extends FieldValues>({
  form,
}: {
  form: UseFormReturn<T>;
}) => {
  const extractErrors = (
    errors: FieldErrors<T>,
    parentPath = "",
  ): NestedFieldError[] => {
    return Object.entries(errors).flatMap(([key, value]) => {
      const currentPath = parentPath ? `${parentPath}.${key}` : key;

      if (value && typeof value === "object") {
        if ("message" in value) {
          // É um FieldError
          return [
            {
              path: currentPath,
              message: (value as FieldError).message || "Erro desconhecido",
            },
          ];
        } else {
          // É um objeto aninhado
          return extractErrors(value as FieldErrors<T>, currentPath);
        }
      }
      return [];
    });
  };

  const errors = extractErrors(form.formState.errors);

  if (errors.length === 0) {
    return null;
  }

  return (
    <div
      className={cn("max-h-60 space-y-1 overflow-y-scroll bg-red-100 p-2", {
        hidden: errors.length === 0,
      })}
    >
      {errors.map((error, index) => (
        <ErrorMessage key={index}>
          <span className="font-semibold">{capitalizar(error.path)}:</span>{" "}
          {error.message}
        </ErrorMessage>
      ))}
    </div>
  );
};
