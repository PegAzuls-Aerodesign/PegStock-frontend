import { isFutureOptional } from "@/lib/utils";
import {
  zNumberNonNegativeRequired,
  zNumberNullish,
  zStringNullish,
  zStringRequired,
} from "@/lib/zod.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { MaterialMapper } from "./material.mapper";
import { type MaterialDto } from "./material.model";
import { Caixa, Categoria, MaterialStatusSchema } from "./material.utils";

export const materialSchema = z.object({
  cod: zNumberNullish,
  name: zStringRequired,
  description: zStringNullish,
  brand: zStringNullish,
  quantity: zNumberNonNegativeRequired.int(
    "Quantidade deve ser um número inteiro",
  ),
  category: z.enum(Categoria, { error: "Categoria obrigatória" }),
  box: z.enum(Caixa, { error: "Caixa obrigatória" }),
  expirationDate: z
    .string()
    .refine(isFutureOptional, {
      message: "Data de validade deve ser no passado",
    })
    .optional(),
  status: z.array(MaterialStatusSchema),
});

export type MaterialSchema = z.infer<typeof materialSchema>;

export const useMaterialForm = (material?: MaterialDto) => {
  const form = useForm<MaterialSchema>({
    resolver: zodResolver(materialSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: material
      ? MaterialMapper.dtoToSchema(material)
      : defaultValues,
  });

  const formReset = form.reset;

  useEffect(() => {
    if (material) {
      formReset(MaterialMapper.dtoToSchema(material));
    }
  }, [material, formReset]);

  return form;
};

const defaultValues = {
  status: [],
};
