import { type ApiQueryOptions, useApiQuery } from "@/lib/data-service";
import { getMaterial, simulateListMaterial } from "./material.api";
import { type ListMaterialDto, type MaterialDto } from "./material.model";

export const useMateriais = (options?: ApiQueryOptions<ListMaterialDto[]>) => {
  return useApiQuery<ListMaterialDto[]>({
    queryKey: ["materiais"],
    queryFn: () => {
      const response = simulateListMaterial();
      return response;
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
