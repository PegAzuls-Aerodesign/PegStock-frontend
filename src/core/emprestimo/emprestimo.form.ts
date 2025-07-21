"use client";

import { isFutureOptional } from "@/lib/utils";
import {
  zNumberNonNegativeRequired,
  zNumberNullish,
  zNumberRequired,
  zStringRequired,
} from "@/lib/zod.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { EmprestimoMapper } from "./emprestimo.mapper";
import { type EmprestimoDto } from "./emprestimo.model";

export const emprestimoSchema = z.object({
  cod: zNumberNullish,
  materialCod: zNumberRequired,
  expirationDate: zStringRequired.refine(isFutureOptional, {
    message: "Data de validade deve ser no futuro",
  }),
  quantity: zNumberNonNegativeRequired.int(
    "Quantidade deve ser um número inteiro",
  ),
  borrower: zStringRequired,
  responsible: zStringRequired,
});

export type EmprestimoSchema = z.infer<typeof emprestimoSchema>;

export const useEmprestimoForm = (emprestimo?: EmprestimoDto) => {
  const form = useForm<EmprestimoSchema>({
    resolver: zodResolver(emprestimoSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: emprestimo
      ? EmprestimoMapper.dtoToSchema(emprestimo)
      : undefined,
  });

  const formReset = form.reset;

  useEffect(() => {
    if (emprestimo) {
      formReset(EmprestimoMapper.dtoToSchema(emprestimo));
    }
  }, [emprestimo, formReset]);

  return form;
};
