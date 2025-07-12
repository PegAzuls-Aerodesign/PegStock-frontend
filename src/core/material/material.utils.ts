export const Categoria = {
  PERMANENTE: "Permanente",
  CONSUMIVEL: "Consumível",
  SEM_USO: "Sem uso",
} as const;

export type Categoria = (typeof Categoria)[keyof typeof Categoria];

export const Caixa = {
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
};

export type Caixa = (typeof Caixa)[keyof typeof Caixa];
