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
import { type ListMaterialDto } from "./material.model";
import { Caixa, Categoria } from "./material.utils";

export const materialSchema = z.object({
  cod: zNumberNullish,
  name: zStringRequired,
  description: zStringNullish,
  quantity: zNumberNonNegativeRequired.int(
    "Quantidade deve ser um número inteiro",
  ),
  consumerQuantity: zNumberNonNegativeRequired.int(
    "Quantidade do consumidor deve ser um número inteiro",
  ),
  box: z.enum(Caixa, { error: "Caixa obrigatória" }),
  category: z.enum(Categoria, { error: "Categoria obrigatória" }),
  expirationDate: z
    .string()
    .refine(isFutureOptional, {
      message: "Data de validade deve ser no passado",
    })
    .optional(),
  createdDate: z.string({ error: "Data de criação obrigatória" }).optional(),
  registerDate: z.string({ error: "Data de registro obrigatória" }).optional(),
  lastAddDate: z
    .string({ error: "Data da última adição obrigatória" })
    .optional(),
  lastConsumitionDate: z
    .string({ error: "Data do último consumo obrigatória" })
    .optional(),
});

export type MaterialSchema = z.infer<typeof materialSchema>;

export const useMaterialForm = (material?: ListMaterialDto) => {
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
  createdDate: new Date().toISOString().split("T")[0],
  consumerQuantity: 0,
};
