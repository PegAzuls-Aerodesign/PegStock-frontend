interface EmprestimoBase {
  cod?: number | null;
  materialCod: number;
  expirationDate: string;
  quantity: number;
  borrower: string;
  responsible: string;
}

export interface EmprestimoDto extends EmprestimoBase {
  nameMaterial: string | null;
  createdDate: string;
  returned: boolean;
}

export interface CreateEmprestimoDto extends EmprestimoBase {}

export interface UpdateEmprestimoDto extends CreateEmprestimoDto {}
