import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import api from "../../services/api";
import type { AvaliacaoFormData } from "../../types/types";

// Schema de validação com Yup
const schema = yup.object().shape({
  nota: yup.number().required("Nota obrigatória").min(0).max(10),
  data_avaliacao: yup
    .string()
    .required("Data obrigatória")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),
  aluno_id: yup.number().required("ID do aluno obrigatório"),
  turma_materia: yup.number().required("ID da turma/matéria obrigatório"),
});

function AvaliacaoFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AvaliacaoFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      api.get(`/api/v1/avaliacoes/${id}/`).then((res) => {
        const avaliacao = res.data;
        setValue("nota", avaliacao.nota);
        setValue("data_avaliacao", avaliacao.data_avaliacao);
        setValue("aluno_id", avaliacao.aluno_id);
        setValue("turma_materia", avaliacao.turma_materia);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: AvaliacaoFormData) => {
    try {
      if (id) {
        await api.put(`/api/v1/avaliacoes/${id}/`, data);
      } else {
        await api.post("/api/v1/avaliacoes/", data);
      }
      navigate("/");
    } catch (error) {
      alert(`Erro ao salvar avaliação: ${error}.`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {id ? "Editar Avaliação" : "Nova Avaliação"}
        </h1>

        <input
          {...register("nota")}
          type="number"
          placeholder="Nota"
          className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm mb-2">{errors.nota?.message}</p>

        <input
          {...register("data_avaliacao")}
          placeholder="Data da Avaliação (YYYY-MM-DD)"
          className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm mb-2">
          {errors.data_avaliacao?.message}
        </p>

        <input
          {...register("aluno_id")}
          type="number"
          placeholder="ID do Aluno"
          className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm mb-2">{errors.aluno_id?.message}</p>

        <input
          {...register("turma_materia")}
          type="number"
          placeholder="ID da Turma/Matéria"
          className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm mb-4">
          {errors.turma_materia?.message}
        </p>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
        >
          {id ? "Atualizar Avaliação" : "Cadastrar Avaliação"}
        </button>
      </form>
    </div>
  );
}

export default AvaliacaoFormPage;
