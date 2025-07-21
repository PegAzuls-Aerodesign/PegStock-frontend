import {
  type Caixa,
  type Categoria,
  type MaterialStatus,
} from "./material.utils";

interface MaterialBase {
  cod?: number | null;
  name: string;
  description: string | null;
  brand: string | null;
  quantity: number;
  category: Categoria;
  box: Caixa;
  expirationDate: string | null;
  status: MaterialStatus[];
}

export interface MaterialDto extends MaterialBase {}

export interface CreateMaterialDto extends MaterialBase {}

export interface UpdateMaterialDto extends CreateMaterialDto {}
