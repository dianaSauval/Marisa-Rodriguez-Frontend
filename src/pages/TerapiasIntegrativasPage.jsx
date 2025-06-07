import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/pages/CursosPage.css";
import { obtenerCursosVisiblesPorCategoria } from "../services/CursoService";
import { obtenerClasesVisiblesPorCategoria } from "../services/clasesVivoService";
import EmptyState from "../components/EmptyState/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet";

export default function TerapiasIntegrativasPage() {
  const [cursos, setCursos] = useState([]);
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [cursosIntegrativos, clasesIntegrativas] = await Promise.all([
          obtenerCursosVisiblesPorCategoria("terapiasIntegrativas"),
          obtenerClasesVisiblesPorCategoria("terapiasIntegrativas"),
        ]);
        setCursos(cursosIntegrativos);
        setClases(clasesIntegrativas);
      } catch (error) {
        console.error("Error al cargar cursos o clases integrativas:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const hayContenido = cursos.length > 0 || clases.length > 0;

  return (
    <>
      <Helmet>
        <title>Terapias Integrativas | Marisa Rodríguez</title>
        <link
          rel="canonical"
          href="https://marisarodriguezterapiasholisticas.com/terapias-integrativas"
        />
        <meta
          name="description"
          content="Un enfoque holístico que une Reiki, Terapia Floral, Runas y Vidas Pasadas. Sanación desde el alma, con amor y guía."
        />
      </Helmet>

      <div className="cursos-container">
        <section className="encabezado-cursos">
          <h1>Terapias Integrativas</h1>
          <p>
            Espacios de sanación que fusionan sabiduría ancestral y herramientas
            contemporáneas para acompañar procesos emocionales, espirituales y
            energéticos.
          </p>
        </section>

        {loading ? (
          <LoadingSpinner texto="Cargando contenido..." />
        ) : hayContenido ? (
          <section className="grid-cursos">
            {cursos.map((curso) => (
              <div
                key={curso._id}
                className={`curso-card terapiasIntegrativas ${
                  curso.esPropio ? "canalizado" : ""
                }`}
              >
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
              <div
                key={clase._id}
                className={`curso-card terapiasIntegrativas ${
                  clase.esPropio ? "canalizado" : ""
                }`}
              >
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
            subtitle="Pronto habrá nuevas propuestas en Terapias Integrativas ✨"
          />
        )}
      </div>
    </>
  );
}
