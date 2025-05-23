import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// Adiciona o token de acesso no header Authorization em cada requisição
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//Trata erros 401 (Não autorizado) e tenta renovar o token de acesso
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/api/token/refresh/")
        ) {
            originalRequest._retry = true; // Marca para evitar loop

            try {
                // Tenta renovar o token usando o refresh token
                const refresh = localStorage.getItem("refresh_token");
                const { data } = await api.post("/api/token/refresh/", { refresh });
                
                // Atualiza tokens no armazenamento local
                localStorage.setItem("access_token", data.access);
                originalRequest.headers.Authorization = `Bearer ${data.access}`;
                
                // Repete a requisição original com novo token
                return api(originalRequest);

            // Redireciona para login se o refresh falhar
            } catch (refreshError) {
                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;