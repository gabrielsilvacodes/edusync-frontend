import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import type { Aluno } from "../types/types";

function DashboardPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["alunos", page],
    queryFn: () => api.get(`/api/v1/alunos/?page=${page}`).then(res => res.data),
  });

  if (isLoading) return <p className="text-center mt-10">Carregando alunos...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Erro ao carregar os alunos.</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Alunos</h1>
      <button
        onClick={() => navigate("/alunos/new")}
        className="mb-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Novo Aluno
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.results?.length === 0 && (
          <p className="col-span-full text-center text-gray-500">Nenhum aluno cadastrado.</p>
        )}
        {data?.results?.map((aluno: Aluno) => (
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

      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={!data?.next}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;