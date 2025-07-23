import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RemoverMaterialForm } from "./command-remove-material-form";

interface DialogProps {
  materialCod?: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const RemoveMaterialDialog: React.FC<DialogProps> = (props) => (
  <Dialog>
    <DialogContent
      className="z-[60] max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-none border-0 bg-transparent p-0"
      overlayClassName="z-[55]"
    >
      <RemoverMaterialForm
        materialCod={props.materialCod}
        onSuccess={props.onSuccess}
        hideFooter
      />
    </DialogContent>
    <DialogTrigger asChild>
      <Button type="button" variant="secondary" size="primary">
        Remover
      </Button>
    </DialogTrigger>
  </Dialog>
);
