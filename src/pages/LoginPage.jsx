// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/pages/LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginService(email, password);
      login(data.token);
      navigate("/");
    } catch (err) {
      setError("Credenciales incorrectas o usuario no encontrado.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="boton-login">
          Ingresar
        </button>
        

        <div className="login-links">
          <p>
            ¿Olvidaste tu contraseña?{" "}
            <a href="/forget-password" className="link-sutil">
              Restablecer
            </a>
          </p>
          <p>
            ¿Aún no tenés una cuenta?{" "}
            <a href="/registrarse" className="link-sutil">
              Registrate
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
