import { capitalizar } from "@/lib/utils";
import { parse } from "date-fns";

export const getShortMonthName = (date: string) => {
  return capitalizar(
    parse(date, "yyyy-MM", new Date()).toLocaleString("pt-BR", {
      month: "short",
    }),
  );
};
