import { cn } from "@/lib/utils";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { Button } from "../ui/button";

interface EyeButtonProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  className?: string;
}

export const EyeButton: React.FC<EyeButtonProps> = ({
  showPassword,
  setShowPassword,
  className,
}) => (
  <Button
    variant="ghost"
    className={cn("absolute right-0 top-0 hover:bg-transparent", className)}
    size="icon"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? (
      <HiOutlineEyeSlash className="text-slate-500 hover:scale-105" size={20} />
    ) : (
      <HiOutlineEye className="text-slate-500 hover:scale-105" size={20} />
    )}
  </Button>
);
