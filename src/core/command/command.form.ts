import { isFutureDateRequired } from "@/lib/utils";
import {
  zNumberPositiveRequired,
  zNumberRequired,
  zStringRequired,
} from "@/lib/zod.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const commandMaterialSchema = z.object({
  materialCod: zNumberRequired,
  quantity: zNumberPositiveRequired,
});

export const commandBorrowSchema = z.object({
  materialCod: zNumberRequired,
  expirationDate: zStringRequired.refine(isFutureDateRequired, {
    message: "Data de validade deve ser no passado",
  }),
  quantity: zNumberPositiveRequired,
  borrower: zStringRequired,
  responsible: zStringRequired,
});

export type CommandMaterialSchema = z.infer<typeof commandMaterialSchema>;
export type CommandBorrowSchema = z.infer<typeof commandBorrowSchema>;

export const useCommandMaterialForm = (materialCod?: number) => {
  const form = useForm<CommandMaterialSchema>({
    resolver: zodResolver(commandMaterialSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      materialCod: materialCod,
      quantity: 1,
    },
  });

  return form;
};

export const useCommandBorrowForm = (materialCod?: number) => {
  const form = useForm<CommandBorrowSchema>({
    resolver: zodResolver(commandBorrowSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      materialCod: materialCod,
      quantity: 1,
      expirationDate: "",
      borrower: "",
      responsible: "",
    },
  });

  return form;
};
