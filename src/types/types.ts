export type Aluno = {
  id: number;
  nome: string;
  email: string;
  matricula: string;
  data_nascimento: string;
};

// Tipo para o formulário de Produto
export type AlunoFormData = {
  id?: number;
  nome: string;
  email: string;
  matricula: string;
  data_nascimento: string;
};

// Tipo de resposta de paginação da API (usado com React Query)
export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type LoginFormInputs = {
  username: string;
  password: string;
};