import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { locales, z } from "zod";

z.config(locales.pt());

export const loginSchema = z.object({
  email: z.email({ error: "Endereço de e-mail inválido" }),
  password: z
    .string({ error: "Obrigatório" })
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const useAutenticacaoForm = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  return form;
};
