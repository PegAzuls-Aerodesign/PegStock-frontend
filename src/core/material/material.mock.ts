import { type MaterialSchema } from "./material.form";
import { type ListMaterialDto } from "./material.model";
import { Caixa } from "./material.utils";

export const listMaterialData: ListMaterialDto[] = [
  {
    cod: 1,
    name: "Material A",
    expirationDate: "2024-12-31",
    quantity: 100,
    box: Caixa.BASTAO_COLA_QUENTE,
    category: "CONSUMIVEL",
  },
  {
    cod: 2,
    name: "Material B",
    expirationDate: "2025-01-15",
    quantity: 50,
    box: Caixa.FERRAMENTAS_ELETRICAS,
    category: "PERMANENTE",
  },
  {
    cod: 3,
    name: "Material C",
    expirationDate: "2023-11-30",
    quantity: 0,
    box: Caixa.FERRAMENTAS_CORTANTES,
    category: "SEM_USO",
  },
  {
    cod: 4,
    name: "Material D",
    expirationDate: "2024-06-20",
    quantity: 200,
    box: Caixa.FERRAMENTAS_ELETRICAS,
    category: "CONSUMIVEL",
  },
  {
    cod: 5,
    name: "Material E",
    expirationDate: "2025-03-10",
    quantity: 75,
    box: Caixa.EPI_TI,
    category: "PERMANENTE",
  },
];

export const emptyMaterialSchema: MaterialSchema = {
  cod: null,
  name: "",
  quantity: 0,
  consumerQuantity: 0,
  box: Caixa.BASTAO_COLA_QUENTE,
  category: "CONSUMIVEL",
  expirationDate: undefined,
  description: null,
  createdDate: new Date().toISOString().split("T")[0],
  registerDate: undefined,
  lastAddDate: undefined,
  lastConsumitionDate: undefined,
};

export const emptyMaterialDto: ListMaterialDto = {
  cod: null,
  name: "",
  quantity: 0,
  box: Caixa.BASTAO_COLA_QUENTE,
  category: "CONSUMIVEL",
  expirationDate: undefined,
};
