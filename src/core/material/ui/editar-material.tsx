"use client";

import { useRouter } from "next/navigation";
import { useMaterialForm } from "../material.form";
import { MaterialMapper } from "../material.mapper";
import { useEditarMaterial, useMaterial } from "../material.service";
import { MaterialContainerForm } from "./material-form";

interface Props {
  id: number;
}

export const EditarMaterial: React.FC<Props> = ({ id }) => {
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

  return (
    <MaterialContainerForm
      form={form}
      title="Editar Material"
      subtitle="Preencha os dados do material para editá-lo ao estoque."
      onSubmit={handleSubmit}
      isLoading={editarMaterial.isPending}
      isSubmitting={editarMaterial.isPending}
      onCancel={() => form.reset()}
    />
  );
};
