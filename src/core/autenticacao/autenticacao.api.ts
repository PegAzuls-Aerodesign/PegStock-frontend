import { api } from "@/lib/api";
import { type CredenciaisDTO, type TokenDto } from "./autenticacao.models";

const ENDPOINT = "/users/auth";

export async function entrar(data: CredenciaisDTO) {
  const response = await api.post<TokenDto>(ENDPOINT, data);
  return response.data;
}
