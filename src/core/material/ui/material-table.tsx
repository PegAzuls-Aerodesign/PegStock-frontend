"use client";

import { DestructiveAlert } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Link from "next/link";
import { HiMiniTrash, HiOutlineEye } from "react-icons/hi2";
import { useExcluirMaterial, useMateriais } from "../material.service";

export const MaterialTable = () => {
  const materiais = useMateriais();
  const excluirMaterial = useExcluirMaterial();

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
      actions={(material) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="icon" asChild>
            <Link href={`/estoque/${material.id}/visualizar`}>
              <HiOutlineEye size={18} />
            </Link>
          </Button>
          <DestructiveAlert
            onConfirm={() => excluirMaterial.mutate(material.id)}
          >
            <Button variant="table-delete">
              <HiMiniTrash size={16} />
            </Button>
          </DestructiveAlert>
        </div>
      )}
    />
  );
};
