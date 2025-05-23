import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";
import type {
  Aluno,
  Avaliacao,
  Materia,
  Professor,
  Turma,
  TurmaMateria,
} from "../types/types";

function DashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Paginação separada para cada grid
  const [alunoPage, setAlunoPage] = useState(1);
  const [profPage, setProfPage] = useState(1);
  const [matPage, setMatPage] = useState(1);
  const [turmaPage, setTurmaPage] = useState(1);
  const [avalPage, setAvalPage] = useState(1);
  const [turmaMateriaPage, setTurmaMateriaPage] = useState(1);

  // Queries separadas (limitando 6 por página)
  const {
    data: alunos,
    isLoading: loadingAlunos,
    error: errorAlunos,
  } = useQuery({
    queryKey: ["alunos", alunoPage],
    queryFn: () =>
      api
        .get(`/api/v1/alunos/?page=${alunoPage}&page_size=6`)
        .then((res) => res.data),
  });

  const {
    data: professores,
    isLoading: loadingProfs,
    error: errorProfs,
  } = useQuery({
    queryKey: ["professores", profPage],
    queryFn: () =>
      api
        .get(`/api/v1/professores/?page=${profPage}&page_size=6`)
        .then((res) => res.data),
  });

  const {
    data: materias,
    isLoading: loadingMats,
    error: errorMats,
  } = useQuery({
    queryKey: ["materias", matPage],
    queryFn: () =>
      api
        .get(`/api/v1/materias/?page=${matPage}&page_size=6`)
        .then((res) => res.data),
  });

  const {
    data: turmas,
    isLoading: loadingTurmas,
    error: errorTurmas,
  } = useQuery({
    queryKey: ["turmas", turmaPage],
    queryFn: () =>
      api
        .get(`/api/v1/turmas/?page=${turmaPage}&page_size=6`)
        .then((res) => res.data),
  });

  const {
    data: avaliacoes,
    isLoading: loadingAvals,
    error: errorAvals,
  } = useQuery({
    queryKey: ["avaliacoes", avalPage],
    queryFn: () =>
      api
        .get(`/api/v1/avaliacoes/?page=${avalPage}&page_size=6`)
        .then((res) => res.data),
  });

  const {
    data: turmaMaterias,
    isLoading: loadingTM,
    error: errorTM,
  } = useQuery({
    queryKey: ["turmaMaterias", turmaMateriaPage],
    queryFn: () =>
      api
        .get(`/api/v1/turmas&materias/?page=${turmaMateriaPage}&page_size=6`)
        .then((res) => res.data),
  });

  // Funções auxiliares para resolver nomes a partir de IDs
  const getTurmaNome = (id: number) =>
    turmas?.results?.find((t: Turma) => t.id === id)?.nome || `ID: ${id}`;
  const getMateriaNome = (id: number) =>
    materias?.results?.find((m: Materia) => m.id === id)?.nome || `ID: ${id}`;
  const getProfessorNome = (id: number) =>
    professores?.results?.find((p: Professor) => p.id === id)?.nome ||
    `ID: ${id}`;

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary navbar-dark shadow-sm mb-4">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <span className="navbar-brand mb-0 h1">
            Edusync - Painel de Controle
          </span>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="btn btn-outline-light"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container pt-4">
        {/* Alunos */}
        <section className="mb-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h1 className="h3 fw-bold">Alunos</h1>
                <button
                  onClick={() => navigate("/alunos/new")}
                  className="btn btn-success"
                >
                  Adicionar
                </button>
              </div>
              {/* Estados de loading/error/dados */}
              {loadingAlunos ? (
                <p className="text-center mt-4">Carregando alunos...</p>
              ) : errorAlunos ? (
                <p className="text-center mt-4 text-danger">
                  Erro ao carregar os alunos.
                </p>
              ) : (
                <>
                  {/* Tratamento para lista vazia */}
                  <div className="row g-3">
                    {alunos?.results?.length === 0 && (
                      <p className="col-12 text-center text-muted">
                        Nenhum aluno cadastrado.
                      </p>
                    )}
                    {alunos?.results?.map((aluno: Aluno) => (
                      <div key={aluno.id} className="col-12 col-sm-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                          <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{aluno.nome}</h5>
                            <p className="card-text mb-1">
                              <small>ID: {aluno.id}</small>
                            </p>
                            <p className="card-text mb-1">
                              <small>Email: {aluno.email}</small>
                            </p>
                            <p className="card-text mb-1">
                              <small>Matrícula: {aluno.matricula}</small>
                            </p>
                            <p className="card-text mb-2">
                              <small>Nascimento: {aluno.data_nascimento}</small>
                            </p>
                            <button
                              onClick={() => navigate(`/alunos/${aluno.id}`)}
                              className="btn btn-primary mt-auto"
                            >
                              Detalhes
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Controles de paginação - manter sincronizados com estado da API */}
                  <div className="d-flex justify-content-center mt-3 gap-2">
                    <button
                      onClick={() => setAlunoPage(alunoPage - 1)}
                      disabled={alunoPage === 1}
                      className="btn btn-secondary me-2"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={() => setAlunoPage(alunoPage + 1)}
                      disabled={!alunos?.next}
                      className={`btn btn-secondary ${
                        !materias?.next ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Próximo
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Professores */}
        <section className="mb-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h1 className="h3 fw-bold">Professores</h1>
                <button
                  onClick={() => navigate("/professores/new")}
                  className="btn btn-success"
                >
                  Adicionar
                </button>
              </div>
              {loadingProfs ? (
                <p className="text-center mt-4">Carregando professores...</p>
              ) : errorProfs ? (
                <p className="text-center mt-4 text-danger">
                  Erro ao carregar os professores.
                </p>
              ) : (
                <>
                  <div className="row g-3">
                    {professores?.results?.length === 0 && (
                      <p className="col-12 text-center text-muted">
                        Nenhum professor cadastrado.
                      </p>
                    )}
                    {professores?.results?.map((professor: Professor) => (
                      <div
                        key={professor.id}
                        className="col-12 col-sm-6 col-lg-4"
                      >
                        <div className="card h-100 shadow-sm">
                          <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{professor.nome}</h5>
                            <p className="card-text mb-1">
                              <small>ID: {professor.id}</small>
                            </p>
                            <p className="card-text mb-1">
                              <small>{professor.email}</small>
                            </p>
                            <p className="card-text mb-2">
                              <small>Formação: {professor.formacao}</small>
                            </p>
                            <button
                              onClick={() =>
                                navigate(`/professores/${professor.id}`)
                              }
                              className="btn btn-primary mt-auto"
                            >
                              Detalhes
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex justify-content-center mt-3 gap-2">
                    <button
                      onClick={() => setProfPage(profPage - 1)}
                      disabled={profPage === 1}
                      className="btn btn-secondary me-2"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={() => setProfPage(profPage + 1)}
                      disabled={!professores?.next}
                      className={`btn btn-secondary ${
                        !materias?.next ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Próximo
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Matérias */}
        <section className="mb-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h1 className="h3 fw-bold">Matérias</h1>
                <button
                  onClick={() => navigate("/materias/new")}
                  className="btn btn-success"
                >
                  Adicionar
                </button>
              </div>
              {loadingMats ? (
                <p className="text-center mt-4">Carregando matérias...</p>
              ) : errorMats ? (
                <p className="text-center mt-4 text-danger">
                  Erro ao carregar as matérias.
                </p>
              ) : (
                <>
                  <div className="row g-3">
                    {materias?.results?.length === 0 && (
                      <p className="col-12 text-center text-muted">
                        Nenhuma matéria cadastrada.
                      </p>
                    )}
                    {materias?.results?.map((materia: Materia) => (
                      <div
                        key={materia.id}
                        className="col-12 col-sm-6 col-lg-4"
                      >
                        <div className="card h-100 shadow-sm">
                          <div className="card-body d-flex flex-column">
                            <p className="card-text mb-1">
                              <small>ID: {materia.id}</small>
                            </p>
                            <h5 className="card-title">{materia.nome}</h5>
                            <button
                              onClick={() =>
                                navigate(`/materias/${materia.id}`)
                              }
                              className="btn btn-primary mt-auto"
                            >
                              Detalhes
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex justify-content-center mt-3 gap-2">
                    <button
                      onClick={() => setMatPage(matPage - 1)}
                      disabled={matPage === 1}
                      className="btn btn-secondary me-2"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={() => setMatPage(matPage + 1)}
                      disabled={!materias?.next}
                      className={`btn btn-secondary ${
                        !materias?.next ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Próximo
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Turmas */}
        <section className="mb-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h1 className="h3 fw-bold">Turmas</h1>
                <button
                  onClick={() => navigate("/turmas/new")}
                  className="btn btn-success"
                >
                  Adicionar
                </button>
              </div>
              {loadingTurmas ? (
                <p className="text-center mt-4">Carregando turmas...</p>
              ) : errorTurmas ? (
                <p className="text-center mt-4 text-danger">
                  Erro ao carregar as turmas.
                </p>
              ) : (
                <>
                  <div className="row g-3">
                    {turmas?.results?.length === 0 && (
                      <p className="col-12 text-center text-muted">
                        Nenhuma turma cadastrada.
                      </p>
                    )}
                    {turmas?.results?.map((turma: Turma) => (
                      <div key={turma.id} className="col-12 col-sm-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                          <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{turma.nome}</h5>
                            <p className="card-text mb-1">
                              <small>ID: {turma.id}</small>
                            </p>
                            <p className="card-text mb-2">
                              <small>{turma.descricao}</small>
                            </p>
                            <p className="card-text mb-2">
                              <small>Alunos: {turma.alunos?.length}</small>
                            </p>
                            <button
                              onClick={() => navigate(`/turmas/${turma.id}`)}
                              className="btn btn-primary mt-auto"
                            >
                              Detalhes
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex justify-content-center mt-3 gap-2">
                    <button
                      onClick={() => setTurmaPage(turmaPage - 1)}
                      disabled={turmaPage === 1}
                      className="btn btn-secondary me-2"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={() => setTurmaPage(turmaPage + 1)}
                      disabled={!turmas?.next}
                      className={`btn btn-secondary ${
                        !materias?.next ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Próximo
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* TurmaMaterias */}
        <section className="mb-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h1 className="h3 fw-bold">Turma-Matérias</h1>
                <button
                  onClick={() => navigate("/turmas-materias/new")}
                  className="btn btn-success"
                >
                  Adicionar
                </button>
              </div>
              {loadingTM ? (
                <p className="text-center mt-4">Carregando vínculos...</p>
              ) : errorTM ? (
                <p className="text-center mt-4 text-danger">
                  Erro ao carregar os vínculos.
                </p>
              ) : (
                <>
                  <div className="row g-3">
                    {turmaMaterias?.results?.length === 0 && (
                      <p className="col-12 text-center text-muted">
                        Nenhum vínculo cadastrado.
                      </p>
                    )}
                    {turmaMaterias?.results?.map((tm: TurmaMateria) => (
                      <div key={tm.id} className="col-12 col-sm-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                          <div className="card-body d-flex flex-column">
                            <h5 className="card-title">ID: {tm.id}</h5>
                            <p className="card-text mb-1">
                              <small>
                                Nome da Turma: {getTurmaNome(tm.turma)}
                              </small>
                            </p>
                            <p className="card-text mb-2">
                              <small>Turma ID: {tm.turma}</small>
                            </p>
                            <p className="card-text mb-1">
                              <small>
                                Nome da matéria: {getMateriaNome(tm.materia)}
                              </small>
                            </p>
                            <p className="card-text mb-2">
                              <small>Matéria ID: {tm.turma}</small>
                            </p>
                            <p className="card-text mb-1">
                              <small>
                                Nome do professor:{" "}
                                {getProfessorNome(tm.professor)}
                              </small>
                            </p>
                            <p className="card-text mb-2">
                              <small>Professor ID: {tm.turma}</small>
                            </p>
                            <button
                              onClick={() =>
                                navigate(`/turmas-materias/${tm.id}`)
                              }
                              className="btn btn-primary mt-auto"
                            >
                              Detalhes
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex justify-content-center mt-3 gap-2">
                    <button
                      onClick={() => setTurmaMateriaPage(turmaMateriaPage - 1)}
                      disabled={turmaMateriaPage === 1}
                      className="btn btn-secondary me-2"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={() => setTurmaMateriaPage(turmaMateriaPage + 1)}
                      disabled={!turmaMaterias?.next}
                      className={`btn btn-secondary ${
                        !materias?.next ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Próximo
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Avaliações */}
        <section className="mb-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h1 className="h3 fw-bold">Avaliações</h1>
                <button
                  onClick={() => navigate("/avaliacoes/new")}
                  className="btn btn-success"
                >
                  Adicionar
                </button>
              </div>
              {loadingAvals ? (
                <p className="text-center mt-4">Carregando avaliações...</p>
              ) : errorAvals ? (
                <p className="text-center mt-4 text-danger">
                  Erro ao carregar as avaliações.
                </p>
              ) : (
                <>
                  <div className="row g-3">
                    {avaliacoes?.results?.length === 0 && (
                      <p className="col-12 text-center text-muted">
                        Nenhuma avaliação cadastrada.
                      </p>
                    )}
                    {avaliacoes?.results?.map((avaliacao: Avaliacao) => (
                      <div
                        key={avaliacao.id}
                        className="col-12 col-sm-6 col-lg-4"
                      >
                        <div className="card h-100 shadow-sm">
                          <div className="card-body d-flex flex-column">
                            <h5 className="card-title">
                              Nota: {avaliacao.nota}
                            </h5>
                            <p className="card-text mb-1">
                              <small>ID: {avaliacao.id}</small>
                            </p>
                            <p className="card-text mb-2">
                              <small>Data: {avaliacao.data_avaliacao}</small>
                            </p>
                            <p className="card-text mb-2">
                              <small>Aluno: {avaliacao.aluno.nome}</small>
                            </p>
                            <p className="card-text mb-1">
                              <small>Aluno ID: {avaliacao.aluno.id}</small>
                            </p>
                            <p className="card-text mb-2">
                              <small>
                                Turma/Matéria ID: {avaliacao.turma_materia}
                              </small>
                            </p>
                            <button
                              onClick={() =>
                                navigate(`/avaliacoes/${avaliacao.id}`)
                              }
                              className="btn btn-primary mt-auto"
                            >
                              Detalhes
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex justify-content-center mt-3 gap-2">
                    <button
                      onClick={() => setAvalPage(avalPage - 1)}
                      disabled={avalPage === 1}
                      className="btn btn-secondary me-2"
                    >
                      Anterior
                    </button>
                    <button
                      onClick={() => setAvalPage(avalPage + 1)}
                      disabled={!avaliacoes?.next}
                      className={`btn btn-secondary ${
                        !materias?.next ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Próximo
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;
