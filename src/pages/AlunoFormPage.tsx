import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import type { AlunoFormData } from "../types/types";
import api from "../services/api";

// Schema de validação com Yup
const schema = yup.object().shape({
    nome: yup.string().required("Nome obrigatório"),
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    matricula: yup
        .string()
        .typeError("Matrícula deve ser um número")
        .required("Matrícula obrigatória"),
    data_nascimento: yup
        .string()
        .required("Data de nascimento obrigatória")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),
});

function AlunoFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<AlunoFormData>({
        resolver: yupResolver(schema),
    });

    // Se houver ID, está em modo de edição, busca o produto para preencher o formulário
    useEffect(() => {
        if (id) {
            api.get(`/api/v1/alunos/${id}/`).then((res) => {
                const aluno = res.data;
                setValue("nome", aluno.nome);
                setValue("email", aluno.email);
                setValue("matricula", aluno.matricula);
                setValue("data_nascimento", aluno.data_nascimento);
            });
        }
    }, [id, setValue]);

    const onSubmit = async (data: AlunoFormData) => {
        try {
            if (id) {
                await api.put(`/api/v1/alunos/${id}/`, data);
            } else {
                await api.post("/api/v1/alunos/", data);
            }
            navigate("/");
        } catch (error) {
            alert(`Erro ao salvar produto: ${error}.`);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
            >
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    {id ? "Editar Aluno" : "Novo Aluno"}
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
                    {...register("matricula")}
                    type="text"
                    placeholder="Matrícula"
                    className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-red-500 text-sm mb-2">{errors.matricula?.message}</p>
                <input
                    {...register("data_nascimento")}
                    placeholder="Data de Nascimento (YYYY-MM-DD)"
                    className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-red-500 text-sm mb-4">{errors.data_nascimento?.message}</p>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
                >
                    {id ? "Atualizar Aluno" : "Cadastrar Aluno"}
                </button>
            </form>
        </div>
    );
}

export default AlunoFormPage;
