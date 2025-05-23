import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function TurmaMateriaDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Consulta principal do vínculo
  const {
    data: tm,
    isLoading: isTmLoading,
    error: tmError,
  } = useQuery({
    queryKey: ["turmaMateria", id],
    queryFn: () =>
      api.get(`/api/v1/turmas&materias/${id}/`).then((res) => res.data),
    enabled: !!id,
  });

  // Consulta da turma relacionada
  const {
    data: turma,
    isLoading: isTurmaLoading,
    error: turmaError,
  } = useQuery({
    queryKey: ["turma", tm?.turma],
    queryFn: () => api.get(`/api/v1/turmas/${tm?.turma}/`).then((res) => res.data),
    enabled: !!tm?.turma,
  });

  // Consulta da matéria relacionada
  const {
    data: materia,
    isLoading: isMateriaLoading,
    error: materiaError,
  } = useQuery({
    queryKey: ["materia", tm?.materia],
    queryFn: () => api.get(`/api/v1/materias/${tm?.materia}/`).then((res) => res.data),
    enabled: !!tm?.materia,
  });

  // Consulta do professor relacionado
  const {
    data: professor,
    isLoading: isProfessorLoading,
    error: professorError,
  } = useQuery({
    queryKey: ["professor", tm?.professor],
    queryFn: () => api.get(`/api/v1/professores/${tm?.professor}/`).then((res) => res.data),
    enabled: !!tm?.professor,
  });

  // Estados combinados
  const isLoading = isTmLoading || isTurmaLoading || isMateriaLoading || isProfessorLoading;
  const error = tmError || turmaError || materiaError || professorError;

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir este vínculo?")) {
      try {
        await api.delete(`/api/v1/turmas&materias/${id}/`);
        navigate("/");
      } catch (error) {
        alert(`Erro ao excluir vínculo: ${error}.`);
      }
    }
  };

  if (isLoading)
    return <p className="text-center mt-5">Carregando vínculo...</p>;

  if (error)
    return (
      <p className="text-center mt-5 text-danger">
        Erro ao carregar o vínculo.
      </p>
    );

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 p-3">
      <div className="card shadow w-100" style={{ maxWidth: 800 }}>
        <div className="card-body text-center">
          <h1 className="card-title h3 mb-4">Detalhes do Vínculo Turma-Matéria</h1>
          
          <div className="mb-4">
            <p className="mb-2">
              <strong>Turma:</strong> {turma?.nome}
            </p>
            <p>
              <small>Turma ID:</small> {turma?.id}
            </p>
            <p className="mb-2">
              <strong>Matéria:</strong> {materia?.nome}
            </p>
            <p>
              <small>Matéria ID:</small> {materia?.id}
            </p>
            <p className="mb-2">
              <strong>Professor:</strong> {professor?.nome}
            </p>
            <p>
              <small>Professor ID:</small> {professor?.id}
            </p>
            <p className="mb-2 text-muted">
              <small>ID do Vínculo: {tm?.id}</small>
            </p>
          </div>

          <div className="d-flex flex-column flex-md-row gap-2 justify-content-center mt-4">
            <button
              onClick={() => navigate(`/turmas&materias/${tm.id}/edit/`)}
              className="btn btn-primary w-100 w-md-auto"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-danger w-100 w-md-auto"
            >
              Excluir
            </button>
            <button
              onClick={() => navigate("/")}
              className="btn btn-secondary w-100 w-md-auto"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TurmaMateriaDetailPage;