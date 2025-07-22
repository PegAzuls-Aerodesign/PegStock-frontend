import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2.5 py-0.5 text-sm font-medium",
  {
    variants: {
      variant: {
        default: "text-slate-600 bg-slate-100",
        available: "text-green-600 bg-green-100",
        unavailable: "text-red-600 bg-red-100",
        warning: "text-yellow-600 bg-yellow-100",
      },
      size: {
        default: "text-sm px-2.5 py-0.5",
        sm: "text-xs px-2 py-0.5",
        lg: "text-base px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  className?: string;
  children?: React.ReactNode;
}

export const Badge = ({ variant, className, children }: BadgeProps) => {
  return (
    <div
      className={cn(
        badgeVariants({ variant }),
        "me-2 rounded-sm px-2.5 py-0.5 text-sm font-medium",
        className,
      )}
    >
      {children}
    </div>
  );
};
