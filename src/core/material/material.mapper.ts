import { type MaterialSchema } from "./material.form";
import { type MaterialDto } from "./material.model";

const schemaToDto = (schema: MaterialSchema): MaterialDto => ({
  ...schema,
  name: schema.name,
  description: schema.description ?? null,
  brand: schema.brand ?? null,
  quantity: schema.quantity,
  category: schema.category,
  box: schema.box,
  status: schema.status,
  expirationDate: schema.expirationDate ?? null,
});

export const dtoToSchema = (dto: MaterialDto): MaterialSchema => ({
  ...dto,
  description: dto.description ?? null,
  brand: dto.brand ?? null,
  quantity: dto.quantity,
  category: dto.category,
  box: dto.box,
  status: dto.status,
  expirationDate: dto.expirationDate ?? undefined,
});

export const MaterialMapper = {
  schemaToDto,
  dtoToSchema,
};
