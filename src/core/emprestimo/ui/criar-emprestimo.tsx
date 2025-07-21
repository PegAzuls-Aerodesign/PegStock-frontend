"use client";

import { useRouter } from "next/navigation";
import { useEmprestimoForm } from "../emprestimo.form";
import { useCriarEmprestimo } from "../emprestimo.service";
import { EmprestimoContainerForm } from "./emprestimo-form";

export const CriarEmprestimo = () => {
  const form = useEmprestimoForm();
  const router = useRouter();

  const criarEmprestimo = useCriarEmprestimo({
    onSuccess: () => {
      router.push("/emprestimos");
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    criarEmprestimo.mutate(data);
  });

  return (
    <EmprestimoContainerForm
      form={form}
      title="Criar Empréstimo"
      subtitle="Preencha os dados do empréstimo para adicioná-lo ao sistema."
      onSubmit={handleSubmit}
      isLoading={criarEmprestimo.isPending}
      isSubmitting={criarEmprestimo.isPending}
      onCancel={() => form.reset()}
    />
  );
};
