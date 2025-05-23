import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "../context/AuthProvider";
import type { LoginFormInputs } from "../types/types";
import 'bootstrap/dist/css/bootstrap.min.css';

const schema = yup
  .object({
    username: yup.string().required("Usuário obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  })
  .required();

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.username, data.password);
      navigate("/");
    } catch (error) {
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="col-12 col-md-8 col-lg-5">
        <div className="card shadow-lg border-0">
          <div className="card-body p-5">
            <h2 className="text-center mb-4 fw-bold">Acessar Conta</h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Usuário
                </label>
                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  autoFocus
                  aria-describedby="usernameHelp"
                  placeholder="Digite seu usuário"
                />
                {errors.username && (
                  <div className="invalid-feedback">
                    {errors.username.message}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Digite sua senha"
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 fw-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
