import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import api from "../../services/api";
import type { AlunoFormData } from "../../types/types";

// 🎯 Validação com Yup
const schema = yup.object({
  nome: yup.string().required("Nome obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  matricula: yup.string().required("Matrícula obrigatória"),
  data_nascimento: yup
    .string()
    .required("Data de nascimento obrigatória")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Formato válido: YYYY-MM-DD"),
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

  // 🔄 Carrega os dados se estiver em modo de edição
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
      alert(`Erro ao salvar aluno: ${error}`);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">
                {id ? "Editar Aluno" : "Novo Aluno"}
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
                    placeholder="Digite um e-mail"
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

                <div className="mb-3">
                  <label htmlFor="matricula" className="form-label">
                    Matrícula
                  </label>
                  <input
                    id="matricula"
                    type="text"
                    className={`form-control ${
                      errors.matricula ? "is-invalid" : ""
                    }`}
                    placeholder="Digite uma matrícula"
                    {...register("matricula")}
                    aria-invalid={!!errors.matricula}
                    aria-describedby="matricula-error"
                  />
                  {errors.matricula && (
                    <div id="matricula-error" className="invalid-feedback">
                      {errors.matricula.message}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="data_nascimento" className="form-label">
                    Data de Nascimento 
                  </label>
                  <input
                    id="data_nascimento"
                    type="text"
                    className={`form-control ${
                      errors.data_nascimento ? "is-invalid" : ""
                    }`}
                    placeholder="Digite uma data (YYYY-MM-DD)"
                    {...register("data_nascimento")}
                    aria-invalid={!!errors.data_nascimento}
                    aria-describedby="data-nascimento-error"
                  />
                  {errors.data_nascimento && (
                    <div
                      id="data-nascimento-error"
                      className="invalid-feedback"
                    >
                      {errors.data_nascimento.message}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  {id ? "Atualizar Aluno" : "Cadastrar Aluno"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlunoFormPage;
