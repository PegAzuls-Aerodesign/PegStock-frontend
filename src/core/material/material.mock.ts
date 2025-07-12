import { type ListMaterialDto } from "./material.model";
import { Caixa } from "./material.utils";

export const listMaterialData: ListMaterialDto[] = [
  {
    cod: 1,
    name: "Material A",
    expirationDate: new Date("2024-12-31"),
    quantitiy: 100,
    box: Caixa.BASTAO_COLA_QUENTE,
    category: "Consumível",
  },
  {
    cod: 2,
    name: "Material B",
    expirationDate: new Date("2025-01-15"),
    quantitiy: 50,
    box: Caixa.FERRAMENTAS_ELETRICAS,
    category: "Permanente",
  },
  {
    cod: 3,
    name: "Material C",
    expirationDate: new Date("2023-11-30"),
    quantitiy: 0,
    box: Caixa.FERRAMENTAS_CORTANTES,
    category: "Sem uso",
  },
  {
    cod: 4,
    name: "Material D",
    expirationDate: new Date("2024-06-20"),
    quantitiy: 200,
    box: Caixa.FERRAMENTAS_ELETRICAS,
    category: "Consumível",
  },
  {
    cod: 5,
    name: "Material E",
    expirationDate: new Date("2025-03-10"),
    quantitiy: 75,
    box: Caixa.EPI_TI,
    category: "Permanente",
  },
];
