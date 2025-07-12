import { type Caixa, type Categoria } from "./material.utils";

export interface MaterialDto {
  cod: number;
  name: string;
  quantitiy: number; // integer
  consumerQuantity: number; // integer
  category: Categoria;
  box: Caixa;
  expirationDate: Date;
  description?: string;
  createdDate?: Date;
  registerDate?: Date;
  lastAddDate?: Date;
  lastConsumitionDate?: Date;
  borrowing: Array<BorrowingDto>;
}

export interface ListMaterialDto
  extends Pick<
    MaterialDto,
    "cod" | "name" | "quantitiy" | "category" | "box" | "expirationDate"
  > {}

export interface CreateMaterialDto
  extends Pick<
    MaterialDto,
    | "name"
    | "description"
    | "quantitiy"
    | "consumerQuantity"
    | "box"
    | "createdDate"
    | "expirationDate"
  > {}

export interface UpdateMaterialDto extends CreateMaterialDto {}

interface BorrowingDto {
  cod: number;
  quantity: number; // integer
  borrower: string;
  expirationDate: Date;
  createdDate: Date;
  returned: boolean;
  responsible: string;
}
