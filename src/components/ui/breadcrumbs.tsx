"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Fragment } from "react";
import { HiOutlineChevronRight } from "react-icons/hi2";

export interface Breadcrumb {
  href: string;
  label: string;
}

export function Breadcrumbs({ path }: { path: Array<Breadcrumb> }) {
  return (
    <div className="flex flex-row items-center gap-1 underline-offset-2">
      <Link
        href="/home"
        className="text-brand-blue-500 hover:text-brand-blue-700 text-xs font-bold hover:underline"
      >
        Home
      </Link>
      {path.map((segment, i) => (
        <Fragment key={i}>
          <HiOutlineChevronRight
            size={12}
            className="text-slate-500"
            strokeWidth={2.5}
          />
          <Link
            href={segment.href}
            className={cn(
              "text-brand-blue-500 hover:text-brand-blue-700 truncate text-xs font-bold hover:underline",
              i === path.length - 1
                ? "text-brand-blue-700"
                : "text-brand-blue-500",
            )}
          >
            {segment.label}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
