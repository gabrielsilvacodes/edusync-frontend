import type { JSX } from "react";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

// Lazy Loading das páginas
const LoginPage = lazy(() => import("../pages/LoginPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const AlunoFormPage = lazy(() => import("../pages/aluno/AlunoFormPage"));
const AlunoDetailPage = lazy(() => import("../pages/aluno/AlunoDetailPage"));
const ProfessorFormPage = lazy(() => import("../pages/professor/ProfessorFormPage"));
const ProfessorDetailPage = lazy(() => import("../pages/professor/ProfessorDetailPage"));
const MateriaFormPage = lazy(() => import("../pages/materia/MateriaFormPage"));
const MateriaDetailPage = lazy(() => import("../pages/materia/MateriaDetailPage"));
const TurmaFormPage = lazy(() => import("../pages/turma/TurmaFormPage"));
const TurmaDetailPage = lazy(() => import("../pages/turma/TurmaDetailPage"));
const TurmaMateriaFormPage = lazy(() => import("../pages/turmaMateria/TurmaMateriaFormPage"));
const TurmaMateriaDetailPage = lazy(() => import("../pages/turmaMateria/TurmaMateriaDetailPage"));
const AvaliacaoFormPage = lazy(() => import("../pages/avaliacao/AvaliacaoFormPage"));
const AvaliacaoDetailPage = lazy(() => import("../pages/avaliacao/AvaliacaoDetailPage"));
function PrivateRoute({ children }: { children: JSX.Element }) {const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    // Validando a sessão
    return <div>Verificando sessão...</div>;
  }

  if (isAuthenticated === false) {
    // Sessão inválida
    window.location.href = "/login";
    return null;
  }

  return children;
}

//Rotas das páginas
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
          path="/turmas-materias/new"
          element={
            <PrivateRoute>
              <TurmaMateriaFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/turmas-materias/:id"
          element={
            <PrivateRoute>
              <TurmaMateriaDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/turmas-materias/:id/edit"
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
