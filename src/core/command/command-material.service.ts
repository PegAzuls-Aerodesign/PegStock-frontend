import { type ApiMutationOptions, useApiMutation } from "@/lib/data-service";
import {
  commandAddMaterial,
  commandRemoveMaterial,
} from "./command-material.api";
import { type CommandMaterialSchema } from "./command-material.form";

export const useCommandAddMaterial = (
  options?: ApiMutationOptions<CommandMaterialSchema>,
) => {
  return useApiMutation({
    mutationFn: async (material) => {
      await commandAddMaterial(material);
    },
    invalidateQueries: (schema) => [
      ["materiais"],
      ["material", schema?.materialCod],
    ],
    successMessage: "Material adicionado com sucesso!",
    errorMessage: "Não foi possível adicionar o material",
    ...options,
  });
};

export const useCommandRemoveMaterial = (
  options?: ApiMutationOptions<CommandMaterialSchema>,
) => {
  return useApiMutation({
    mutationFn: async (material) => {
      await commandRemoveMaterial(material);
    },
    invalidateQueries: (schema) => [
      ["materiais"],
      ["material", schema?.materialCod],
    ],
    successMessage: "Material removido com sucesso!",
    errorMessage: "Não foi possível remover o material",
    ...options,
  });
};
