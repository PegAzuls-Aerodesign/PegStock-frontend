import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

type Value = string | number | boolean;

export interface Option<TValue extends Value> {
  value: TValue;
  label: string;
}

export function options<T, V extends Value>(
  dados: Array<T> | undefined,
  callback: (item: T) => [value: V, label: string],
): Array<Option<V>> {
  return (
    dados?.map((item) => {
      const [value, label] = callback(item);
      return { value, label };
    }) ?? []
  );
}
