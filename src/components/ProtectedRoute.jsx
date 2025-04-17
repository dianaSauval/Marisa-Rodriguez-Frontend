import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

export default function ProtectedRoute({ children, roles = [] }) {
  const { usuario, loading } = useAuth();

  // ⏳ Esperar a que se cargue el usuario
  if (loading) {
    return <LoadingSpinner texto="Verificando acceso..." />;
  }

  // ❌ Si no hay usuario → redirigir al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // ⛔ Si tiene usuario pero no cumple el rol
  if (roles.length > 0 && !roles.includes(usuario.rol)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Usuario permitido → renderizar contenido
  return children;
}
