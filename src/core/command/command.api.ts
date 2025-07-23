import { api } from "@/lib/api";
import {
  type CommandBorrowSchema,
  type CommandMaterialSchema,
} from "./command.form";

const add_url = "/command/add";
const remover_url = "/command/consume";
const borrow_url = "/command/borrow";

export async function commandAddMaterial(
  material: CommandMaterialSchema,
): Promise<void> {
  await api.post<CommandMaterialSchema>(add_url, material);
}

export async function commandRemoveMaterial(
  material: CommandMaterialSchema,
): Promise<void> {
  await api.post<CommandMaterialSchema>(remover_url, material);
}

export async function commandBorrow(
  material: CommandBorrowSchema,
): Promise<void> {
  await api.post<CommandBorrowSchema>(borrow_url, material);
}
