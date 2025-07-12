import axios, { type AxiosError } from "axios";
import { tokenSalvoNoLocalStorage } from "../core/autenticacao/autenticacao.storage";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/v1",
  validateStatus: (status) => status >= 200 && status < 300,
});

api.interceptors.request.use(
  (config) => {
    const token = tokenSalvoNoLocalStorage();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    return Promise.reject(new Error(errorMessage));
  },
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(
      error instanceof Error ? error : new Error("Erro desconhecido"),
    );
  },
);

export { api };
