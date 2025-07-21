import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold text-slate-950 ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-200 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border border-brand-blue-500 bg-brand-blue-500 text-white hover:border-brand-blue-600 hover:bg-brand-blue-600",
        secondary:
          "border border-slate-200 bg-white text-slate-900 hover:bg-slate-100",
        ghost:
          "hover:bg-slate-200/50 focus-visible:ring-0 focus-visible:ring-offset-0",
        input:
          "w-full rounded-md border border-slate-400 bg-white px-3 py-2 font-normal text-slate-900 disabled:cursor-not-allowed",
        "destructive-ghost": "font-bold text-red-500 hover:bg-red-100",
        "header-button":
          "bg-white rounded-full border-1 border-gray-100 px-2 shadow-sm hover:bg-gray-50",
        new: "bg-brand-green-500 text-white hover:bg-brand-green-600",
        pagination:
          "bg-brand-blue-300/50 text-slate-900 hover:bg-brand-blue-300",
        "table-edit":
          "border border-slate-300 bg-white text-xs text-slate-700 shadow hover:border-slate-500 hover:bg-slate-100 hover:text-slate-800",
        "table-delete":
          "border border-red-500 bg-red-100 text-xs text-red-500 shadow hover:border-red-700 hover:bg-red-200 hover:text-red-800",
        destructive:
          "border border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        icon: "size-10",
        input: "min-h-10 px-3 py-2",
        sm: "h-9 px-3 py-1.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  focusVisible?: boolean;
  readOnly?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, type = "button", ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        type={type}
        className={cn(
          buttonVariants({ variant, size }),
          variant === "input" && {
            "bg-slate-200": props.disabled && !props.readOnly,
            "cursor-default": props.readOnly,
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
