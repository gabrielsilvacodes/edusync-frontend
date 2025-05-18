import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import type { TurmaMateriaFormData } from "../types/types";
import api from "../services/api";

// Schema de validação com Yup
const schema = yup.object().shape({
    turma: yup.number().required("Turma obrigatória"),
    materia: yup.number().required("Matéria obrigatória"),
    professor: yup.number().required("Professor obrigatório"),
});

function TurmaMateriaFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<TurmaMateriaFormData>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (id) {
            api.get(`/api/v1/turmas&materias/${id}/`).then((res) => {
                const tm = res.data;
                setValue("turma", tm.turma);
                setValue("materia", tm.materia);
                setValue("professor", tm.professor);
            });
        }
    }, [id, setValue]);

    const onSubmit = async (data: TurmaMateriaFormData) => {
        try {
            if (id) {
                await api.put(`/api/v1/turmas&materias/${id}/`, data);
            } else {
                await api.post("/api/v1/turmas&materias/", data);
            }
            navigate("/");
        } catch (error) {
            alert(`Erro ao salvar Turma-Matéria: ${error}.`);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
            >
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    {id ? "Editar Turma-Matéria" : "Nova Turma-Matéria"}
                </h1>

                <input
                    {...register("turma")}
                    type="number"
                    placeholder="ID da Turma"
                    className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-red-500 text-sm mb-2">{errors.turma?.message}</p>

                <input
                    {...register("materia")}
                    type="number"
                    placeholder="ID da Matéria"
                    className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-red-500 text-sm mb-2">{errors.materia?.message}</p>

                <input
                    {...register("professor")}
                    type="number"
                    placeholder="ID do Professor"
                    className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-red-500 text-sm mb-4">{errors.professor?.message}</p>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
                >
                    {id ? "Atualizar Turma-Matéria" : "Cadastrar Turma-Matéria"}
                </button>
            </form>
        </div>
    );
}

export default TurmaMateriaFormPage;