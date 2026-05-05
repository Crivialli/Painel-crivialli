// src/routes/routes.jsx
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { SectorPage } from "../pages/SectorPage";
import { Ramais } from "../pages/Ramais";
import { Login } from "../admin/Login";
import { Admin } from "../admin/admin/Admin";
import { PrivateRoute } from "./PrivateRoute";

export function AppRoutes() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/setor/:setor" element={<SectorPage />} />
      <Route path="/ramais" element={<Ramais />} />
      <Route path="/login" element={<Login />} />

      {/* Protegida */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}