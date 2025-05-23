// Tipo de resposta de paginação da API (usado com React Query)
export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

// Credenciais de autenticação para login de usuário
export type LoginFormInputs = {
  username: string;
  password: string;
};

// Representação completa de um aluno no sistema
export type Aluno = {
  id: number;
  nome: string;
  email: string;
  matricula: string;
  data_nascimento: string;
};

// Dados necessários para criação/atualização de alunos
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
  alunos: number[]; 
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

