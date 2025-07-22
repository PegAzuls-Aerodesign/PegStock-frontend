import {
  type ApiMutationOptions,
  type ApiQueryOptions,
  useApiMutation,
  useApiQuery,
} from "@/lib/data-service";
import {
  createEmprestimo,
  deleteEmprestimo,
  devolverEmprestimo,
  getEmprestimo,
  listEmprestimos,
  updateEmprestimo,
} from "./emprestimo.api";
import { type EmprestimoSchema } from "./emprestimo.form";
import { EmprestimoMapper } from "./emprestimo.mapper";
import {
  type CreateEmprestimoDto,
  type EmprestimoDto,
} from "./emprestimo.model";

export const useEmprestimos = (options?: ApiQueryOptions<EmprestimoDto[]>) => {
  return useApiQuery<EmprestimoDto[]>({
    queryKey: ["emprestimos"],
    queryFn: async () => {
      const response = await listEmprestimos();
      return response || [];
    },
    ...options,
  });
};
export const useEmprestimo = (
  id: number,
  options?: ApiQueryOptions<EmprestimoDto>,
) => {
  return useApiQuery<EmprestimoDto>({
    enabled: !!id,
    queryKey: ["emprestimo", id],
    queryFn: async () => {
      const response = await getEmprestimo(id);
      if (!response) {
        throw new Error("Emprestimo not found");
      }
      return response;
    },
    ...options,
  });
};

export const useCriarEmprestimo = (
  options?: ApiMutationOptions<EmprestimoSchema>,
) => {
  return useApiMutation({
    mutationFn: async (emprestimo: EmprestimoSchema) => {
      await createEmprestimo(EmprestimoMapper.schemaToDto(emprestimo));
    },
    invalidateQueries: (emprestimo) => [
      ["emprestimos"],
      ["materiais"],
      ["material", emprestimo.materialCod],
    ],
    successMessage: "Emprestimo criado com sucesso!",
    errorMessage: "Não foi possível criar o emprestimo",
    errorDescription:
      "Erro desconhecido. Verifique se os dados estão corretos e tente novamente.",
    ...options,
  });
};

export interface EditarEmprestimoArgs {
  id: number;
  emprestimo: CreateEmprestimoDto;
}

export const useEditarEmprestimo = (
  options?: ApiMutationOptions<EditarEmprestimoArgs>,
) => {
  return useApiMutation({
    mutationFn: async ({ id, emprestimo }) => {
      await updateEmprestimo(id, EmprestimoMapper.schemaToDto(emprestimo));
    },
    invalidateQueries: ({ id, emprestimo }) => [
      ["emprestimos"],
      ["emprestimo", id],
      ["materiais"],
      ["material", emprestimo.materialCod],
    ],
    successMessage: "Emprestimo editado com sucesso!",
    errorMessage: "Não foi possível editar o emprestimo",
    ...options,
  });
};

export const useExcluirEmprestimo = (options?: ApiMutationOptions<number>) => {
  return useApiMutation<number>({
    mutationFn: deleteEmprestimo,
    invalidateQueries: () => [["emprestimos"], ["materiais"], ["material"]],
    successMessage: "Emprestimo excluído com sucesso!",
    errorMessage: "Não foi possível excluir o emprestimo",
    ...options,
  });
};

export const useDevolverEmprestimo = (options?: ApiMutationOptions<number>) => {
  return useApiMutation<number>({
    mutationFn: async (id) => {
      return await devolverEmprestimo(id);
    },
    invalidateQueries: () => [["emprestimos"], ["materiais"], ["material"]],
    successMessage: "Emprestimo devolvido com sucesso!",
    errorMessage: "Não foi possível devolver o emprestimo",
    ...options,
  });
};
