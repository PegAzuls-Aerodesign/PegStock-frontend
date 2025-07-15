"use client";

import { FormContainer, type FormProps } from "@/components/form/container";
import { ControlledGenericInput } from "@/components/form/input/generic-input";
import { ControlledNumberInput } from "@/components/form/input/number-input";
import { ControlledSelect } from "@/components/form/input/select";
import { ControlledTextInput } from "@/components/form/input/text-input";
import { ControlledTextArea } from "@/components/form/input/textarea";
import { FormSection } from "@/components/form/section";
import React, { Fragment } from "react";
import { type MaterialSchema } from "../material.form";
import { caixaOptions, categoriaOptions } from "../material.utils";

interface Props extends FormProps<MaterialSchema> {}

interface MaterialProps extends Pick<Props, "form"> {}

export const MaterialForm: React.FC<MaterialProps> = ({ form }) => {
  return (
    <Fragment>
      <FormSection title="Dados do Material">
        <ControlledTextInput
          control={form.control}
          name="name"
          label="Nome"
          placeholder="Digite o nome do material"
          isRequired
        />
        <ControlledSelect
          control={form.control}
          name="category"
          label="Categoria"
          placeholder="Selecione a categoria do material"
          options={categoriaOptions}
          isRequired
        />
        <ControlledNumberInput
          control={form.control}
          name="quantity"
          label="Quantidade"
          placeholder="Digite a quantidade do material"
          min={0}
          isRequired
        />
        <ControlledSelect
          control={form.control}
          name="box"
          label="Caixa"
          placeholder="Selecione a caixa do material"
          options={caixaOptions}
          isRequired
        />
      </FormSection>
      <FormSection
        title="Detalhes do Material"
        className="sm:grid-cols-1 lg:grid-cols-1"
      >
        <ControlledTextArea
          control={form.control}
          name="description"
          label="Descrição"
          placeholder="Digite uma descrição do material"
          rows={5}
        />
      </FormSection>
      <FormSection title="Informações Adicionais">
        <ControlledGenericInput
          control={form.control}
          name="createdDate"
          label="Data de Criação"
          placeholder="DD/MM/AAAA"
          type="date"
          isRequired
          disabled
        />
        <ControlledGenericInput
          control={form.control}
          name="expirationDate"
          label="Data de Validade"
          placeholder="DD/MM/AAAA"
          type="date"
          isRequired
        />
      </FormSection>
      {/* <FormErrorsContainer form={form} /> */}
    </Fragment>
  );
};

export const MaterialContainerForm: React.FC<Props> = ({
  form,
  ...props
}: Props) => {
  return (
    <FormContainer {...props}>
      <MaterialForm form={form} />
    </FormContainer>
  );
};
