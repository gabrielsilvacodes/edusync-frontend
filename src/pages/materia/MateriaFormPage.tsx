import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import type { MateriaFormData } from "../../types/types";
import api from "../../services/api";

// Schema de validação com Yup
const schema = yup.object().shape({
  nome: yup.string().required("Nome obrigatório"),
});

function MateriaFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MateriaFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      api.get(`/api/v1/materias/${id}/`).then((res) => {
        const materia = res.data;
        setValue("nome", materia.nome);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: MateriaFormData) => {
    try {
      if (id) {
        await api.put(`/api/v1/materias/${id}/`, data);
      } else {
        await api.post("/api/v1/materias/", data);
      }
      navigate("/");
    } catch (error) {
      alert(`Erro ao salvar matéria: ${error}.`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {id ? "Editar Matéria" : "Nova Matéria"}
        </h1>

        <input
          {...register("nome")}
          placeholder="Nome"
          className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm mb-4">{errors.nome?.message}</p>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
        >
          {id ? "Atualizar Matéria" : "Cadastrar Matéria"}
        </button>
      </form>
    </div>
  );
}

export default MateriaFormPage;
