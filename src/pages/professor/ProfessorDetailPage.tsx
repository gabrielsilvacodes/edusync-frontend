import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function ProfessorDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: professor,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["professor", id],
    queryFn: () =>
      api.get(`/api/v1/professores/${id}/`).then((res) => res.data),
    enabled: !!id,
  });

  const handleDelete = async () => {
    if (confirm("Tem certeza que deseja excluir este professor?")) {
      try {
        await api.delete(`/api/v1/professores/${id}/`);
        navigate("/");
      } catch (error) {
        alert(`Erro ao excluir professor: ${error}.`);
      }
    }
  };

  if (isLoading)
    return <p className="text-center mt-10">Carregando professor...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Erro ao carregar o professor.
      </p>
    );

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded p-8 space-y-6 text-center">
        <h1 className="text-3xl font-bold">Detalhes do Professor</h1>
        <h2 className="text-2xl font-semibold">{professor.nome}</h2>
        <p className="text-gray-700">E-mail: {professor.email}</p>
        <p className="text-gray-700">Formação: {professor.formacao}</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
          <button
            onClick={() => navigate(`/professores/${professor.id}/edit/`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full md:w-auto"
          >
            Editar Professor
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full md:w-auto"
          >
            Excluir Professor
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded w-full md:w-auto"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfessorDetailPage;
