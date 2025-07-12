"use client";

import { DataTable } from "@/components/ui/data-table";
import { useMateriais } from "../material.service";

export const MaterialTable = () => {
  const materiais = useMateriais();

  return (
    <DataTable
      cols={[
        "Produto",
        "Quantidade",
        "Categoria",
        "Armário",
        "Data de Validade",
      ]}
      data={
        materiais.data?.map((material) => ({
          Produto: material.name || "",
          Quantidade: material.quantitiy || "",
          Categoria: material.category || "",
          Armário: material.box || "",
          "Data de Validade": material.expirationDate
            ? material.expirationDate.toLocaleDateString("pt-BR")
            : "",
          id: material.cod,
        })) || []
      }
      isLoading={materiais.isLoading}
    />
  );
};
