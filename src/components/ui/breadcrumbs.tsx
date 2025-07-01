"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { HiOutlineChevronRight } from "react-icons/hi2";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { HiDotsHorizontal } from "react-icons/hi";

function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        // "text-muted-brand-blue-500 flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        "flex flex-wrap items-center gap-1.5 text-sm break-words text-red-500 sm:gap-2.5",
        className,
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<typeof Link> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : Link;

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-brand-blue-500 transition-colors", className)}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-brand-blue-500 font-normal", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <HiOutlineChevronRight />}
    </li>
  );
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <HiDotsHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};

export interface BreadcrumbsProps {
  items: {
    label: string;
    href: string;
  }[];
}

export interface Breadcrumb {
  href: string;
  label: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => (
  <Breadcrumb>
    <BreadcrumbList>
      {items.map((item, idx) => {
        const isLastItem = idx === items.length - 1;
        return (
          <React.Fragment key={item.label}>
            <BreadcrumbItem className={cn({ "hidden md:block": !isLastItem })}>
              {isLastItem ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href || "#"}>
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {idx < items.length - 1 && (
              <BreadcrumbSeparator
                className={cn({ "hidden md:block": !isLastItem })}
              />
            )}
          </React.Fragment>
        );
      })}
    </BreadcrumbList>
  </Breadcrumb>
);

// export function Breadcrumbs({ path }: { path: Array<Breadcrumb> }) {
//   return (
//     <div className="flex flex-row items-center gap-1 underline-offset-2">
//       <Link
//         href="/home"
//         className="text-brand-blue-500 hover:text-brand-blue-700 text-xs font-bold hover:underline"
//       >
//         Home
//       </Link>
//       {path.map((segment, i) => (
//         <Fragment key={i}>
//           <HiOutlineChevronRight
//             size={12}
//             className="text-slate-500"
//             strokeWidth={2.5}
//           />
//           <Link
//             href={segment.href}
//             className={cn(
//               "text-brand-blue-500 hover:text-brand-blue-700 truncate text-xs font-bold hover:underline",
//               i === path.length - 1
//                 ? "text-brand-blue-700"
//                 : "text-brand-blue-500",
//             )}
//           >
//             {segment.label}
//           </Link>
//         </Fragment>
//       ))}
//     </div>
//   );
// }
