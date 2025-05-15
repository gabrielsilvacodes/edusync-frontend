import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main>
      <h1>Bem-vindo ao painel</h1>
      <p>Você está logado.</p>
      <button type="button" onClick={handleLogout} aria-label="Sair do sistema">
        Sair da conta
      </button>
    </main>
  );
}
