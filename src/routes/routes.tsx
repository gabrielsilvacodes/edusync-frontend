import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

// Lazy Loading das páginas
const LoginPage = lazy(() => import("../pages/LoginPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const AlunoFormPage = lazy(() => import("../pages/AlunoFormPage"));
const AlunoDetailPage = lazy(() => import("../pages/AlunoDetailPage"));
const ProfessorFormPage = lazy(() => import("../pages/ProfessorFormPage"));
const ProfessorDetailPage = lazy(() => import("../pages/ProfessorDetailPage"));
const MateriaFormPage = lazy(() => import("../pages/MateriaFormPage"));
const MateriaDetailPage = lazy(() => import("../pages/MateriaDetailPage"));
const TurmaFormPage = lazy(() => import("../pages/TurmaFormPage"));
const TurmaDetailPage = lazy(() => import("../pages/TurmaDetailPage"));
const TurmaMateriaFormPage = lazy(() => import("../pages/TurmaMateriaFormPage"));
const TurmaMateriaDetailPage = lazy(() => import("../pages/TurmaMateriaDetailPage"));
const AvaliacaoFormPage = lazy(() => import("../pages/AvaliacaoFormPage"));
const AvaliacaoDetailPage = lazy(() => import("../pages/AvaliacaoDetailPage"));



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
        <Route
          path="/professores/new"
          element={
            <PrivateRoute>
              <ProfessorFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/professores/:id"
          element={
            <PrivateRoute>
              <ProfessorDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/professores/:id/edit"
          element={
            <PrivateRoute>
              <ProfessorFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/materias/new"
          element={
            <PrivateRoute>
              <MateriaFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/materias/:id"
          element={
            <PrivateRoute>
              <MateriaDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/materias/:id/edit"
          element={
            <PrivateRoute>
              <MateriaFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/turmas/new"
          element={
            <PrivateRoute>
              <TurmaFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/turmas/:id"
          element={
            <PrivateRoute>
              <TurmaDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/turmas/:id/edit"
          element={
            <PrivateRoute>
              <TurmaFormPage />
            </PrivateRoute>
          }
        />
                <Route
          path="/turmas&materias/new"
          element={
            <PrivateRoute>
              <TurmaMateriaFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/turmas&materias/:id"
          element={
            <PrivateRoute>
              <TurmaMateriaDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/turmas&materias/:id/edit"
          element={
            <PrivateRoute>
              <TurmaMateriaFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/avaliacoes/new"
          element={
            <PrivateRoute>
              <AvaliacaoFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/avaliacoes/:id"
          element={
            <PrivateRoute>
              <AvaliacaoDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/avaliacoes/:id/edit"
          element={
            <PrivateRoute>
              <AvaliacaoFormPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}