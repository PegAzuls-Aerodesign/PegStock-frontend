import { api } from "@/lib/api";
import { type CredenciaisDTO, type TokenDto } from "./autenticacao.model";

const ENDPOINT = "/users/login";

export async function entrar(data: CredenciaisDTO) {
  const response = await api.post<TokenDto>(ENDPOINT, data);
  return response.data;
}
