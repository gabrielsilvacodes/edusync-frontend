export type UserRole = "admin" | "professor" | "aluno";

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface User {
  id: number;
  nome: string;
  email: string;
  role?: UserRole;
}
