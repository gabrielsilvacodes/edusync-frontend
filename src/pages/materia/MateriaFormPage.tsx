import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import api from "../../services/api";
import type { MateriaFormData } from "../../types/types";

// Validação com Yup
const schema = yup.object({
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

  // Edição: carrega dados da matéria
  useEffect(() => {
    if (id) {
      api.get(`/api/v1/materias/${id}/`).then((res) => {
        setValue("nome", res.data.nome);
      });
    }
  }, [id, setValue]);

  // Envio do formulário
  const onSubmit = async (data: MateriaFormData) => {
    try {
      if (id) {
        await api.put(`/api/v1/materias/${id}/`, data);
      } else {
        await api.post("/api/v1/materias/", data);
      }
      navigate("/");
    } catch (error) {
      alert(`Erro ao salvar matéria: ${error}`);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">
                {id ? "Editar Matéria" : "Nova Matéria"}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">
                    Nome da Matéria
                  </label>
                  <input
                    id="nome"
                    type="text"
                    className={`form-control ${
                      errors.nome ? "is-invalid" : ""
                    }`}
                    placeholder="Digite uma matéria"
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

                <button type="submit" className="btn btn-primary w-100">
                  {id ? "Atualizar Matéria" : "Cadastrar Matéria"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MateriaFormPage;
