import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrar } from "../services/authService";
import "../assets/styles/pages/LoginPage.css"; // reutilizamos estilos
import useModalMensaje from "../hooks/useModalMensaje";

export default function RegistroPage() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { Modal, openModal } = useModalMensaje();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // limpiamos error viejo
    console.log("Enviando usuario:", form);
    try {
      await registrar(form);
      openModal({
        titulo: "¡Cuenta creada con éxito!",
        subtitulo: "Ya podés iniciar sesión con tus datos ✨",
        redirectTo: "/login",
      });
      
    } catch (err) {
      if (err.response?.data?.mensaje) {
        setError(err.response.data.mensaje);
      } else {
        setError("Hubo un error al registrarse. Verificá los datos.");
      }
    }
  };
  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Crear cuenta</h2>

        <label>
          Nombre
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Apellido
          <input
            type="text"
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="boton-login">Registrarse</button>

        <p className="login-links">
          ¿Ya tenés cuenta? <a href="/login" className="link-sutil">Iniciá sesión</a>
        </p>
      </form>
      {Modal}
    </div>
  );
}
