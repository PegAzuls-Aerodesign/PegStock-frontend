import { z } from "zod";

export const zStringRequired = z
  .string({ message: "Obrigatório" })
  .trim()
  .min(1, {
    message: "Obrigatório",
  });
export const zEmailSchema = zStringRequired.email({
  message: "E-mail inválido",
});
export const zStringNullish = z.string().nullish();

export const zNumberRequired = z.number({ message: "Obrigatório" });
export const zNumberPositiveRequired = zNumberRequired.positive({
  message: "Deve ser um número positivo",
});
export const zNumberNonNegativeRequired = zNumberRequired.nonnegative({
  message: "Deve ser um número não negativo",
});

export const zNumberNullish = z.number().nullish();

export const zBooleanDefaultFalse = z.boolean().default(false);
export const zBooleanDefaultTrue = z.boolean().default(true);

export const zDateRequired = z.date({ message: "Obrigatório" });
export const zDatePastRequired = zDateRequired.refine(
  (val) => {
    const today = new Date();
    return val < today;
  },
  {
    message: "Data deve ser no passado",
  },
);
export const zDateFutureRequired = zDateRequired.refine(
  (val) => {
    const today = new Date();
    return val > today;
  },
  {
    message: "Data deve ser no futuro",
  },
);
