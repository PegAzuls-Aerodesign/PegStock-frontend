import { useDebouncedState } from "@/hooks/use-debounced-state";
import { capitalizar, options } from "@/lib/utils";
import { useMemo } from "react";
import z from "zod";
import { type MaterialDto } from "./material.model";
import { useMateriais } from "./material.service";

export const Categoria = {
  PERMANENTE: "PERMANENTE",
  CONSUMIVEL: "CONSUMIVEL",
  SEM_USO: "SEM_USO",
} as const;

export type Categoria = (typeof Categoria)[keyof typeof Categoria];

export const categoriaLabels = {
  PERMANENTE: "Permanente",
  CONSUMIVEL: "Consumível",
  SEM_USO: "Sem uso",
} as const satisfies Record<Categoria, string>;

export const categoriaOptions = options(Object.values(Categoria), (c) => [
  c,
  categoriaLabels[c],
]);

export const Caixa = {
  EPI_TI: "EPI_TI",
  FERRAMENTAS_ELETRICAS: "FERRAMENTAS_ELETRICAS",
  DESEMPENHO: "DESEMPENHO",
  FERRAMENTAS: "FERRAMENTAS",
  ELETRICA: "ELETRICA",
  LIMPEZA: "LIMPEZA",
  PARAFUSO_DERIVADOS: "PARAFUSO_DERIVADOS",
  FITAS: "FITAS",
  PALITOS: "PALITOS",
  BASTAO_COLA_QUENTE: "BASTAO_COLA_QUENTE",
  COLA: "COLA",
  FERRAMENTAS_CORTANTES: "FERRAMENTAS_CORTANTES",
  LIXAS: "LIXAS",
  ESTANTE: "ESTANTE",
  OUTROS: "OUTROS",
} as const;

export type Caixa = (typeof Caixa)[keyof typeof Caixa];

export const caixaLabels = {
  EPI_TI: "EPI/TI",
  FERRAMENTAS_ELETRICAS: "Ferramentas Elétricas",
  DESEMPENHO: "Desempenho",
  FERRAMENTAS: "Ferramentas",
  ELETRICA: "Elétrica",
  LIMPEZA: "Limpeza",
  PARAFUSO_DERIVADOS: "Parafuso e Derivados",
  FITAS: "Fitas",
  PALITOS: "Palitos",
  BASTAO_COLA_QUENTE: "Bastão Cola Quente",
  COLA: "Cola",
  FERRAMENTAS_CORTANTES: "Ferramentas Cortantes",
  LIXAS: "Lixas",
  ESTANTE: "Estante",
  OUTROS: "Outros",
} as const satisfies Record<Caixa, string>;

export const caixaOptions = options(Object.values(Caixa), (c) => [
  c,
  caixaLabels[c],
]);

export const MaterialStatus = {
  EXPIRED: "EXPIRED",
  LOW_STOCK: "LOW_STOCK",
  UNAVAILABLE: "UNAVAILABLE",
} as const;

export type MaterialStatus =
  (typeof MaterialStatus)[keyof typeof MaterialStatus];

export const materialStatusLabels = {
  EXPIRED: "Expirado",
  LOW_STOCK: "Estoque Baixo",
  UNAVAILABLE: "Indisponível",
} as const satisfies Record<MaterialStatus, string>;

export const materialStatusOptions = options(
  Object.values(MaterialStatus),
  (s) => [s, materialStatusLabels[s]],
);

export const MaterialStatusSchema = z.enum(MaterialStatus);

export function buscarMateriais(
  materiais: MaterialDto[],
  busca: string,
): MaterialDto[] {
  if (!busca) {
    return materiais;
  }
  busca = busca.toLocaleLowerCase();

  return materiais.filter(
    (material) =>
      material.name.toLocaleLowerCase().includes(busca) ||
      material.description?.toLocaleLowerCase().includes(busca),
  );
}

export const useMateriaisOptions = () => {
  const materiais = useMateriais();

  const [[buscaMateriais, buscaMateriaisDebounce], [, setBuscaMateriais]] =
    useDebouncedState("");
  const materiaisOptions = useMemo(() => {
    const busca = buscarMateriais(materiais.data || [], buscaMateriais);
    return options(busca, (m) => [
      m.cod || 0,
      `${capitalizar(m.name) || "Material não encontrada"}`,
    ]);
  }, [materiais.data, buscaMateriais]);

  const props = useMemo(
    () => ({
      options: materiaisOptions,
      onSearch: setBuscaMateriais,
      isLoading: buscaMateriaisDebounce.isPending() || materiais.isLoading,
    }),
    [materiais, buscaMateriaisDebounce, setBuscaMateriais, materiaisOptions],
  );

  return props;
};
