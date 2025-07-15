import {
  type ApiMutationOptions,
  type ApiQueryOptions,
  useApiMutation,
  useApiQuery,
} from "@/lib/data-service";
import {
  createMaterial,
  deleteMaterial,
  getMaterial,
  listMaterial,
  updateMaterial,
} from "./material.api";
import { type MaterialSchema } from "./material.form";
import { MaterialMapper } from "./material.mapper";
import {
  type ListMaterialDto,
  type MaterialDto,
  type UpdateMaterialDto,
} from "./material.model";

export const useMateriais = (options?: ApiQueryOptions<ListMaterialDto[]>) => {
  return useApiQuery<ListMaterialDto[]>({
    queryKey: ["materiais"],
    queryFn: async () => {
      const response = await listMaterial();
      return response || [];
    },
    ...options,
  });
};
export const useMaterial = (
  id: number,
  options?: ApiQueryOptions<MaterialDto>,
) => {
  return useApiQuery<MaterialDto>({
    enabled: !!id,
    queryKey: ["material", id],
    queryFn: async () => {
      const response = await getMaterial(id);
      if (!response) {
        throw new Error("Material not found");
      }
      return response;
    },
    ...options,
  });
};

export const useCriarMaterial = (
  options?: ApiMutationOptions<MaterialSchema>,
) => {
  return useApiMutation({
    mutationFn: async (material) => {
      await createMaterial(MaterialMapper.schemaToCreateDto(material));
    },
    invalidateQueries: () => [["materiais"]],
    successMessage: "Material criado com sucesso!",
    errorMessage: "Não foi possível criar o material",
    errorDescription:
      "Erro desconhecido. Verifique se os dados estão corretos e tente novamente.",
    ...options,
  });
};

export interface EditarMaterialArgs {
  id: number;
  material: UpdateMaterialDto;
}

export const useEditarMaterial = (
  options?: ApiMutationOptions<EditarMaterialArgs>,
) => {
  return useApiMutation({
    mutationFn: async ({ id, material }) => {
      await updateMaterial(id, material);
    },
    invalidateQueries: ({ id }) => [["materiais"], ["material", id]],
    successMessage: "Material editado com sucesso!",
    errorMessage: "Não foi possível editar o material",
    ...options,
  });
};

export const useExcluirMaterial = (options?: ApiMutationOptions<number>) => {
  return useApiMutation<number>({
    mutationFn: deleteMaterial,
    invalidateQueries: () => [["materiais"]],
    successMessage: "Material excluído com sucesso!",
    errorMessage: "Não foi possível excluir o material",
    ...options,
  });
};
