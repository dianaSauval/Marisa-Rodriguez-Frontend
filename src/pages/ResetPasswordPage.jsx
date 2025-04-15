// src/pages/ResetPasswordPage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../assets/styles/pages/LoginPage.css";
import useModalMensaje from "../hooks/useModalMensaje";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [error, setError] = useState("");
  const [tokenValido, setTokenValido] = useState(null); // null = cargando, true = ok, false = inválido
  const { Modal, openModal } = useModalMensaje();

  useEffect(() => {
    const validarToken = async () => {
      try {
        const res = await api.get(`/auth/verificar-token/${token}`);
        if (res.data.valido) {
          setTokenValido(true);
        } else {
          setTokenValido(false);
          setError("El token es inválido o ha expirado. Solicitá uno nuevo.");
        }
      } catch (err) {
        setTokenValido(false);
        setError("El token es inválido o ha expirado. Solicitá uno nuevo.");
      }
    };

    validarToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (nuevaPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const response = await api.post(`/auth/reset-password/${token}`, {
        newPassword: nuevaPassword,
      });

      openModal({
        titulo: "Contraseña actualizada",
        subtitulo: response.data.message || "Ya podés iniciar sesión con tu nueva clave ✨",
        redirectTo: "/login",
      });
    } catch (err) {
      console.error(err);
      const mensaje =
        err.response?.data?.error ||
        "El token es inválido o ha expirado. Solicitá uno nuevo.";
      setError(mensaje);
    }
  };

  return (
    <div className="login-container">
      {tokenValido === null ? (
        <LoadingSpinner />
      ) : tokenValido === false ? (
        <div className="login-form">
          <h2>Token inválido</h2>
          <p className="error-msg">{error}</p>
        </div>
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Restablecer contraseña</h2>

          <label>
            Nueva contraseña
            <input
              type="password"
              value={nuevaPassword}
              onChange={(e) => setNuevaPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="boton-login">
            Actualizar
          </button>
        </form>
      )}
      {Modal}
    </div>
  );
}
