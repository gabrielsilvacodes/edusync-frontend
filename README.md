# 📚 EduSync - Sistema Escolar

EduSync é uma aplicação web desenvolvida com React e TypeScript, voltada para a sincronização e gerenciamento de informações educacionais. Esta é a interface front-end do sistema, projetada para interagir com uma API backend (não incluída neste repositório).

## 🧰 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [React Router DOM](https://reactrouter.com/)
- [React Query (TanStack)](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)

## 🚀 Funcionalidades

- Autenticação de usuários com contexto global (`AuthContext`)
- Formulários com validação utilizando React Hook Form + Yup
- Navegação entre páginas (Login, Dashboard, etc.)
- Consumo de API utilizando Axios
- Gerenciamento eficiente de estado assíncrono com React Query

## 📁 Estrutura de Pastas

```
src/
├── context/          # Contextos globais como AuthProvider
├── pages/            # Páginas principais da aplicação (Dashboard, Login)
├── App.tsx           # Componente raiz com rotas
├── main.tsx          # Ponto de entrada principal
├── index.css         # Estilos globais com Tailwind
```

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/edusync-frontend.git
   cd edusync-frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Rode o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Para build de produção:
   ```bash
   npm run build
   ```

## ✅ Scripts

- `npm run dev`: inicia o servidor de desenvolvimento
- `npm run build`: compila o projeto
- `npm run preview`: pré-visualiza a build
- `npm run lint`: analisa o código com ESLint

## 📄 Licença

Este projeto está licenciado sob os termos da [MIT License](LICENSE).
