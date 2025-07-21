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

export type NonEmptyArray<T> = [T, ...T[]];

export function isPastDate(date: string | Date | null | undefined): boolean {
  if (!date) {
    return false;
  }
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime()) && parsedDate < new Date();
}

export function isFutureDateRequired(
  date: string | Date | null | undefined,
): boolean {
  if (!date) {
    return false;
  }
  return !isPastDate(date);
}

export function isFutureOptional(
  date: string | Date | null | undefined,
): boolean {
  if (!date) {
    return true; // Se a data for nula ou indefinida, consideramos como válida
  }
  return isFutureDateRequired(date);
}

export function capitalizar(palavra: string) {
  return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
}

// Função para formatar a data no padrão pt-BR
export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
