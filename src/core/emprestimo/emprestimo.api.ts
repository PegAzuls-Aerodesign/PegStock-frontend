import { api } from "@/lib/api";
import {
  type CreateEmprestimoDto,
  type EmprestimoDto,
  type UpdateEmprestimoDto,
} from "./emprestimo.model";

const base_url = "/borrowing";

export async function listEmprestimos(): Promise<EmprestimoDto[]> {
  const response = await api.get<EmprestimoDto[]>(base_url);
  return response.data;
}

export async function getEmprestimo(
  cod: number,
): Promise<EmprestimoDto | null> {
  const response = await api.get<EmprestimoDto>(`${base_url}/${cod}`);
  return response.data;
}

export async function createEmprestimo(
  emprestimo: CreateEmprestimoDto,
): Promise<EmprestimoDto> {
  const response = await api.post<EmprestimoDto>(base_url, emprestimo);
  return response.data;
}

export async function updateEmprestimo(
  cod: number,
  emprestimo: UpdateEmprestimoDto,
): Promise<UpdateEmprestimoDto> {
  const response = await api.put<EmprestimoDto>(
    `${base_url}/${cod}`,
    emprestimo,
  );
  return response.data;
}

export async function deleteEmprestimo(cod: number): Promise<void> {
  await api.delete(`${base_url}/${cod}`);
}

export async function devolverEmprestimo(cod: number): Promise<void> {
  await api.put(`${base_url}/devolution/${cod}`);
}
