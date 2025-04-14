import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { obtenerClasePorId } from "../services/clasesVivoService";
import "../assets/styles/pages/ClaseVivoDetallePage.css";
import { useCart } from "../context/CartContext";

export default function ClaseVivoDetallePage() {
  const { id } = useParams();
  const { agregarAlCarrito } = useCart();
  const [clase, setClase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClase = async () => {
      try {
        const data = await obtenerClasePorId(id);
        setClase(data);
      } catch (error) {
        console.error("Error al cargar la clase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClase();
  }, [id]);

  if (loading) return <p>Cargando clase...</p>;
  if (!clase) return <p>No se encontró la clase solicitada.</p>;

  // 🗓️ Procesamiento de fechas
  const fechaInfo = clase.fechas;

  const capitalizar = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  const clasesText = `${fechaInfo.cantidadClases} clase${
    fechaInfo.cantidadClases > 1 ? "s" : ""
  } online en vivo – por Google Meet`;

  const fechaInicio = new Date(fechaInfo.fechaInicio);
  const diaSemana = capitalizar(fechaInfo.diaSemana);
  const inicio = `${diaSemana} ${fechaInicio.getDate()} de ${fechaInicio.toLocaleDateString(
    "es-AR",
    { month: "long" }
  )}`;

  const horario = `${fechaInfo.horario} h (Argentina)`;

  return (
    <div className="clase-detalle-container">
      <section className="detalle-header">
        <h1>{clase.titulo}</h1>
      </section>

      <section className="detalle-info">
        <div>
          <span className="badge-vivo">🟣 En Vivo</span>
          <p className="descripcion">{clase.descripcion}</p>

          {/* 🗓️ Bloque de fecha formateada */}
          <p className="detalle-fecha">📅 {clasesText}</p>
          <p>🗓️ Inicio: {inicio}</p>
          <p>⏰ Horario: {horario}</p>

          <p>👥 Cupos disponibles: 30</p>

          {/* ✅ Contenido */}
          {clase.contenido?.length > 0 && (
            <div className="detalle-beneficios">
              <h3>✨ ¿Qué vas a aprender?</h3>
              <ul>
                {clase.contenido.map((tema, i) => (
                  <li key={i}>✔ {tema}</li>
                ))}
              </ul>
            </div>
          )}

          {/* ✅ Beneficios extra */}
          <div className="detalle-beneficios">
            <h3>✨ ¿Qué incluye esta clase?</h3>
            <ul>
              <li>✔️ Clase en vivo vía Google Meet</li>
              <li>✔️ Acceso a grupo exclusivo de WhatsApp</li>
              <li>✔️ Material complementario después del encuentro</li>
              <li>✔️ Espacio para consultas y comunidad</li>
              <li>✔️ Entrega de la grabación de la clase en vivo</li>
            </ul>
          </div>
        </div>

        {clase.imagen && (
          <div className="curso-imagen">
            <img src={clase.imagen} alt={`Imagen del curso ${clase.titulo}`} />
          </div>
        )}
      </section>

      <div className="buttonsClaseDetalle">
        {/* Precio y botones */}
        <div className="curso-acciones">
          <p className="precio">
            💸 Precio:{" "}
            {clase.precioAr
              ? `$${clase.precioAr.toLocaleString("es-AR")} ARS`
              : "Consultar"}{" "}
            /{" "}
            {clase.precioUsd
              ? `USD ${clase.precioUsd.toLocaleString("en-US")}`
              : "Consultar"}
          </p>

          <button
            className="boton-agregar-carrito"
            onClick={() => agregarAlCarrito(clase)}
          >
            Agregar al Carrito
          </button>

          <a
            href={`https://wa.me/5491124596372?text=${encodeURIComponent(
              `Hola Marisa, estoy interesad@ en la clase en vivo: "${clase.titulo}". ¿Podrías contarme más detalles?`
            )}`}
            className="boton-consultar-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
      <Link to="/clases-en-vivo" className="volver-link">
        ← Volver a clases en vivo
      </Link>
    </div>
  );
}
