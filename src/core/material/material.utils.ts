import { options } from "@/lib/utils";

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
