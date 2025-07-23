import { FormContainer } from "@/components/form/container";
import { ControlledCombobox } from "@/components/form/input/combobox";
import { ControlledNumberInput } from "@/components/form/input/number-input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useMateriaisOptions } from "@/core/material/material.utils";
import { useCommandMaterialForm } from "../command-material.form";
import { useCommandAddMaterial } from "../command-material.service";

export const AdicionarMaterialForm: React.FC<{
  materialCod?: number;
  onSuccess?: () => void;
  hideFooter?: boolean;
}> = ({ materialCod: id, onSuccess, hideFooter }) => {
  const form = useCommandMaterialForm(id);
  const addMaterial = useCommandAddMaterial({
    onSuccess: () => {
      onSuccess?.();
    },
  });
  const handleSubmit = form.handleSubmit((material) => {
    if (material) {
      addMaterial.mutate(material);
    }
  });
  const materialOptions = useMateriaisOptions();

  return (
    <FormContainer
      title="Adicionar Material"
      onSubmit={handleSubmit}
      onCancel={() => {}}
      isLoading={addMaterial.isPending}
      isSubmitting={addMaterial.isPending}
      hideFooter={hideFooter}
      footerContent={
        <AddFooter isPending={addMaterial.isPending} onSubmit={handleSubmit} />
      }
    >
      <ControlledCombobox
        control={form.control}
        name="materialCod"
        label="Código do Material"
        placeholder="Digite o código do material"
        {...materialOptions}
        disabled
      />
      <ControlledNumberInput
        control={form.control}
        name="quantity"
        label="Quantidade"
        placeholder="Digite a quantidade do material"
        min={0}
      />
    </FormContainer>
  );
};

const AddFooter: React.FC<{
  isPending: boolean;
  onSubmit: () => void;
}> = ({ isPending, onSubmit }) => (
  <div className="flex w-full justify-end gap-4">
    <DialogClose asChild>
      <Button variant="secondary" type="button" disabled={isPending}>
        Cancelar
      </Button>
    </DialogClose>
    <DialogClose>
      <Button
        variant="primary"
        type="button"
        onClick={onSubmit}
        disabled={isPending}
      >
        Confirmar
      </Button>
    </DialogClose>
  </div>
);
