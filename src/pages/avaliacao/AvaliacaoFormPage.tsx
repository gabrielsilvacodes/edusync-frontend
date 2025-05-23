import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import api from "../../services/api";
import type { AvaliacaoFormData } from "../../types/types";

// Schema de validação com Yup
const schema = yup.object({
  nota: yup
    .number()
    .required("Nota obrigatória")
    .min(0, "A nota mínima é 0")
    .max(10, "A nota máxima é 10"),
  data_avaliacao: yup
    .string()
    .required("Data obrigatória")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD"),
  aluno_id: yup
    .number()
    .typeError("ID obrigatório")
    .required("ID do aluno obrigatório"),
  turma_materia: yup
    .number()
    .typeError("ID obrigatório")
    .required("ID da turma/matéria obrigatório"),
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
      alert(`Erro ao salvar avaliação: ${error}`);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">
                {id ? "Editar Avaliação" : "Nova Avaliação"}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Campo: Nota */}
                <div className="mb-3">
                  <label htmlFor="nota" className="form-label">
                    Nota 
                  </label>
                  <input
                    id="nota"
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    className={`form-control ${
                      errors.nota ? "is-invalid" : ""
                    }`}
                    placeholder="Ex: 8.5 (0 a 10)"
                    {...register("nota")}
                    aria-describedby="notaErro"
                  />
                  {errors.nota && (
                    <div id="notaErro" className="invalid-feedback">
                      {errors.nota.message}
                    </div>
                  )}
                </div>

                {/* Campo: Data da Avaliação */}
                <div className="mb-3">
                  <label htmlFor="data_avaliacao" className="form-label">
                    Data da Avaliação
                  </label>
                  <input
                    id="data_avaliacao"
                    type="date"
                    className={`form-control ${
                      errors.data_avaliacao ? "is-invalid" : ""
                    }`}
                    {...register("data_avaliacao")}
                  />
                  {errors.data_avaliacao && (
                    <div className="invalid-feedback">
                      {errors.data_avaliacao.message}
                    </div>
                  )}
                </div>

                {/* Campo: ID do Aluno */}
                <div className="mb-3">
                  <label htmlFor="aluno_id" className="form-label">
                    ID do Aluno
                  </label>
                  <input
                    id="aluno_id"
                    type="number"
                    className={`form-control ${
                      errors.aluno_id ? "is-invalid" : ""
                    }`}
                    placeholder="Ex: 1"
                    {...register("aluno_id")}
                  />
                  {errors.aluno_id && (
                    <div className="invalid-feedback">
                      {errors.aluno_id.message}
                    </div>
                  )}
                </div>

                {/* Campo: ID da Turma-Matéria */}
                <div className="mb-4">
                  <label htmlFor="turma_materia" className="form-label">
                    ID da Turma/Matéria
                  </label>
                  <input
                    id="turma_materia"
                    type="number"
                    className={`form-control ${
                      errors.turma_materia ? "is-invalid" : ""
                    }`}
                    placeholder="Ex: 5"
                    {...register("turma_materia")}
                  />
                  {errors.turma_materia && (
                    <div className="invalid-feedback">
                      {errors.turma_materia.message}
                    </div>
                  )}
                </div>

                {/* Botão de envio */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-semibold"
                >
                  {id ? "Atualizar Avaliação" : "Cadastrar Avaliação"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvaliacaoFormPage;
