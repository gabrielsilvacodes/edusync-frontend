import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function AvaliacaoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: avaliacao,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["avaliacao", id],
    queryFn: () => api.get(`/api/v1/avaliacoes/${id}/`).then((res) => res.data),
    enabled: !!id,
  });

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir esta avaliação?")) {
      try {
        await api.delete(`/api/v1/avaliacoes/${id}/`);
        navigate("/");
      } catch (error) {
        alert(`Erro ao excluir avaliação: ${error}.`);
      }
    }
  };

  if (isLoading)
    return <p className="text-center mt-5">Carregando avaliação...</p>;

  if (error)
    return (
      <p className="text-center mt-5 text-danger">
        Erro ao carregar a avaliação.
      </p>
    );

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 p-3">
      <div className="card shadow w-100" style={{ maxWidth: 500 }}>
        <div className="card-body text-center">
          <h1 className="card-title h3 mb-3">Detalhes da Avaliação</h1>
          <h2 className="h4 mb-2">Nota: {avaliacao.nota}</h2>
          <p className="mb-1"><strong>Data:</strong> {avaliacao.data_avaliacao}</p>
          <p className="mb-1"><strong>Aluno ID:</strong> {avaliacao.aluno?.id ?? avaliacao.aluno}</p>
          <p className="mb-3"><strong>Turma/Matéria ID:</strong> {avaliacao.turma_materia}</p>
          <div className="d-flex flex-column flex-md-row gap-2 justify-content-center mt-4">
            <button
              onClick={() => navigate(`/avaliacoes/${avaliacao.id}/edit/`)}
              className="btn btn-primary w-100 w-md-auto"
            >
              Editar Avaliação
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-danger w-100 w-md-auto"
            >
              Excluir Avaliação
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

export default AvaliacaoDetailPage;