import { type MaterialSchema } from "./material.form";
import {
  type CreateMaterialDto,
  type ListMaterialDto,
  type MaterialDto,
} from "./material.model";

const schemaToDto = (
  schema: MaterialSchema,
): MaterialDto | ListMaterialDto | CreateMaterialDto => ({
  ...schema,
  borrowing: [],
  cod: schema.cod ?? null,
});

const schemaToCreateDto = (schema: MaterialSchema): CreateMaterialDto => ({
  ...schema,
  createdDate: schema.createdDate || new Date().toISOString().split("T")[0],
});

const schemaToUpdateDto: (schema: MaterialSchema) => CreateMaterialDto =
  schemaToCreateDto;

export const dtoToSchema = (dto: ListMaterialDto): MaterialSchema => ({
  cod: dto.cod ?? null,
  name: dto.name,
  quantity: dto.quantity,
  consumerQuantity: 0, // TODO: Handle consumerQuantity
  box: dto.box,
  category: dto.category,
  description: dto.description ?? null,
});

export const MaterialMapper = {
  schemaToDto,
  schemaToCreateDto,
  schemaToUpdateDto,
  dtoToSchema,
};
