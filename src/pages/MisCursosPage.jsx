import { useEffect, useState } from "react";
import {
  obtenerMisCursosGrabados,
  obtenerMisClasesEnVivo,
} from "../services/authService";
import { obtenerCursos } from "../services/CursoService";
import { obtenerClases } from "../services/clasesVivoService";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/pages/MisCursosPage.css";
import EmptyState from "../components/EmptyState/EmptyState";
import { Link } from "react-router-dom";

export default function MisCursosPage() {
  const { usuario } = useAuth();
  const [cursos, setCursos] = useState([]);
  const [clases, setClases] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        if (usuario?.rol === "admin") {
          const [todosCursos, todasClases] = await Promise.all([
            obtenerCursos(),
            obtenerClases(),
          ]);
          setCursos(todosCursos);
          setClases(todasClases);
        } else {
          const [misCursos, misClases] = await Promise.all([
            obtenerMisCursosGrabados(),
            obtenerMisClasesEnVivo(),
          ]);
          setCursos(misCursos);
          setClases(misClases);
        }
      } catch (error) {
        console.error("❌ Error al cargar cursos y clases:", error);
      }
    };

    cargarDatos();
  }, [usuario]);

  const ahora = new Date();

  const clasesProximas = clases.filter(
    (clase) => new Date(clase.fechas?.fechaInicio) > ahora
  );

  const clasesPasadas = clases.filter(
    (clase) => new Date(clase.fechas?.fechaInicio) <= ahora
  );

  const formatearFecha = (fechaISO) => {
    const opciones = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(fechaISO).toLocaleDateString("es-AR", opciones);
  };

  return (
    <div className="mis-cursos-container">
      <h1 className="titulo-principal">🌟 Mis Cursos</h1>

      {/* Cursos grabados */}
      <section className="seccion-cursos">
        <h2 className="subtitulo-seccion">🎥 Cursos Grabados</h2>
        {cursos.length > 0 ? (
          <div className="grid-cursos">
            {cursos.map((curso) => (
              <div key={curso._id} className={`curso-card ${curso.categoria}`}>
                <h3>{curso.titulo}</h3>
                <p>{curso.descripcion}</p>
                <Link to={`/mis-cursos/${curso._id}`}>
                  <button className="boton-mistico">Acceder al curso</button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Aún no compraste ningún cursos"
            subtitle="Cuando lo hagas, aparecerán aquí ✨"
          />
        )}
      </section>

      {/* Clases en vivo próximas */}
      <section className="seccion-vivo">
        <h2 className="subtitulo-seccion">🔮 Próximas Clases en Vivo</h2>
        {clasesProximas.length > 0 ? (
          <ul className="lista-clases">
            {clasesProximas.map((clase) => (
              <li key={clase._id} className="item-clase">
                <span className="titulo-clase">{clase.titulo}</span>
                <span className="fecha-clase">
                  📅 {formatearFecha(clase.fechas?.fechaInicio)}
                </span>
                {clase.grupoWhatsapp && (
                  <a
                    href={clase.grupoWhatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-whatsapp"
                  >
                    Ir al grupo de WhatsApp
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No hay clases en vivo próximas por ahora"
            subtitle="Pronto se abrirá un nuevo portal para vos 🔮"
          />
        )}
      </section>

      {/* Clases en vivo pasadas */}
      <section className="seccion-vivo">
        <h2 className="subtitulo-seccion">📜 Clases Realizadas</h2>
        {clasesPasadas.length > 0 ? (
          <ul className="lista-clases">
            {clasesPasadas.map((clase) => (
              <li key={clase._id} className="item-clase item-pasado">
                <span className="titulo-clase">{clase.titulo}</span>
                <span className="fecha-clase">
                  🕓 {formatearFecha(clase.fechas?.fechaInicio)}
                </span>
                <span className="estado-pasado">Finalizada</span>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="Aún no participaste de ninguna clase en vivo"
            subtitle="Cada aprendizaje deja huella... y aún no diste el primer paso 🕯️"
          />
        )}
      </section>
    </div>
  );
}
