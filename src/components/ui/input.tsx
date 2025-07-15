import { cn } from "@/lib/utils";
import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full min-w-0 rounded-md border border-slate-400 bg-white px-3 py-2 text-sm text-slate-800 ring-offset-white placeholder:text-sm placeholder:text-slate-500",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "focus-visible:ring-brand-blue-200 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:outline-none",
          "read-only:cursor-default read-only:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-200",
          className,
        )}
        value={value ?? ""}
        {...props}
        ref={ref}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
