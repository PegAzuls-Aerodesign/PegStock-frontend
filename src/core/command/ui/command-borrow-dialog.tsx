import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { CommandBorrowForm } from "./command-borrow-form";

interface DialogProps {
  materialCod?: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const CommandBorrowDialog: React.FC<DialogProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="z-[60] max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-none border-0 bg-transparent p-0"
        overlayClassName="z-[55]"
      >
        <CommandBorrowForm
          materialCod={props.materialCod}
          onSuccess={handleClose}
          hideFooter
        />
      </DialogContent>
      <DialogTrigger asChild>
        <Button variant="primary" size="primary">
          Emprestar
        </Button>
      </DialogTrigger>
    </Dialog>
  );
};
