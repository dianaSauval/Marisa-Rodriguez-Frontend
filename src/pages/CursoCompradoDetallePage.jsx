import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerCursoPorId } from "../services/CursoService";
import { getEmbedUrl } from "../utils/video";
import "../assets/styles/pages/CursoCompradoDetallePage.css";

export default function CursoCompradoDetallePage() {
  const { id } = useParams();
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const data = await obtenerCursoPorId(id);
        setCurso(data);
      } catch (error) {
        console.error("❌ Error al obtener el curso:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurso();
  }, [id]);

  if (loading)
    return <p className="cursoComprado-loading">Cargando curso...</p>;
  if (!curso)
    return <p className="cursoComprado-error">No se encontró el curso.</p>;

  return (
    <div className="cursoComprado-detalle-container">
      <h1 className="cursoComprado-titulo">{curso.titulo}</h1>

      <p className="cursoComprado-descripcion">{curso.descripcion}</p>

      <div className="cursoComprado-secciones">
        <h2>Temas del curso:</h2>
        <ul>
          {curso.contenido.map((tema, i) => (
            <li key={i}> {tema}</li>
          ))}
        </ul>
      </div>

      <div className="cursoComprado-video">
        <h2>{curso.video.titulo}</h2>
        <p className="video-descripcion">{curso.video.descripcion}</p>
        <iframe
          src={getEmbedUrl(curso.video.url)}
          title={curso.video.titulo}
          frameBorder="0"
          allow="fullscreen"
          className="video-embed"
        />
      </div>
      {curso.pdfs?.length > 0 && (
  <div className="cursoComprado-pdfs">
    <h2>📄 Material complementario para descargar</h2>
    <p className="cursoComprado-pdfs-descripcion">
      Estos archivos acompañan al curso y te ayudarán a profundizar. Están alojados en Google Drive.
    </p>
    <ul className="cursoComprado-pdfs-lista">
      {curso.pdfs.map((pdf, i) => (
        <li key={i}>
          <a
            href={pdf.url}
            target="_blank"
            rel="noopener noreferrer"
            className="cursoComprado-pdf-link"
          >
            📥 {pdf.titulo || `Material ${i + 1}`}
          </a>
        </li>
      ))}
    </ul>
  </div>
)}


      <a
        href={`https://wa.me/5491124596372?text=${encodeURIComponent(
          `Hola Marisa! ✨\n\nAcabo de ver el curso "${curso.titulo}" que compré y me surgieron algunas dudas.\n\n¿Podrías ayudarme? 🙏\n\nMis preguntas son:\n- `
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="boton-whatsapp"
      >
        💬 Consultar a Marisa por WhatsApp
      </a>
    </div>
  );
}
