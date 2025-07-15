import { type Caixa, type Categoria } from "./material.utils";

export interface MaterialDto {
  cod: number | null;
  name: string;
  quantity: number; // integer
  consumerQuantity?: number | null; // integer
  category: Categoria;
  box: Caixa;
  expirationDate?: string; // ISO date string
  description?: string | null;
  createdDate?: string; // ISO date string
  registerDate?: string; // ISO date string
  lastAddDate?: string; // ISO date string
  lastConsumitionDate?: string; // ISO date string
  borrowing: Array<BorrowingDto>;
}

export interface ListMaterialDto
  extends Pick<
    MaterialDto,
    | "cod"
    | "name"
    | "quantity"
    | "category"
    | "box"
    | "expirationDate"
    | "description"
  > {}

export interface CreateMaterialDto
  extends Pick<
    MaterialDto,
    | "name"
    | "description"
    | "quantity"
    | "consumerQuantity"
    | "box"
    | "createdDate"
    | "expirationDate"
    | "category"
  > {}

export interface UpdateMaterialDto extends CreateMaterialDto {}

interface BorrowingDto {
  cod: number;
  quantity: number; // integer
  borrower: string;
  expirationDate: string; // ISO date string
  createdDate: string; // ISO date string
  returned: boolean;
  responsible: string;
}
