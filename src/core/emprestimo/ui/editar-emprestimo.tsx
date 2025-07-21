"use client";

import { useRouter } from "next/navigation";
import { useEmprestimoForm } from "../emprestimo.form";
import { EmprestimoMapper } from "../emprestimo.mapper";
import { useEditarEmprestimo, useEmprestimo } from "../emprestimo.service";
import { EmprestimoContainerForm } from "./emprestimo-form";

interface Props {
  id: number;
}

export const EditarEmprestimo: React.FC<Props> = ({ id }) => {
  const emprestimo = useEmprestimo(id, { gcTime: Infinity });

  const form = useEmprestimoForm(emprestimo?.data);

  const router = useRouter();

  const editarEmprestimo = useEditarEmprestimo({
    onSuccess: () => {
      router.push("/emprestimos");
    },
    onFieldError: (field, error) => {
      form.setError(field, error);
    },
  });

  const handleSubmit = form.handleSubmit(async (material) => {
    if (material) {
      await editarEmprestimo.mutateAsync({
        id,
        emprestimo: EmprestimoMapper.schemaToDto(material),
      });
    }
  });

  return (
    <EmprestimoContainerForm
      form={form}
      title="Editar Emprestimo"
      subtitle="Preencha os dados do emprestimo para editá-lo."
      onSubmit={handleSubmit}
      isLoading={editarEmprestimo.isPending}
      isSubmitting={editarEmprestimo.isPending}
      onCancel={() => form.reset()}
    />
  );
};
