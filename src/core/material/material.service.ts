import {
  type ApiQueryOptions,
  useApiMutation,
  useApiQuery,
} from "@/lib/data-service";
import { deleteMaterial, getMaterial, listMaterial } from "./material.api";
import { type ListMaterialDto, type MaterialDto } from "./material.model";

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
  id: string,
  options?: ApiQueryOptions<MaterialDto>,
) => {
  return useApiQuery<MaterialDto>({
    queryKey: ["material", id],
    queryFn: async () => {
      const response = await getMaterial(Number(id));
      if (!response) {
        throw new Error("Material not found");
      }
      return response;
    },
    ...options,
  });
};

export const useExcluirMaterial = (options?: ApiQueryOptions<number>) => {
  return useApiMutation<number>({
    mutationFn: deleteMaterial,
    invalidateQueries: () => [["materiais"]],
    successMessage: "Material excluído com sucesso!",
    errorMessage: "Não foi possível excluir o material",
    ...options,
  });
};
