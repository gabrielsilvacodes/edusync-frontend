import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import api from "../../services/api";
import type { TurmaFormData } from "../../types/types";

// Validação com Yup
const schema = yup.object({
  nome: yup.string().required("Nome obrigatório"),
  descricao: yup.string().required("Descrição obrigatória"),
  alunos: yup
    .array()
    .of(
      yup
        .number()
        .typeError("ID do aluno deve ser um número")
        .required("ID do aluno obrigatório")
    )
    .min(1, "Selecione pelo menos um aluno")
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

  // Pré-preenche o formulário se estiver editando
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
      alert(`Erro ao salvar turma: ${error}`);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">
                {id ? "Editar Turma" : "Nova Turma"}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Campo Nome */}
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">
                    Nome da Turma
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
                    aria-describedby="nome-erro"
                  />
                  {errors.nome && (
                    <div id="nome-erro" className="invalid-feedback">
                      {errors.nome.message}
                    </div>
                  )}
                </div>

                {/* Campo Descrição */}
                <div className="mb-3">
                  <label htmlFor="descricao" className="form-label">
                    Descrição
                  </label>
                  <textarea
                    id="descricao"
                    className={`form-control ${
                      errors.descricao ? "is-invalid" : ""
                    }`}
                    placeholder="Digite uma descrição"
                    {...register("descricao")}
                    aria-invalid={!!errors.descricao}
                    aria-describedby="descricao-erro"
                  />
                  {errors.descricao && (
                    <div id="descricao-erro" className="invalid-feedback">
                      {errors.descricao.message}
                    </div>
                  )}
                </div>

                {/* Campo Alunos */}
                <div className="mb-3">
                  <label htmlFor="alunos" className="form-label">
                    IDs dos Alunos 
                  </label>
                  <input
                    id="alunos"
                    type="text"
                    className={`form-control ${
                      errors.alunos ? "is-invalid" : ""
                    }`}
                    placeholder="Ex: 1,2,3 (separados por virgula)"
                    {...register("alunos")}
                    aria-invalid={!!errors.alunos}
                    aria-describedby="alunos-erro"
                  />
                  {errors.alunos && (
                    <div id="alunos-erro" className="invalid-feedback">
                      {errors.alunos.message}
                    </div>
                  )}
                </div>

                {/* Botão de envio */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-semibold"
                >
                  {id ? "Atualizar Turma" : "Cadastrar Turma"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TurmaFormPage;
