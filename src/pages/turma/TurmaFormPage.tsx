import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import api from "../../services/api";
import type { TurmaFormData } from "../../types/types";

// Schema de validação com Yup
const schema = yup.object().shape({
  nome: yup.string().required("Nome obrigatório"),
  descricao: yup.string().required("Descrição obrigatória"),
  alunos: yup
    .array()
    .of(yup.number())
    .required("Selecione pelo menos um aluno"),
});

function TurmaFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TurmaFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      api.get(`/api/v1/turmas/${id}/`).then((res) => {
        const turma = res.data;
        setValue("nome", turma.nome);
        setValue("descricao", turma.descricao);
        setValue("alunos", turma.alunos);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: TurmaFormData) => {
    try {
      if (id) {
        await api.put(`/api/v1/turmas/${id}/`, data);
      } else {
        await api.post("/api/v1/turmas/", data);
      }
      navigate("/");
    } catch (error) {
      alert(`Erro ao salvar turma: ${error}.`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {id ? "Editar Turma" : "Nova Turma"}
        </h1>

        <input
          {...register("nome")}
          placeholder="Nome"
          className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm mb-2">{errors.nome?.message}</p>

        <input
          {...register("descricao")}
          placeholder="Descrição"
          className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm mb-2">{errors.descricao?.message}</p>

        <input
          {...register("alunos")}
          placeholder="IDs dos alunos separados por vírgula"
          className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm mb-4">{errors.alunos?.message}</p>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
        >
          {id ? "Atualizar Turma" : "Cadastrar Turma"}
        </button>
      </form>
    </div>
  );
}

export default TurmaFormPage;
