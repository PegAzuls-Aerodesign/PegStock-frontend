"use client";

import { useRouter } from "next/navigation";
import { useMaterialForm } from "../material.form";
import { MaterialMapper } from "../material.mapper";
import { useEditarMaterial, useMaterial } from "../material.service";
import { MaterialContainerForm } from "./material-form";

interface Props {
  id: number;
  readOnly?: boolean;
}

export const EditarMaterial: React.FC<Props> = ({ id, readOnly }) => {
  const material = useMaterial(id, { gcTime: Infinity });

  const form = useMaterialForm(material?.data);

  const router = useRouter();

  const editarMaterial = useEditarMaterial({
    onSuccess: () => {
      router.push("/estoque");
    },
    onFieldError: (field, error) => {
      form.setError(field, error);
    },
  });

  const handleSubmit = form.handleSubmit(async (material) => {
    if (material) {
      await editarMaterial.mutateAsync({
        id,
        material: MaterialMapper.schemaToDto(material),
      });
    }
  });

  const title = readOnly ? "Visualizar Material" : "Editar Material";
  const subtitle = readOnly
    ? "Visualize os dados do material no estoque."
    : "Preencha os dados do material para editá-lo ao estoque.";

  return (
    <MaterialContainerForm
      form={form}
      title={title}
      subtitle={subtitle}
      onSubmit={handleSubmit}
      isLoading={material.isPending}
      isSubmitting={editarMaterial.isPending}
      onCancel={() => form.reset()}
      refetch={material.refetch}
      readOnly={readOnly}
      hideFooter={readOnly}
    />
  );
};
