import { zNumberPositiveRequired, zNumberRequired } from "@/lib/zod.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const commandMaterialSchema = z.object({
  materialCod: zNumberRequired,
  quantity: zNumberPositiveRequired,
});

export type CommandMaterialSchema = z.infer<typeof commandMaterialSchema>;

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
