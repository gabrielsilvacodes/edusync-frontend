import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useRedirectIfAuthenticated } from "../hooks/useRedirectIfAuthenticated";
import type { LoginData } from "../types/types";

export default function LoginPage() {
  const [credentials, setCredentials] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  useRedirectIfAuthenticated();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/token/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data?.detail || "E-mail ou senha incorretos.");
        return;
      }

      login(data.access);
      navigate("/dashboard");
    } catch (error: unknown) {
      console.error(error);
      setError("Erro inesperado. Verifique sua conexão.");
    }
  };

  return (
    <main>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            required
            type="email"
            id="email"
            name="email"
            placeholder="Digite seu e-mail"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input
            required
            type="password"
            id="password"
            name="password"
            placeholder="Digite sua senha"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}
