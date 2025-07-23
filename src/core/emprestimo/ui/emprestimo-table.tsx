"use client";

import { DestructiveAlert } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { cn, formatDate } from "@/lib/utils";
import { parse } from "date-fns";
import { LucideRotateCcw } from "lucide-react";
import Link from "next/link";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiMiniTrash, HiOutlineEye } from "react-icons/hi2";
import {
  useDevolverEmprestimo,
  useEmprestimos,
  useExcluirEmprestimo,
} from "../emprestimo.service";

export const EmprestimoTable = () => {
  const emprestimos = useEmprestimos();
  const excluirEmprestimo = useExcluirEmprestimo();
  const devolverEmprestimo = useDevolverEmprestimo();

  return (
    <DataTable
      cols={[
        "Código",
        "Material",
        "Quantidade",
        "Recebedor",
        "Responsável",
        "Data de Validade",
        "Status",
      ]}
      data={
        emprestimos.data
          ?.filter((e) => e.cod !== null)
          .map((e) => ({
            Código: e.cod!.toString().padStart(4, "0"),
            Material: e.nameMaterial
              ? e.nameMaterial
              : "Material não encontrado",
            Quantidade: e.quantity,
            Recebedor: e.borrower,
            Responsável: e.responsible,
            "Data de Validade": formatDate(e.expirationDate),
            Status: e.returned ? "Devolvido" : "Pendente",
            id: e.cod || 0,
          })) || []
      }
      isLoading={emprestimos.isLoading}
      headerContent={
        <Button variant="primary" className="w-32" asChild>
          <Link href="/emprestimos/criar">Novo emprestimo</Link>
        </Button>
      }
      actions={(emprestimo) => (
        <>
          <div
            className={cn("flex gap-2", {
              hidden: emprestimo?.Status === "Devolvido",
            })}
          >
            <Button
              variant="secondary"
              size="icon"
              onClick={() => devolverEmprestimo.mutate(emprestimo?.id)}
            >
              <LucideRotateCcw size={16} />
            </Button>
            <Button variant="secondary" size="icon" asChild>
              <Link href={`/emprestimos/${emprestimo?.id}/editar`}>
                <HiOutlinePencilAlt size={18} />
              </Link>
            </Button>
            <DestructiveAlert
              onConfirm={() => excluirEmprestimo.mutate(emprestimo?.id)}
            >
              <Button variant="table-delete" size="icon">
                <HiMiniTrash size={16} />
              </Button>
            </DestructiveAlert>
          </div>
          <div
            className={cn("flex gap-2", {
              hidden: emprestimo?.Status !== "Devolvido",
            })}
          >
            <Button variant="secondary" size="icon" asChild>
              <Link href={`/emprestimos/${emprestimo?.id}/visualizar`}>
                <HiOutlineEye size={18} />
              </Link>
            </Button>
          </div>
        </>
      )}
      customRender={{
        Status: (row) => {
          const hoje = new Date();
          const dataValidade = parse(
            row["Data de Validade"],
            "dd/MM/yyyy",
            new Date(),
          );

          return row.Status === "Devolvido" ? (
            <Badge variant="available">{row.Status}</Badge>
          ) : (
            <>
              {dataValidade < hoje && (
                <Badge variant="unavailable">Atrasado</Badge>
              )}
              <Badge variant="warning">{row.Status}</Badge>
            </>
          );
        },
      }}
    />
  );
};
