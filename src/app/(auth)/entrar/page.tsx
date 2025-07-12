"use client";

import { ControlledAuthTextInput } from "@/components/form/input/text-input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAutenticacao } from "@/core/autenticacao/autenticacao";
import {
  useAutenticacaoForm,
  type LoginSchema,
} from "@/core/autenticacao/autenticacao.form";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const { control, handleSubmit } = useAutenticacaoForm();
  const { entrar, autenticando } = useAutenticacao();

  const router = useRouter();

  function submitForm(data: LoginSchema) {
    entrar.mutate(data, {
      onSuccess: () => router.push("/home"),
    });
  }

  return (
    <form
      className="h-full w-full max-w-120 space-y-4 p-4"
      onSubmit={handleSubmit(submitForm)}
    >
      <ControlledAuthTextInput
        control={control}
        name="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
      />
      <ControlledAuthTextInput
        control={control}
        name="password"
        label="Senha"
        placeholder="Digite sua senha"
      />
      <Button className="w-full" disabled={autenticando} type="submit">
        Login {<Spinner className={cn("ml-2", { hidden: !autenticando })} />}
      </Button>
    </form>
  );
}
