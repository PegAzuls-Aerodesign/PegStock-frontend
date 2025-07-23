import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { CommandMaterialForm } from "./command-material-form";

interface DialogProps {
  materialCod?: number;
  onSuccess?: () => void;
  onCancel?: () => void;
  type: "add" | "remove";
}

export const CommandMaterialDialog: React.FC<DialogProps> = ({
  type,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonName = type === "add" ? "Adicionar Material" : "Remover Material";
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="z-[60] max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-none border-0 bg-transparent p-0"
        overlayClassName="z-[55]"
      >
        <CommandMaterialForm
          materialCod={props.materialCod}
          onSuccess={props.onSuccess}
          hideFooter
          type={type}
        />
      </DialogContent>
      <DialogTrigger asChild>
        <Button variant="primary" size="primary">
          {buttonName}
        </Button>
      </DialogTrigger>
    </Dialog>
  );
};
