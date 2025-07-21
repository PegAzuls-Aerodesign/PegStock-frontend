import { type EmprestimoSchema } from "./emprestimo.form";
import {
  type CreateEmprestimoDto,
  type EmprestimoDto,
} from "./emprestimo.model";

const schemaToDto = (schema: EmprestimoSchema): CreateEmprestimoDto => ({
  ...schema,
  materialCod: schema.materialCod || 0,
  expirationDate: schema.expirationDate,
  quantity: schema.quantity,
  borrower: schema.borrower,
  responsible: schema.responsible,
});

export const dtoToSchema = (dto: EmprestimoDto): EmprestimoSchema => ({
  ...dto,
  cod: dto.cod || null,
  materialCod: dto.materialCod,
  expirationDate: dto.expirationDate,
  quantity: dto.quantity,
  borrower: dto.borrower,
  responsible: dto.responsible,
});

export const EmprestimoMapper = {
  schemaToDto,
  dtoToSchema,
};
