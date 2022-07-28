import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/DashboardPage';
import NotFoundPage from "./pages/NotFoundPage";
import RankingPage from './pages/RankingPage';
import UsersPage from './pages/UsersPage';
import TriviaPage from './pages/TriviaPage';
import IntegrationPage from './pages/IntegrationPage';
import LogInPage from './pages/LogInPage';
import RegisterPage from './pages/RegisterPage';

export default function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/ranking" element={<RankingPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/trivia" element={<TriviaPage />} />
      <Route path="/integration" element={<IntegrationPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
