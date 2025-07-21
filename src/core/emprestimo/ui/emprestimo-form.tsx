"use client";

import { FormContainer, type FormProps } from "@/components/form/container";
import { ControlledCombobox } from "@/components/form/input/combobox";
import { ControlledDateInput } from "@/components/form/input/date-input";
import { ControlledNumberInput } from "@/components/form/input/number-input";
import { ControlledTextInput } from "@/components/form/input/text-input";
import { FormSection } from "@/components/form/section";
import { useMateriaisOptions } from "@/core/material/material.utils";
import React, { Fragment } from "react";
import { type EmprestimoSchema } from "../emprestimo.form";

interface Props extends FormProps<EmprestimoSchema> {}

interface EmprestimoProps extends Pick<Props, "form"> {}

export const EmprestimoForm: React.FC<EmprestimoProps> = ({ form }) => {
  const cod = form.getValues("cod");

  const materiaisOptions = useMateriaisOptions();
  return (
    <Fragment>
      <FormSection title="Dados do Emprestimo">
        <ControlledCombobox
          control={form.control}
          name="materialCod"
          label="Material"
          placeholder="Digite o nome do material"
          {...materiaisOptions}
          disabled={!!cod}
          isRequired
        />
        <ControlledNumberInput
          control={form.control}
          name="quantity"
          label="Quantidade"
          placeholder="Digite a quantidade do material"
          min={1}
          disabled={!!cod}
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
          disabled={!!cod}
          isRequired
        />
        <ControlledTextInput
          control={form.control}
          name="responsible"
          label="Responsável"
          placeholder="Digite o nome do responsável"
          disabled={!!cod}
          isRequired
        />
      </FormSection>
    </Fragment>
  );
};

export const EmprestimoContainerForm: React.FC<Props> = ({
  form,
  ...props
}: Props) => {
  return (
    <FormContainer {...props}>
      <EmprestimoForm form={form} />
    </FormContainer>
  );
};
