import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function AlunoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: aluno,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["aluno", id],
    queryFn: () => api.get(`/api/v1/alunos/${id}/`).then((res) => res.data),
    enabled: !!id,
  });

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir este aluno?")) {
      try {
        await api.delete(`/api/v1/alunos/${id}/`);
        navigate("/");
      } catch (error) {
        alert(`Erro ao excluir aluno: ${error}.`);
      }
    }
  };

  if (isLoading)
    return <p className="text-center mt-5">Carregando aluno...</p>;

  if (error)
    return (
      <p className="text-center mt-5 text-danger">
        Erro ao carregar o aluno.
      </p>
    );

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 p-3">
      <div className="card shadow w-100" style={{ maxWidth: 500 }}>
        <div className="card-body text-center">
          <h1 className="card-title h3 mb-3">Detalhes do Aluno</h1>
          <h2 className="h4 mb-2">{aluno.nome}</h2>
          <p className="mb-1"><strong> ID: </strong> {aluno.id}</p>
          <p className="mb-1"><strong>E-mail:</strong> {aluno.email}</p>
          <p className="mb-1"><strong>Matrícula:</strong> {aluno.matricula}</p>
          <p className="mb-3"><strong>Data de nascimento:</strong> {aluno.data_nascimento}</p>
          <div className="d-flex flex-column flex-md-row gap-2 justify-content-center mt-4">
            <button
              onClick={() => navigate(`/alunos/${aluno.id}/edit/`)}
              className="btn btn-primary w-100 w-md-auto"
            >
              Editar Aluno
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-danger w-100 w-md-auto"
            >
              Excluir Aluno
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

export default AlunoDetailPage;