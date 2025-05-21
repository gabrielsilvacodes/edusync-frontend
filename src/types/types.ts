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

export type Professor = {
  id?: number;
  nome: string;
  email: string;
  formacao: string;
};

export type ProfessorFormData = {
  nome: string;
  email: string;
  formacao: string;
};

export type Materia = {
  id?: number;
  nome: string;
};

export type MateriaFormData = {
  nome: string;
};

export type Turma = {
  id?: number;
  nome: string;
  descricao: string;
  alunos: number[]; // IDs dos alunos
};

export type TurmaFormData = {
  nome: string;
  descricao: string;
  alunos: number[];
};

export type TurmaMateria = {
  id?: number;
  turma: number;
  materia: number;
  professor: number;
};

export type TurmaMateriaFormData = {
  turma: number;
  materia: number;
  professor: number;
};

export type Avaliacao = {
  id?: number;
  nota: number;
  data_avaliacao: string;
  aluno: { id: number; nome: string }; 
  turma_materia: number;
};

export type AvaliacaoFormData = {
  nota: number;
  data_avaliacao: string;
  aluno_id: number;
  turma_materia: number;
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

