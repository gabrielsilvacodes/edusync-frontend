import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextType } from "./AuthContext";
import api from "../services/api";

// Criação do contexto com valor padrão tipado
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Provedor de autenticação que envolve a aplicação
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Estado null inicial representa "carregando/indeterminado"
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

// Função de login com credenciais
const login = async (username: string, password: string) => {
  const { data } = await api.post("/api/token/", { username, password });

  // Armazenamento dos tokens no localStorage
  localStorage.setItem("access_token", data.access);
  localStorage.setItem("refresh_token", data.refresh);

  // Configura o header de autorização globalmente
  api.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
  setIsAuthenticated(true);
};

  // Função de logout
  const logout = () => {
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  // Efeito para validação inicial da sessão
  useEffect(() => {
    const validateSession = async () => {
      try {
        await api.get("/api/v1/alunos/");
        setIsAuthenticated(true);
      } catch (error: any) {
        setIsAuthenticated(false);
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    };
  
    validateSession();
  }, []); // Executa apenas no mount do componente

  // Loading state enquanto verifica autenticação
  if (isAuthenticated === null) {
    return <div>Verificando sessão...</div>;
  }

// Provedor do contexto com os valores atualizados
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
