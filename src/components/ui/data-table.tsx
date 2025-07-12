"use client";

import { cn, type NonEmptyArray, options } from "@/lib/utils";
import { type ReactNode, useMemo, useState } from "react";
import { HiArrowLongDown, HiMagnifyingGlass } from "react-icons/hi2";
import { Select } from "../form/input/select";
import { Button } from "./button";
import { Input } from "./input";
import { Pagination } from "./pagination";
import { Spinner } from "./spinner";

type Id = string | number;
type Data<TCols extends string> = Record<TCols, string | number> & { id: Id };

type Props<TData extends Data<TCols>, TCols extends string> = Readonly<{
  isLoading: boolean;
  data: TData[];
  cols: NonEmptyArray<TCols>;
  customRender?: Partial<Record<TCols, (data: TData) => ReactNode>>;
  columnClassName?: Partial<Record<TCols, string>>;
  allRows?: boolean;
  hideFilter?: boolean;
  rowClassName?: (data: TData) => string;
  actions?: (data: TData) => ReactNode;
  className?: string;
  hiddenCols?: (TCols | "Ações")[];
  hidePagination?: { header?: boolean; footer?: boolean };
  headerContent?: ReactNode;
}>;

const pageSizeOptions = [15, 25, 35, 45, 55] as const;

export function DataTable<TData extends Data<TCols>, TCols extends string>({
  hidePagination = { header: true },
  ...props
}: Props<TData, TCols>) {
  const [pageSize, setPageSize] = useState<number>(pageSizeOptions[0]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<TCols>(props.cols[0]);

  const totalPages = Math.ceil(props.data.length / pageSize);

  const filteredData = useMemo(() => {
    return props.data.filter((row) => {
      const values = Object.values(row).map((value) =>
        value.toString().toLowerCase(),
      );
      return values.some((value) => value.includes(search.toLowerCase()));
    });
  }, [props.data, search]);

  const orderedData = useMemo(() => {
    return filteredData.toSorted((a, b) => {
      const valueA = a[orderBy].toString();
      const valueB = b[orderBy].toString();
      return order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  }, [filteredData, order, orderBy]);

  const paginatedData = useMemo(() => {
    if (props.allRows && orderedData.length >= pageSize) {
      return orderedData;
    }
    const start = (currentPage - 1) * pageSize;
    const slicedData: (TData | null)[] = orderedData.slice(
      start,
      start + pageSize,
    );
    return slicedData.concat(
      Array.from({ length: pageSize - slicedData.length }).fill(null) as null[],
    );
  }, [orderedData, currentPage, pageSize, props.allRows]);

  function handlePageSizeChange(value: number) {
    setPageSize(value);
    setCurrentPage(1);
  }

  const visibleCols = useMemo(
    () => props.cols.filter((col) => !props.hiddenCols?.includes(col)),
    [props.cols, props.hiddenCols],
  );

  const hasActions = props.actions;

  return (
    <div className={cn("flex w-full flex-col gap-2", props.className)}>
      <div
        className={cn(
          "border-brand-white-500 flex w-full flex-col border-y bg-white lg:rounded-xl lg:border-x",
          "overflow-y-auto",
        )}
      >
        <div
          className={cn(
            "flex w-full flex-col justify-between gap-4 border-b border-slate-100 p-6 lg:flex-row",
            { hidden: props.hideFilter },
          )}
        >
          <div className="relative flex lg:grow">
            <Input
              className="w-full min-w-0 pl-9"
              placeholder="Pesquisar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <HiMagnifyingGlass className="absolute top-3 left-3" size={16} />
          </div>
          <div className="flex items-center justify-end gap-2 lg:grow">
            {props.isLoading && <Spinner />}
            <p
              className={cn("text-xs font-medium", {
                hidden: hidePagination?.header || false,
              })}
            >
              Informações apresentadas por página:
            </p>
            <Select
              className={cn("w-20", {
                hidden: hidePagination?.header || false,
              })}
              options={options(Array.from(pageSizeOptions), (n) => [
                n,
                n.toString(),
              ])}
              value={pageSize}
              onChange={handlePageSizeChange}
            />
            {props.headerContent}
          </div>
        </div>
        <div className="w-full overflow-auto">
          <table className="w-full">
            <thead>
              <tr>
                {visibleCols.map((col) => (
                  <th
                    key={col}
                    className={
                      props.columnClassName?.[col]
                        ? props.columnClassName[col]
                        : `overflow-auto p-0`
                    }
                  >
                    <Button
                      variant="ghost"
                      className="group flex w-full justify-start gap-2 rounded-none border-none"
                      onClick={() => {
                        if (orderBy === col) {
                          setOrder(order === "asc" ? "desc" : "asc");
                        } else {
                          setOrderBy(col);
                          setOrder("asc");
                        }
                      }}
                    >
                      <p
                        className={cn("truncate text-xs", {
                          "font-semibold text-slate-900": orderBy === col,
                          "font-medium text-slate-500": orderBy !== col,
                        })}
                      >
                        {col}
                      </p>
                      <HiArrowLongDown
                        className={cn("transform transition-transform", {
                          "rotate-180": orderBy === col && order === "desc",
                          "text-brand-green-400 stroke-2": orderBy === col,
                        })}
                        size={16}
                      />
                    </Button>
                  </th>
                ))}
                {hasActions ? (
                  <th className="table-row-group overflow-auto p-0" colSpan={0}>
                    <p className="flex h-10 items-center truncate p-2 text-left text-xs font-medium text-slate-500">
                      Ações
                    </p>
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, i) => (
                <tr
                  key={row?.id ?? "empty_" + i}
                  className={cn(
                    "h-6 border-t border-slate-100 px-2 text-slate-500 last:rounded-b-xl odd:bg-slate-50",
                    row && props.rowClassName?.(row),
                  )}
                >
                  {visibleCols.map((col) => (
                    <td
                      key={col}
                      className="truncate overflow-auto p-4"
                      title={row ? row[col].toString() : ""}
                    >
                      {row
                        ? (props.customRender?.[col]?.(row) ??
                          row[col].toString())
                        : null}
                    </td>
                  ))}
                  {hasActions ? (
                    <td className="px-2">
                      {row && props.actions && props.actions(row)}
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className={cn("flex justify-end gap-2 px-0 lg:px-0", {
          hidden: props.allRows,
        })}
      >
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
