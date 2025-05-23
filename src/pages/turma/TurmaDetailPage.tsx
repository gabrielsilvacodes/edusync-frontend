import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function TurmaDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: turma,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["turma", id],
    queryFn: () => api.get(`/api/v1/turmas/${id}/`).then((res) => res.data),
    enabled: !!id,
  });

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir esta turma?")) {
      try {
        await api.delete(`/api/v1/turmas/${id}/`);
        navigate("/");
      } catch (error) {
        alert(`Erro ao excluir turma: ${error}.`);
      }
    }
  };

  if (isLoading) return <p className="text-center mt-5">Carregando turma...</p>;

  if (error)
    return (
      <p className="text-center mt-5 text-danger">Erro ao carregar a turma.</p>
    );

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 p-3">
      <div className="card shadow w-100" style={{ maxWidth: 800 }}>
        <div className="card-body text-center">
          <h1 className="card-title h3 mb-4">Detalhes da Turma</h1>
          <h2 className="h4 mb-3">{turma.nome}</h2>
          <p className="mb-2">
            <strong>Descrição:</strong> {turma.descricao}
          </p>
          <p className="mb-4">
            <strong>Alunos:</strong>{" "}
            {turma.alunos && turma.alunos.length > 0
              ? turma.alunos.map((aluno) => aluno.nome).join(", ")
              : "Nenhum aluno cadastrado"}
          </p>
          <div className="d-flex flex-column flex-md-row gap-2 justify-content-center mt-4">
            <button
              onClick={() => navigate(`/turmas/${turma.id}/edit/`)}
              className="btn btn-primary w-100 w-md-auto"
            >
              Editar Turma
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-danger w-100 w-md-auto"
            >
              Excluir Turma
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

export default TurmaDetailPage;
