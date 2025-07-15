"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { type FC, type ReactNode } from "react";

const sectionVariants = cva("", {
  variants: {
    variant: {
      default: "border-b border-slate-300",
      borderless: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface SectionProps extends VariantProps<typeof sectionVariants> {
  title?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "borderless";
}

export const FormSection: FC<SectionProps> = (props) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 py-2 lg:py-4",
        sectionVariants({ variant: props.variant }),
      )}
    >
      {props.title && (
        <h2 className="text-brand-blue-600 pb-2 font-semibold">
          {props.title}
        </h2>
      )}
      <div
        className={cn(
          "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
          props.className,
        )}
      >
        {props.children}
      </div>
    </div>
  );
};
