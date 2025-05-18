import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

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

    if (isLoading)
        return <p className="text-center mt-10">Carregando turma...</p>;

    if (error)
        return (
            <p className="text-center mt-10 text-red-500">
                Erro ao carregar a turma.
            </p>
        );

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="w-full max-w-3xl bg-white shadow-md rounded p-8 space-y-6 text-center">
                <h1 className="text-3xl font-bold">Detalhes da Turma</h1>
                <h2 className="text-2xl font-semibold">{turma.nome}</h2>
                <p className="text-gray-700">Descrição: {turma.descricao}</p>
                <p className="text-gray-700">
                    Alunos: {turma.alunos && turma.alunos.length > 0
                        ? turma.alunos.join(", ")
                        : "Nenhum aluno cadastrado"}
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
                    <button
                        onClick={() => navigate(`/turmas/${turma.id}/edit/`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full md:w-auto"
                    >
                        Editar Turma
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full md:w-auto"
                    >
                        Excluir Turma
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

export default TurmaDetailPage;