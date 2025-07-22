"use client";

import { DestructiveAlert } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiMiniTrash } from "react-icons/hi2";
import { useExcluirMaterial, useMateriais } from "../material.service";
import {
  caixaLabels,
  categoriaLabels,
  materialStatusLabels,
} from "../material.utils";

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
        "Status",
      ]}
      data={
        materiais.data?.map((material) => ({
          Produto: material?.name || "-",
          Quantidade: material?.quantity || "-",
          Categoria: categoriaLabels[material?.category] || "-",
          Armário: caixaLabels[material?.box] || "-",
          "Data de Validade": material?.expirationDate
            ? formatDate(material?.expirationDate)
            : "-",
          Status:
            (Array.isArray(material?.status) &&
              material.status
                .map((s) => materialStatusLabels[s] || s)
                .join(", ")) ||
            "Disponível",
          id: material?.cod ?? 0,
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
            <Link href={`/estoque/${material?.id}/editar`}>
              {/* <HiOutlineEye size={18} /> */}
              <HiOutlinePencilAlt size={18} />
            </Link>
          </Button>
          <DestructiveAlert
            onConfirm={() => excluirMaterial.mutate(material?.id)}
          >
            <Button variant="table-delete" size="icon">
              <HiMiniTrash size={16} />
            </Button>
          </DestructiveAlert>
        </div>
      )}
      customRender={{
        Status: (row) => {
          return (
            <div className="flex gap-1">
              {row.Status.split(", ").map((status, index) => (
                <Badge
                  key={index}
                  variant={
                    status === "Disponível"
                      ? "available"
                      : status === "Indisponível"
                        ? "unavailable"
                        : "warning"
                  }
                >
                  {status}
                </Badge>
              ))}
            </div>
          );
        },
      }}
    />
  );
};
