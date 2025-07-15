import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  label?: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
}

export const FloatingLabel: React.FC<Props> = (props) => {
  return (
    <div className="relative">
      {props.label && (
        <label
          className={cn(
            "pointer-events-none z-10 cursor-text rounded-sm bg-white px-2 text-sm leading-none font-semibold whitespace-nowrap text-black",
            "absolute top-2 left-1.5 origin-[0] -translate-y-4 scale-75 transform",
            {
              "text-opacity-70 bg-linear-to-b from-white to-slate-100":
                props.disabled,
              "text-opacity-70": props.readOnly,
            },
            props.className,
          )}
        >
          {props.label}
        </label>
      )}
      {props.children}
    </div>
  );
};
