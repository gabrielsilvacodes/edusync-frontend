import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import type { ProfessorFormData } from "../types/types";
import api from "../services/api";

// Schema de validação com Yup
const schema = yup.object().shape({
    nome: yup.string().required("Nome obrigatório"),
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    formacao: yup.string().required("Formação obrigatória"),
});

function ProfessorFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ProfessorFormData>({
        resolver: yupResolver(schema),
    });

    // Se houver ID, está em modo de edição, busca o professor para preencher o formulário
    useEffect(() => {
        if (id) {
            api.get(`/api/v1/professores/${id}/`).then((res) => {
                const professor = res.data;
                setValue("nome", professor.nome);
                setValue("email", professor.email);
                setValue("formacao", professor.formacao);
            });
        }
    }, [id, setValue]);

    const onSubmit = async (data: ProfessorFormData) => {
        try {
            if (id) {
                await api.put(`/api/v1/professores/${id}/`, data);
            } else {
                await api.post("/api/v1/professores/", data);
            }
            navigate("/");
        } catch (error) {
            alert(`Erro ao salvar professor: ${error}.`);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
            >
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    {id ? "Editar Professor" : "Novo Professor"}
                </h1>

                <input
                    {...register("nome")}
                    placeholder="Nome"
                    className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-red-500 text-sm mb-2">{errors.nome?.message}</p>

                <input
                    {...register("email")}
                    placeholder="E-mail"
                    className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-red-500 text-sm mb-2">{errors.email?.message}</p>

                <input
                    {...register("formacao")}
                    placeholder="Formação"
                    className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-red-500 text-sm mb-4">{errors.formacao?.message}</p>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
                >
                    {id ? "Atualizar Professor" : "Cadastrar Professor"}
                </button>
            </form>
        </div>
    );
}

export default ProfessorFormPage;
