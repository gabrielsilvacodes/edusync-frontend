import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

// Lazy Loading das páginas
const LoginPage = lazy(() => import("../pages/LoginPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const AlunoFormPage = lazy(() => import("../pages/AlunoFormPage"));
const AlunoDetailPage = lazy(() => import("../pages/AlunoDetailPage"));



function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    // Ainda validando, bloqueia tudo!
    return <div>Verificando sessão...</div>;
  }

  if (isAuthenticated === false) {
    // Sessão inválida, redireciona sem renderizar nada
    window.location.href = "/login";
    return null;
  }

  return children;
}

export function AppRoutes() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/alunos/new"
          element={
            <PrivateRoute>
              <AlunoFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/alunos/:id"
          element={
            <PrivateRoute>
              <AlunoDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/alunos/:id/edit"
          element={
            <PrivateRoute>
              <AlunoFormPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}