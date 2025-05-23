import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import api from "../../services/api";
import type { TurmaMateriaFormData } from "../../types/types";

// Esquema de validação com Yup
const schema = yup.object({
  turma: yup
    .number()
    .typeError("Turma obrigatória")
    .required("Turma obrigatória"),
  materia: yup
    .number()
    .typeError("Matéria obrigatória")
    .required("Matéria obrigatória"),
  professor: yup
    .number()
    .typeError("Professor obrigatório")
    .required("Professor obrigatório"),
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
      alert(`Erro ao salvar Turma-Matéria: ${error}`);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">
                {id ? "Editar Turma-Matéria" : "Nova Turma-Matéria"}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Campo: Turma */}
                <div className="mb-3">
                  <label htmlFor="turma" className="form-label">
                    ID da Turma
                  </label>
                  <input
                    id="turma"
                    type="number"
                    className={`form-control ${
                      errors.turma ? "is-invalid" : ""
                    }`}
                    placeholder="Ex: 1"
                    {...register("turma")}
                    aria-describedby="turma-erro"
                  />
                  {errors.turma && (
                    <div id="turma-erro" className="invalid-feedback">
                      {errors.turma.message}
                    </div>
                  )}
                </div>

                {/* Campo: Matéria */}
                <div className="mb-3">
                  <label htmlFor="materia" className="form-label">
                    ID da Matéria
                  </label>
                  <input
                    id="materia"
                    type="number"
                    className={`form-control ${
                      errors.materia ? "is-invalid" : ""
                    }`}
                    placeholder="Ex: 2"
                    {...register("materia")}
                    aria-describedby="materia-erro"
                  />
                  {errors.materia && (
                    <div id="materia-erro" className="invalid-feedback">
                      {errors.materia.message}
                    </div>
                  )}
                </div>

                {/* Campo: Professor */}
                <div className="mb-4">
                  <label htmlFor="professor" className="form-label">
                    ID do Professor
                  </label>
                  <input
                    id="professor"
                    type="number"
                    className={`form-control ${
                      errors.professor ? "is-invalid" : ""
                    }`}
                    placeholder="Ex: 3"
                    {...register("professor")}
                    aria-describedby="professor-erro"
                  />
                  {errors.professor && (
                    <div id="professor-erro" className="invalid-feedback">
                      {errors.professor.message}
                    </div>
                  )}
                </div>

                {/* Botão de envio */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-semibold"
                >
                  {id ? "Atualizar Turma-Matéria" : "Cadastrar Turma-Matéria"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TurmaMateriaFormPage;
