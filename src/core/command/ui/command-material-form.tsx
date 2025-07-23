import { FormContainer } from "@/components/form/container";
import { ControlledCombobox } from "@/components/form/input/combobox";
import { ControlledNumberInput } from "@/components/form/input/number-input";
import { Button } from "@/components/ui/button";
import { useMateriaisOptions } from "@/core/material/material.utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { useCommandMaterialForm } from "../command-material.form";
import {
  useCommandAddMaterial,
  useCommandRemoveMaterial,
} from "../command-material.service";

type OperationType = "add" | "remove";

interface Props {
  materialCod?: number;
  onSuccess?: () => void;
  hideFooter?: boolean;
  type: OperationType;
}
export const CommandMaterialForm: React.FC<Props> = ({ type, ...props }) => {
  const form = useCommandMaterialForm(props.materialCod);

  const adicionarMaterial = useCommandAddMaterial({
    onSuccess: () => {
      props.onSuccess?.();
    },
  });
  const removerMaterial = useCommandRemoveMaterial({
    onSuccess: () => {
      props.onSuccess?.();
    },
  });

  const handleSubmit = form.handleSubmit((material) => {
    if (material) {
      if (type === "add") {
        adicionarMaterial.mutate(material);
      } else {
        removerMaterial.mutate(material);
      }
    }
  });

  const materialOptions = useMateriaisOptions();

  const title = type === "add" ? "Adicionar Material" : "Remover Material";
  const isLoading = adicionarMaterial.isPending || removerMaterial.isPending;
  const isSubmitting = adicionarMaterial.isPending || removerMaterial.isPending;
  return (
    <FormContainer
      title={title}
      onSubmit={handleSubmit}
      onCancel={form.reset}
      isSubmitting={isSubmitting}
      isLoading={isLoading}
      hideFooter={props.hideFooter}
      footerContent={
        <CommandFooter
          isPending={isSubmitting}
          onSubmit={handleSubmit}
          type={type}
        />
      }
    >
      <ControlledCombobox
        control={form.control}
        name="materialCod"
        label="Código do Material"
        placeholder={
          isLoading ? "Carregando..." : "Digite o código do material"
        }
        {...materialOptions}
        disabled
      />
      <ControlledNumberInput
        control={form.control}
        name="quantity"
        label="Quantidade"
        placeholder={
          isLoading ? "Carregando..." : "Digite a quantidade do material"
        }
        min={0}
        isRequired
      />
    </FormContainer>
  );
};

interface CommandFooterProps {
  isPending: boolean;
  onSubmit: () => void;
  type: OperationType;
}

const CommandFooter: React.FC<CommandFooterProps> = ({
  isPending,
  onSubmit,
  type,
}) => (
  <div className="flex w-full justify-end gap-4">
    <DialogClose asChild>
      <Button variant="secondary" size="primary" disabled={isPending}>
        Cancelar
      </Button>
    </DialogClose>
    <DialogClose asChild>
      <Button
        variant="primary"
        size="primary"
        onClick={() => onSubmit()}
        disabled={isPending}
      >
        {type === "add" ? "Adicionar" : "Remover"}
      </Button>
    </DialogClose>
  </div>
);
