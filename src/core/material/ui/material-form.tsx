"use client";

import { FormContainer, type FormProps } from "@/components/form/container";
import { ControlledDateInput } from "@/components/form/input/date-input";
import { ControlledNumberInput } from "@/components/form/input/number-input";
import { ControlledSelect } from "@/components/form/input/select";
import { ControlledTextInput } from "@/components/form/input/text-input";
import { ControlledTextArea } from "@/components/form/input/textarea";
import { FormSection } from "@/components/form/section";
import { AddMaterialDialog } from "@/core/command/ui/command-add-material-dialog";
import { RemoveMaterialDialog } from "@/core/command/ui/command-remove-material-dialog";
import React, { Fragment } from "react";
import { type MaterialSchema } from "../material.form";
import { caixaOptions, categoriaOptions } from "../material.utils";

interface Props extends FormProps<MaterialSchema> {}

interface MaterialProps extends Props {}

export const MaterialForm: React.FC<MaterialProps> = ({ form, ...props }) => {
  return (
    <Fragment>
      <FormSection title="Dados do Material">
        <ControlledTextInput
          control={form.control}
          name="name"
          label="Nome"
          placeholder={
            props.isLoading ? "Carregando..." : "Digite o nome do material"
          }
          disabled={props.readOnly || props.isLoading}
          isRequired
        />
        <ControlledSelect
          control={form.control}
          name="category"
          label="Categoria"
          placeholder={
            props.isLoading
              ? "Carregando..."
              : "Selecione a categoria do material"
          }
          options={categoriaOptions}
          disabled={props.readOnly || props.isLoading}
          isRequired
        />
        <ControlledNumberInput
          control={form.control}
          name="quantity"
          label="Quantidade"
          placeholder={
            props.isLoading
              ? "Carregando..."
              : "Digite a quantidade do material"
          }
          min={0}
          disabled={props.readOnly || props.isLoading}
          isRequired
        />
        <ControlledSelect
          control={form.control}
          name="box"
          label="Caixa"
          placeholder={
            props.isLoading ? "Carregando..." : "Selecione a caixa do material"
          }
          options={caixaOptions}
          disabled={props.readOnly || props.isLoading}
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
          placeholder={
            props.isLoading
              ? "Carregando..."
              : "Digite uma descrição do material"
          }
          disabled={props.readOnly || props.isLoading}
          rows={5}
        />
      </FormSection>
      <FormSection title="Informações Adicionais">
        <ControlledTextInput
          control={form.control}
          name="brand"
          label="Marca"
          placeholder={
            props.isLoading ? "Carregando..." : "Digite a marca do material"
          }
          disabled={props.readOnly || props.isLoading}
        />
        <ControlledDateInput
          control={form.control}
          name="expirationDate"
          label="Data de Validade"
          placeholder={props.isLoading ? "Carregando..." : "DD/MM/AAAA"}
          disabled={props.readOnly || props.isLoading}
        />
      </FormSection>
    </Fragment>
  );
};

interface DialogProps extends Props {
  refetch?: () => void;
}

export const MaterialContainerForm: React.FC<DialogProps> = (props) => {
  const materialCod = props.form.watch("cod") || undefined;
  return (
    <FormContainer
      {...props}
      footerContent={
        props.hideFooter && (
          <MaterialFooter
            materialCod={materialCod}
            isLoading={props.isLoading}
            refetch={props.refetch}
            onCancel={props.onCancel}
          />
        )
      }
    >
      <MaterialForm {...props} />
    </FormContainer>
  );
};

const MaterialFooter: React.FC<{
  materialCod?: number;
  isLoading?: boolean;
  refetch?: () => void;
  onCancel?: () => void;
}> = (props) => {
  return (
    <div className="flex w-full justify-end gap-4">
      <RemoveMaterialDialog
        materialCod={props.materialCod}
        onSuccess={props.refetch}
        onCancel={props.onCancel}
      />
      <AddMaterialDialog
        materialCod={props.materialCod}
        onSuccess={props.refetch}
        onCancel={props.onCancel}
      />
    </div>
  );
};
