import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import type { Aluno, Professor, Materia, Turma, Avaliacao, TurmaMateria } from "../types/types";

function DashboardPage() {
  const navigate = useNavigate();

  // Paginação separada para cada grid
  const [alunoPage, setAlunoPage] = useState(1);
  const [profPage, setProfPage] = useState(1);
  const [matPage, setMatPage] = useState(1);
  const [turmaPage, setTurmaPage] = useState(1);
  const [avalPage, setAvalPage] = useState(1);
  const [turmaMateriaPage, setTurmaMateriaPage] = useState(1);

  // Queries separadas
  const { data: alunos, isLoading: loadingAlunos, error: errorAlunos } = useQuery({
    queryKey: ["alunos", alunoPage],
    queryFn: () => api.get(`/api/v1/alunos/?page=${alunoPage}`).then(res => res.data),
  });

  const { data: professores, isLoading: loadingProfs, error: errorProfs } = useQuery({
    queryKey: ["professores", profPage],
    queryFn: () => api.get(`/api/v1/professores/?page=${profPage}`).then(res => res.data),
  });

  const { data: materias, isLoading: loadingMats, error: errorMats } = useQuery({
    queryKey: ["materias", matPage],
    queryFn: () => api.get(`/api/v1/materias/?page=${matPage}`).then(res => res.data),
  });

  const { data: turmas, isLoading: loadingTurmas, error: errorTurmas } = useQuery({
    queryKey: ["turmas", turmaPage],
    queryFn: () => api.get(`/api/v1/turmas/?page=${turmaPage}`).then(res => res.data),
  });

  const { data: avaliacoes, isLoading: loadingAvals, error: errorAvals } = useQuery({
    queryKey: ["avaliacoes", avalPage],
    queryFn: () => api.get(`/api/v1/avaliacoes/?page=${avalPage}`).then(res => res.data),
  });

  // TurmaMaterias (usando endpoint do backend)
  const { data: turmaMaterias, isLoading: loadingTM, error: errorTM } = useQuery({
    queryKey: ["turmaMaterias", turmaMateriaPage],
    queryFn: () => api.get(`/api/v1/turmas&materias/?page=${turmaMateriaPage}`).then(res => res.data),
  });

  return (
    <div className="p-8 space-y-16">
      {/* Alunos */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Alunos</h1>
          <button
            onClick={() => navigate("/alunos/new")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Novo Aluno
          </button>
        </div>
        {loadingAlunos ? (
          <p className="text-center mt-10">Carregando alunos...</p>
        ) : errorAlunos ? (
          <p className="text-center mt-10 text-red-500">Erro ao carregar os alunos.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {alunos?.results?.length === 0 && (
                <p className="col-span-full text-center text-gray-500">Nenhum aluno cadastrado.</p>
              )}
              {alunos?.results?.map((aluno: Aluno) => (
                <div
                  key={aluno.id}
                  className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col h-full"
                >
                  <p className="font-semibold">{aluno.nome}</p>
                  <p className="text-gray-600 text-sm">{aluno.email}</p>
                  <p className="text-gray-600 text-sm">Matrícula: {aluno.matricula}</p>
                  <p className="text-gray-600 text-sm">Nascimento: {aluno.data_nascimento}</p>
                  <button
                    onClick={() => navigate(`/alunos/${aluno.id}`)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Detalhes
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => setAlunoPage(alunoPage - 1)}
                disabled={alunoPage === 1}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setAlunoPage(alunoPage + 1)}
                disabled={!alunos?.next}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
          </>
        )}
      </section>

      {/* Professores */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Professores</h1>
          <button
            onClick={() => navigate("/professores/new")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Novo Professor
          </button>
        </div>
        {loadingProfs ? (
          <p className="text-center mt-10">Carregando professores...</p>
        ) : errorProfs ? (
          <p className="text-center mt-10 text-red-500">Erro ao carregar os professores.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {professores?.results?.length === 0 && (
                <p className="col-span-full text-center text-gray-500">Nenhum professor cadastrado.</p>
              )}
              {professores?.results?.map((prof: Professor) => (
                <div
                  key={prof.id}
                  className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col h-full"
                >
                  <p className="font-semibold">{prof.nome}</p>
                  <p className="text-gray-600 text-sm">{prof.email}</p>
                  <p className="text-gray-600 text-sm">Formação: {prof.formacao}</p>
                  <button
                    onClick={() => navigate(`/professores/${prof.id}`)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Detalhes
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => setProfPage(profPage - 1)}
                disabled={profPage === 1}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setProfPage(profPage + 1)}
                disabled={!professores?.next}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
          </>
        )}
      </section>

      {/* Matérias */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Matérias</h1>
          <button
            onClick={() => navigate("/materias/new")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Nova Matéria
          </button>
        </div>
        {loadingMats ? (
          <p className="text-center mt-10">Carregando matérias...</p>
        ) : errorMats ? (
          <p className="text-center mt-10 text-red-500">Erro ao carregar as matérias.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {materias?.results?.length === 0 && (
                <p className="col-span-full text-center text-gray-500">Nenhuma matéria cadastrada.</p>
              )}
              {materias?.results?.map((mat: Materia) => (
                <div
                  key={mat.id}
                  className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col h-full"
                >
                  <p className="font-semibold">{mat.nome}</p>
                  <button
                    onClick={() => navigate(`/materias/${mat.id}`)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Detalhes
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => setMatPage(matPage - 1)}
                disabled={matPage === 1}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setMatPage(matPage + 1)}
                disabled={!materias?.next}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
          </>
        )}
      </section>

      {/* Turmas */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Turmas</h1>
          <button
            onClick={() => navigate("/turmas/new")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Nova Turma
          </button>
        </div>
        {loadingTurmas ? (
          <p className="text-center mt-10">Carregando turmas...</p>
        ) : errorTurmas ? (
          <p className="text-center mt-10 text-red-500">Erro ao carregar as turmas.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {turmas?.results?.length === 0 && (
                <p className="col-span-full text-center text-gray-500">Nenhuma turma cadastrada.</p>
              )}
              {turmas?.results?.map((turma: Turma) => (
                <div
                  key={turma.id}
                  className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col h-full"
                >
                  <p className="font-semibold">{turma.nome}</p>
                  <p className="text-gray-600 text-sm">{turma.descricao}</p>
                  <p className="text-gray-600 text-sm">Alunos: {turma.alunos?.length}</p>
                  <button
                    onClick={() => navigate(`/turmas/${turma.id}`)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Detalhes
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => setTurmaPage(turmaPage - 1)}
                disabled={turmaPage === 1}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setTurmaPage(turmaPage + 1)}
                disabled={!turmas?.next}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
          </>
        )}
      </section>

      {/* TurmaMaterias */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Turma-Matérias</h1>
          <button
            onClick={() => navigate("/turmas-materias/new")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Novo Vínculo
          </button>
        </div>
        {loadingTM ? (
          <p className="text-center mt-10">Carregando vínculos...</p>
        ) : errorTM ? (
          <p className="text-center mt-10 text-red-500">Erro ao carregar os vínculos.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {turmaMaterias?.results?.length === 0 && (
                <p className="col-span-full text-center text-gray-500">Nenhum vínculo cadastrado.</p>
              )}
              {turmaMaterias?.results?.map((tm: TurmaMateria) => (
                <div
                  key={tm.id}
                  className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col h-full"
                >
                  <p className="font-semibold">Turma ID: {tm.turma}</p>
                  <p className="text-gray-600 text-sm">Matéria ID: {tm.materia}</p>
                  <p className="text-gray-600 text-sm">Professor ID: {tm.professor}</p>
                  <button
                    onClick={() => navigate(`/turmas-materias/${tm.id}`)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Detalhes
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => setTurmaMateriaPage(turmaMateriaPage - 1)}
                disabled={turmaMateriaPage === 1}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setTurmaMateriaPage(turmaMateriaPage + 1)}
                disabled={!turmaMaterias?.next}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
          </>
        )}
      </section>

      {/* Avaliações */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Avaliações</h1>
          <button
            onClick={() => navigate("/avaliacoes/new")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Nova Avaliação
          </button>
        </div>
        {loadingAvals ? (
          <p className="text-center mt-10">Carregando avaliações...</p>
        ) : errorAvals ? (
          <p className="text-center mt-10 text-red-500">Erro ao carregar as avaliações.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {avaliacoes?.results?.length === 0 && (
                <p className="col-span-full text-center text-gray-500">Nenhuma avaliação cadastrada.</p>
              )}
              {avaliacoes?.results?.map((aval: Avaliacao) => (
                <div
                  key={aval.id}
                  className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col h-full"
                >
                  <p className="font-semibold">Nota: {aval.nota}</p>
                  <p className="text-gray-600 text-sm">Data: {aval.data_avaliacao}</p>
                  <p className="text-gray-600 text-sm">Aluno ID: {aval.aluno_id}</p>
                  <p className="text-gray-600 text-sm">Turma/Matéria ID: {aval.turma_materia}</p>
                  <button
                    onClick={() => navigate(`/avaliacoes/${aval.id}`)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Detalhes
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => setAvalPage(avalPage - 1)}
                disabled={avalPage === 1}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setAvalPage(avalPage + 1)}
                disabled={!avaliacoes?.next}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;