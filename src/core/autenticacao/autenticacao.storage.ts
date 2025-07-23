import { type TokenDto } from "./autenticacao.model";

export function tokenSalvoNoLocalStorage(): TokenDto | null {
  if ("window" in globalThis) {
    try {
      const token = localStorage.getItem("pegstock:token");
      return token ? (JSON.parse(token) as TokenDto) : null;
    } catch {
      return null;
    }
  } else {
    return null;
  }
}

export function salvarTokenNoLocalStorage(token: TokenDto): void {
  if ("window" in globalThis) {
    localStorage.setItem("pegstock:token", JSON.stringify(token));
  }
}

export function removerTokenDoLocalStorage(): void {
  if ("window" in globalThis) {
    localStorage.removeItem("pegstock:token");
  }
}
