import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../assets/styles/pages/CursoDetallePage.css";
import { useCart } from "../context/CartContext";
import { obtenerCursoPorId } from "../services/CursoService";

export default function CursoDetallePage() {
  const { agregarAlCarrito } = useCart();
  const { id } = useParams();
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const data = await obtenerCursoPorId(id);
        setCurso(data);
      } catch (error) {
        console.error("Error al obtener el curso:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurso();
  }, [id]);

  if (loading) return <p>Cargando curso...</p>;
  if (!curso) return <p>No se encontró el curso solicitado.</p>;

  return (
    <div className="curso-detalle-container">
      <section className="detalle-header">
        <h1>{curso.titulo}</h1>
      </section>

      <section className="detalle-info">
        <div>
          <span className="badge-grabado">🎥 Grabado</span>
          <p className="descripcion">{curso.descripcion}</p>

          <p>📚 Curso online grabado para hacer a tu ritmo</p>
          <p>🕓 Duración: {curso.duracion} horas</p>
          <p>🗓️ Acceso inmediato y disponible por 1 año</p>

          {/* ✨ Temas del curso */}
          {curso.contenido?.length > 0 && (
            <div className="detalle-beneficios">
              <h3>✨ ¿Qué vas a aprender?</h3>
              <ul>
                {curso.contenido.map((tema, i) => (
                  <li key={i}>✔ {tema}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Beneficios adicionales */}
          <div className="detalle-beneficios">
            <h3>✨ ¿Qué incluye este curso?</h3>
            <ul>
              <li>✔️ Acceso por 1 año desde la compra</li>
              <li>✔️ Espacio para consultas por WhatsApp</li>
              <li>✔️ Material complementario en PDF</li>
           {/*    <li>✔️ Avance progresivo en la plataforma</li> */}
            </ul>
          </div>

          {/* Precio y botones */}
          <div className="curso-acciones">
            <p className="precio">
              💸 Precio:{" "}
              {curso.precioAr
                ? `$${curso.precioAr.toLocaleString("es-AR")} ARS`
                : "Consultar"}{" "}
              /{" "}
              {curso.precioUsd
                ? `USD ${curso.precioUsd.toLocaleString("en-US")}`
                : "Consultar"}
            </p>

            <button
              className="boton-agregar-carrito"
              onClick={() => agregarAlCarrito(curso)}
            >
              Agregar al Carrito
            </button>

            <a
              href={`https://wa.me/5491124596372?text=${encodeURIComponent(
                `Hola Marisa, estoy interesad@ en el curso: "${curso.titulo}". ¿Podrías contarme más detalles?`
              )}`}
              className="boton-consultar-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>

        {curso.imagen && (
          <div className="curso-imagen">
            <img src={curso.imagen} alt={`Imagen del curso ${curso.titulo}`} />
          </div>
        )}
      </section>

      <div className="buttonsClaseDetalle">
        <Link to="/cursos" className="volver-link">
          ← Volver a cursos grabados
        </Link>
      </div>
    </div>
  );
}
