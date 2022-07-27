import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/DashboardPage';
import NotFoundPage from "./pages/NotFoundPage";
import OrdenesPage from './pages/OrdenesPage';
import FuncionariosPage from "./pages/FuncionariosPage";
import ReportesPage from "./pages/ReportesPage";

export default function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ordenes" element={<OrdenesPage />} />
      <Route path="/clientes" element={<FuncionariosPage />} />
      <Route path="/reportes" element={<ReportesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
