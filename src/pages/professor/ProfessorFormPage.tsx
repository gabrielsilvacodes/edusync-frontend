import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import api from "../../services/api";
import type { ProfessorFormData } from "../../types/types";

// Schema de validação
const schema = yup.object({
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

  // Modo de edição: carrega dados
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
      alert(`Erro ao salvar professor: ${error}`);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">
                {id ? "Editar Professor" : "Novo Professor"}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">
                    Nome
                  </label>
                  <input
                    id="nome"
                    type="text"
                    className={`form-control ${
                      errors.nome ? "is-invalid" : ""
                    }`}
                    placeholder="Digite um nome"
                    {...register("nome")}
                    aria-invalid={!!errors.nome}
                    aria-describedby="nome-error"
                  />
                  {errors.nome && (
                    <div id="nome-error" className="invalid-feedback">
                      {errors.nome.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Digite um email"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                  />
                  {errors.email && (
                    <div id="email-error" className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="formacao" className="form-label">
                    Formação
                  </label>
                  <input
                    id="formacao"
                    type="text"
                    className={`form-control ${
                      errors.formacao ? "is-invalid" : ""
                    }`}
                    placeholder="Digite uma formação"
                    {...register("formacao")}
                    aria-invalid={!!errors.formacao}
                    aria-describedby="formacao-error"
                  />
                  {errors.formacao && (
                    <div id="formacao-error" className="invalid-feedback">
                      {errors.formacao.message}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  {id ? "Atualizar Professor" : "Cadastrar Professor"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessorFormPage;
