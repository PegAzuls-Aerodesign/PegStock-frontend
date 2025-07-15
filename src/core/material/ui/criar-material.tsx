"use client";

import { useRouter } from "next/navigation";
import { useMaterialForm } from "../material.form";
import { useCriarMaterial } from "../material.service";
import { MaterialContainerForm } from "./material-form";

export const CriarMaterial = () => {
  const form = useMaterialForm();
  const router = useRouter();

  const criarMaterial = useCriarMaterial({
    onSuccess: () => {
      router.push("/estoque");
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    criarMaterial.mutate(data);
  });

  return (
    <MaterialContainerForm
      form={form}
      title="Criar Material"
      subtitle="Preencha os dados do material para adicioná-lo ao estoque."
      onSubmit={handleSubmit}
      isLoading={criarMaterial.isPending}
      isSubmitting={criarMaterial.isPending}
      onCancel={() => form.reset()}
    />
  );
};
