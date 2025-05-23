// Tipagem do contexto de autenticação
export type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>; 
  logout: () => void;
};
