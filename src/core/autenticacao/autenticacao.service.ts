import { type ApiMutationOptions, useApiMutation } from "@/lib/data-service";
import { entrar } from "./autenticacao.api";
import { type CredenciaisDTO, type TokenDto } from "./autenticacao.models";
import {
  removerTokenDoLocalStorage,
  salvarTokenNoLocalStorage,
} from "./autenticacao.storage";

export const useEntrar = ({
  onSuccess,
  onError,
}: ApiMutationOptions<CredenciaisDTO, TokenDto> = {}) => {
  return useApiMutation<CredenciaisDTO, TokenDto>({
    mutationFn: async (credenciais) => {
      const response = await entrar(credenciais);
      return response;
    },
    invalidateQueries: () => [["usuario-autenticado"]],
    onSuccess(credenciais, token) {
      salvarTokenNoLocalStorage(token);
      onSuccess?.(credenciais, token);
    },
    onError(erro, credenciais) {
      removerTokenDoLocalStorage();
      onError?.(erro, credenciais);
    },
    successMessage: "Usuário autenticado com sucesso",
    errorMessage: "Erro ao autenticar usuário",
  });
};
