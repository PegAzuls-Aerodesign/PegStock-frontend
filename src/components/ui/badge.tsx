import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
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

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
