import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/pages/CursosPage.css";
import { obtenerCursosVisiblesPorCategoria } from "../services/CursoService";
import { obtenerClasesVisiblesPorCategoria } from "../services/clasesVivoService";
import EmptyState from "../components/EmptyState/EmptyState";

export default function ReikiPage() {
  const [cursos, setCursos] = useState([]);
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [cursosReiki, clasesReiki] = await Promise.all([
          obtenerCursosVisiblesPorCategoria("reiki"),
          obtenerClasesVisiblesPorCategoria("reiki"),
        ]);
        setCursos(cursosReiki);
        setClases(clasesReiki);
      } catch (error) {
        console.error("Error al cargar cursos o clases de reiki:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const hayContenido = cursos.length > 0 || clases.length > 0;

  return (
    <div className="cursos-container">
      <section className="encabezado-cursos">
        <h1>Reiki</h1>
        <p>
          Sanación energética a través de la canalización universal. Explorá
          distintos sistemas que armonizan cuerpo, mente y alma.
        </p>
      </section>

      {loading ? (
        <p>Cargando contenido...</p>
      ) : hayContenido ? (
        <section className="grid-cursos">
          {cursos.map((curso) => (
            <div key={curso._id} className={`curso-card reiki ${curso.esPropio ? "canalizado" : ""}`}>
              <h3>{curso.titulo}</h3>
              {curso.esPropio && (
                <span className="badge-propio">
                  Sistema Canalizado por Marisa Rodríguez
                </span>
              )}
              <p>{curso.descripcion}</p>
              <Link to={`/cursoDetalle/${curso._id}`}>
                <button className="boton-mistico">Ver más</button>
              </Link>
              <span className="badge-modalidad grabado">Grabado</span>
            </div>
          ))}

          {clases.map((clase) => (
            <div key={clase._id} className={`curso-card reiki ${clase.esPropio ? "canalizado" : ""}`}>
              <h3>{clase.titulo}</h3>
              {clase.esPropio && (
                <span className="badge-propio">
                  Sistema Canalizado por Marisa Rodríguez
                </span>
              )}
              <p>{clase.descripcion}</p>
              <Link to={`/claseDetalle/${clase._id}`}>
                <button className="boton-mistico">Ver más</button>
              </Link>
              <span className="badge-modalidad vivo">En vivo</span>
            </div>
          ))}
        </section>
      ) : (
        <EmptyState
          title="No hay contenido disponible"
          subtitle="Pronto habrá nuevas propuestas en Reiki ✨"
        />
      )}
    </div>
  );
}
