// src/pages/ForgetPasswordPage.jsx
import { useState } from "react";
import "../assets/styles/pages/LoginPage.css";
import useModalMensaje from "../hooks/useModalMensaje";
import { forgotPassword } from "../services/authService"; // 👈 nuevo import

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { Modal, openModal } = useModalMensaje();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validación básica de email
    if (!email.includes("@") || email.length < 5) {
      setError("Ingresá un email válido.");
      return;
    }

    try {
      const res = await forgotPassword(email); // 👈 usamos la función del service
      openModal({
        titulo: "¡Revisá tu correo!",
        subtitulo:
          res.message || "Te enviamos un enlace para restablecer tu contraseña 💌",
      });
    } catch (err) {
      console.error(err);
      setError(err.error || "No se encontró una cuenta con ese email.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>¿Olvidaste tu contraseña?</h2>
        <p className="texto-explicacion">
          Ingresá tu correo electrónico para enviarte un enlace de recuperación.
        </p>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="boton-login">
          Enviar enlace
        </button>

        <p className="login-links">
          ¿Ya lo solucionaste?{" "}
          <a href="/login" className="link-sutil">Volver al login</a>
        </p>
      </form>
      {Modal}
    </div>
  );
}
