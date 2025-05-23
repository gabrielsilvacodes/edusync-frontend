import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function MateriaDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: materia,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["materia", id],
    queryFn: () => api.get(`/api/v1/materias/${id}/`).then((res) => res.data),
    enabled: !!id,
  });

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir esta matéria?")) {
      try {
        await api.delete(`/api/v1/materias/${id}/`);
        navigate("/");
      } catch (error) {
        alert(`Erro ao excluir matéria: ${error}.`);
      }
    }
  };

  if (isLoading)
    return <p className="text-center mt-5">Carregando matéria...</p>;

  if (error)
    return (
      <p className="text-center mt-5 text-danger">
        Erro ao carregar a matéria.
      </p>
    );

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 p-3">
      <div className="card shadow w-100" style={{ maxWidth: 500 }}>
        <div className="card-body text-center">
          <h1 className="card-title h3 mb-3">Detalhes da Matéria</h1>
          <h2 className="h4 mb-4">{materia.nome}</h2>
          <div className="d-flex flex-column flex-md-row gap-2 justify-content-center mt-4">
            <button
              onClick={() => navigate(`/materias/${materia.id}/edit/`)}
              className="btn btn-primary w-100 w-md-auto"
            >
              Editar Matéria
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-danger w-100 w-md-auto"
            >
              Excluir Matéria
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

export default MateriaDetailPage;