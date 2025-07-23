import { type ApiMutationOptions, useApiMutation } from "@/lib/data-service";
import {
  commandAddMaterial,
  commandBorrow,
  commandRemoveMaterial,
} from "./command.api";
import {
  type CommandBorrowSchema,
  type CommandMaterialSchema,
} from "./command.form";

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

export const useCommandBorrow = (
  options?: ApiMutationOptions<CommandBorrowSchema>,
) => {
  return useApiMutation({
    mutationFn: async (material) => {
      return await commandBorrow(material);
    },
    invalidateQueries: (schema) => [
      ["materiais"],
      ["material", schema?.materialCod],
    ],
    successMessage: "Material emprestado com sucesso!",
    errorMessage: "Não foi possível emprestar o material",
    ...options,
  });
};
