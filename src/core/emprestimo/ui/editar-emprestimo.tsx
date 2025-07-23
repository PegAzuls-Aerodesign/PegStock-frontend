"use client";

import { useRouter } from "next/navigation";
import { useEmprestimoForm } from "../emprestimo.form";
import { EmprestimoMapper } from "../emprestimo.mapper";
import { useEditarEmprestimo, useEmprestimo } from "../emprestimo.service";
import { EmprestimoContainerForm } from "./emprestimo-form";

interface Props {
  id: number;
  readOnly?: boolean;
}

export const EditarEmprestimo: React.FC<Props> = ({ id, readOnly }) => {
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

  const title = readOnly ? "Visualizar Emprestimo" : "Editar Emprestimo";
  const subtitle = readOnly
    ? "Visualize os dados do emprestimo."
    : "Preencha os dados do emprestimo para editá-lo ao sistema.";

  return (
    <EmprestimoContainerForm
      form={form}
      title={title}
      subtitle={subtitle}
      onSubmit={handleSubmit}
      isLoading={editarEmprestimo.isPending}
      isSubmitting={editarEmprestimo.isPending}
      onCancel={() => form.reset()}
      readOnly={readOnly}
      hideFooter={readOnly}
    />
  );
};
