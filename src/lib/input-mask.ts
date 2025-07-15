export interface InputMask {
  mask: (texto: string | undefined) => string;
  unmask: (texto: string | undefined) => string;
}

export const dataMask: InputMask = {
  mask(texto) {
    return (
      texto
        ?.replace(/^(\d)\//g, "0$1/")
        .replace(/\/(\d\D)/g, "/0$1")
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{4})\d+?$/, "$1") ?? ""
    );
  },
  unmask(texto) {
    return texto?.replace(/\D/g, "").slice(0, 8) ?? "";
  },
};
