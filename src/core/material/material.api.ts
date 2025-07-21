import { api } from "@/lib/api";

import {
  type CreateMaterialDto,
  type MaterialDto,
  type UpdateMaterialDto,
} from "./material.model";

const base_url = "/material";

export async function listMaterial(): Promise<MaterialDto[]> {
  const response = await api.get<MaterialDto[]>(base_url);
  return response.data;
}

export async function getMaterial(cod: number): Promise<MaterialDto | null> {
  const response = await api.get<MaterialDto>(`${base_url}/${cod}`);
  return response.data;
}

export async function createMaterial(
  material: CreateMaterialDto,
): Promise<CreateMaterialDto> {
  const response = await api.post<MaterialDto>(base_url, material);
  return response.data;
}

export async function updateMaterial(
  cod: number,
  material: UpdateMaterialDto,
): Promise<UpdateMaterialDto> {
  const response = await api.put<MaterialDto>(`${base_url}/${cod}`, material);
  return response.data;
}

export async function deleteMaterial(cod: number): Promise<void> {
  await api.delete(`${base_url}/${cod}`);
}

// TODO: Remover método quando API estiver pronta
// export async function simulateListMaterial(): Promise<ListMaterialDto[]> {
//   return await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(listMaterialData);
//     }, 300);
//   });
// }
