import { FormContainer } from "@/components/form/container";
import { ControlledCombobox } from "@/components/form/input/combobox";
import { ControlledDateInput } from "@/components/form/input/date-input";
import { ControlledNumberInput } from "@/components/form/input/number-input";
import { ControlledTextInput } from "@/components/form/input/text-input";
import { Button } from "@/components/ui/button";
import { useMateriaisOptions } from "@/core/material/material.utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { useCommandBorrowForm } from "../command.form";
import { useCommandBorrow } from "../command.service";

interface Props {
  materialCod?: number;
  onSuccess?: () => void;
  hideFooter?: boolean;
}
export const CommandBorrowForm: React.FC<Props> = (props) => {
  const form = useCommandBorrowForm(props.materialCod);

  const emprestar = useCommandBorrow({
    onSuccess: () => {
      props.onSuccess?.();
    },
  });

  const handleSubmit = form.handleSubmit((material) => {
    if (material) {
      emprestar.mutate(material);
    }
  });

  const materialOptions = useMateriaisOptions();

  return (
    <FormContainer
      title={"Emprestar Material"}
      onSubmit={handleSubmit}
      onCancel={form.reset}
      isSubmitting={emprestar.isPending}
      isLoading={materialOptions.isLoading}
      hideFooter={props.hideFooter}
      footerContent={
        <CommandFooter
          isPending={emprestar.isPending}
          onSubmit={handleSubmit}
        />
      }
    >
      <ControlledCombobox
        control={form.control}
        name="materialCod"
        label="Código do Material"
        placeholder={
          materialOptions.isLoading
            ? "Carregando..."
            : "Digite o código do material"
        }
        {...materialOptions}
        isRequired
        disabled
      />
      <ControlledNumberInput
        control={form.control}
        name="quantity"
        label="Quantidade"
        placeholder={
          materialOptions.isLoading
            ? "Carregando..."
            : "Digite a quantidade do material"
        }
        min={1}
        isRequired
      />
      <ControlledDateInput
        control={form.control}
        name="expirationDate"
        label="Data de Validade"
        placeholder="DD/MM/AAAA"
        isRequired
      />
      <ControlledTextInput
        control={form.control}
        name="borrower"
        label="Recebedor"
        placeholder="Digite o nome do recebedor"
        isRequired
      />
      <ControlledTextInput
        control={form.control}
        name="responsible"
        label="Responsável"
        placeholder="Digite o nome do responsável"
        isRequired
      />
    </FormContainer>
  );
};

interface CommandFooterProps {
  isPending: boolean;
  onSubmit: () => void;
}

const CommandFooter: React.FC<CommandFooterProps> = ({
  isPending,
  onSubmit,
}) => {
  return (
    <div className="flex w-full justify-end gap-4">
      <DialogClose asChild>
        <Button variant="secondary" size="primary" disabled={isPending}>
          Cancelar
        </Button>
      </DialogClose>
      {/* <DialogClose asChild> */}
      <Button
        variant="primary"
        size="primary"
        onClick={() => onSubmit()}
        disabled={isPending}
      >
        Emprestar
      </Button>
      {/* </DialogClose> */}
    </div>
  );
};
