import type { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import { PrivateRoute } from "./PrivateRoute";

interface AppRoute {
  path: string;
  element: ReactElement;
}

const routes: AppRoute[] = [
  { path: "/login", element: <LoginPage /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardPage />
      </PrivateRoute>
    ),
  },
];

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
