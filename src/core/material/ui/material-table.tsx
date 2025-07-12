"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Link from "next/link";
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
        // "Status",
      ]}
      data={
        materiais.data?.map((material) => ({
          Produto: material.name || "-",
          Quantidade: material.quantitiy || "-",
          Categoria: material.category || "-",
          Armário: material.box || "-",
          "Data de Validade": material.expirationDate
            ? material.expirationDate.toLocaleDateString("pt-BR")
            : "-",
          // Status:
          id: material.cod,
        })) || []
      }
      isLoading={materiais.isLoading}
      headerContent={
        <Button variant="primary" className="w-32" asChild>
          <Link href="/estoque/criar">Novo material</Link>
        </Button>
      }
    />
  );
};
