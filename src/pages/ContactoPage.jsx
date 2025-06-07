import { Link } from "react-router-dom";
import "../assets/styles/pages/ContactoPage.css";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { enviarMensajeDeContacto } from "../services/contactoService";

import { useState } from "react";
import { Helmet } from "react-helmet";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, email, mensaje } = formData;

    if (!nombre || !email || !mensaje) {
      setError("Por favor completá todos los campos.");
      return;
    }

    try {
      await enviarMensajeDeContacto({ nombre, email, mensaje });
      setMensajeEnviado(true);
      setFormData({ nombre: "", email: "", mensaje: "" });
    } catch (err) {
      setError(err.message || "No se pudo enviar el mensaje.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Contacto | Marisa Rodríguez</title>
        <link
          rel="canonical"
          href="https://marisarodriguezterapiasholisticas.com/contacto"
        />
        <meta
          name="description"
          content="¿Querés hacer una consulta o tenés dudas sobre un curso o terapia? Escribime por WhatsApp o completá el formulario."
        />
      </Helmet>

      <div className="contacto-container">
        <section className="contacto-header">
          <h1>🌟 Contacto</h1>
          <p>
            Si tenés dudas, consultas o querés sumarte a una clase, completá el
            formulario o escribime por redes. Estoy para acompañarte ✨
          </p>
        </section>

        <section className="contacto-formulario">
          {mensajeEnviado ? (
            <div className="mensaje-exito">
              💌 ¡Gracias por tu mensaje! Te voy a responder muy pronto ✨
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                Nombre
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>

              <label>
                Mensaje
                <textarea
                  name="mensaje"
                  rows="5"
                  value={formData.mensaje}
                  onChange={handleChange}
                />
              </label>

              {error && <p className="error-form">{error}</p>}

              <button type="submit" className="boton-animado">
                Enviar mensaje
              </button>
            </form>
          )}
        </section>

        <section className="contacto-redes">
          <p>También podés escribirme por redes sociales:</p>

          <div className="redes-links">
            <a
              href="https://www.instagram.com/marisa.rodz/?igsh=MW0zZWpkaGY4NWhibA%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="red-link instagram"
            >
              <FaInstagram className="icono-red" />
              @marisa.rodz
            </a>

            <a
              href="https://wa.me/5491124596372"
              target="_blank"
              rel="noopener noreferrer"
              className="red-link whatsapp"
            >
              <FaWhatsapp className="icono-red" />
              WhatsApp directo
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
