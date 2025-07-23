import { api } from "@/lib/api";
import { type CommandMaterialSchema } from "./command-material.form";

const add_url = "/command/add";
const remover_url = "/command/consume";

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
