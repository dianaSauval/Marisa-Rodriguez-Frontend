import { useEffect, useState } from "react";
import "../assets/styles/pages/AllCursosPage.css";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState/EmptyState";
import {
  obtenerClasesVisibles,
  obtenerClasesVisiblesPorCategoria,
} from "../services/clasesVivoService";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet";

const categorias = [
  { key: "todos", label: "Todos ✨" },
  { key: "tarot", label: "Tarot 🔮" },
  { key: "reiki", label: "Reiki 🕊️" },
  { key: "luzYEnergia", label: "Terapias de Luz ✨" },
  { key: "terapiasIntegrativas", label: "Terapias Integrativas 🌿" },
];

export default function ClasesEnVivoPage() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClases = async () => {
      setLoading(true);
      try {
        const data =
          categoriaSeleccionada === "todos"
            ? await obtenerClasesVisibles()
            : await obtenerClasesVisiblesPorCategoria(categoriaSeleccionada);
        setClases(data);
      } catch (error) {
        console.error("Error al obtener clases:", error);
        setClases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClases();
  }, [categoriaSeleccionada]);

  const acortarDescripcion = (texto, maxLength = 110) => {
    return texto.length > maxLength ? texto.slice(0, maxLength) + "..." : texto;
  };

  const capitalizar = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  const formatearFecha = (fechas) => {
    if (!fechas) {
      return {
        cantidad: "Clases a confirmar",
        inicio: "Fecha a confirmar",
        horario: "",
      };
    }

    const fechaInicio = new Date(fechas.fechaInicio);
    const diaSemana = capitalizar(
      fechas.diaSemana ||
        fechaInicio.toLocaleDateString("es-AR", { weekday: "long" })
    );
    const inicio = `${diaSemana} ${fechaInicio.getDate()} de ${fechaInicio.toLocaleDateString(
      "es-AR",
      {
        month: "long",
      }
    )}`;

    return {
      cantidad: `📚 ${fechas.cantidadClases} clase${
        fechas.cantidadClases > 1 ? "s" : ""
      }`,
      inicio: `🗓️ Inicio: ${inicio}`,
      horario: `⏰ ${fechas.horario} hs`,
    };
  };

  return (
    <>
      <Helmet>
        <title>Clases en Vivo | Marisa Rodríguez</title>
        <link
          rel="canonical"
          href="https://marisarodriguezterapiasholisticas.com/clases-en-vivo"
        />
        <meta
          name="description"
          content="Conectá en directo con Marisa Rodríguez. Clases online con cupos limitados para aprender, sanar y compartir en comunidad."
        />
      </Helmet>

      <div className="cursos-container">
        {/* 💬 Sección de explicación */}
        <section className="explicacion-cursos">
          <h1>Clases en Vivo</h1>
          <p>
            💫 Participá en clases virtuales en tiempo real, desde cualquier
            parte del mundo.
          </p>
          <ul>
            <li>🗓️ Cada clase tiene una fecha y horario específico.</li>
            <li>
              🧑‍🏫 Se dictan por Google Meet y se organizan desde un grupo de
              WhatsApp exclusivo.
            </li>
            <li>
              📲 Una vez te inscribís, accedés al grupo donde se comparte el
              link y el material necesario.
            </li>
            <li>
              🛒 Al comprar tu clase, vas a recibir el acceso al grupo y toda la
              info.
            </li>
          </ul>
        </section>

        {/* 🎛️ Filtros */}
        <section className="filtros-categorias">
          {categorias.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategoriaSeleccionada(cat.key)}
              className={`filtro-boton ${
                categoriaSeleccionada === cat.key ? "activo" : ""
              }`}
            >
              {cat.label}
            </button>
          ))}
        </section>

        {/* 🔮 Clases */}
        <section className="grid-cursos">
          {loading ? (
            <LoadingSpinner texto="Cargando clases..." />
          ) : clases.length > 0 ? (
            clases.map((clase, index) => (
              <div
                key={index}
                className={`curso-card ${clase.categoria} ${
                  clase.esPropio ? "canalizado" : ""
                }`}
              >
                <h3>{clase.titulo}</h3>
                {clase.esPropio && (
                  <span className="badge-propio">
                    Sistema Canalizado por Marisa Rodríguez
                  </span>
                )}
                <p className="descripcion-corta">
                  {acortarDescripcion(clase.descripcion)}
                </p>
                {(() => {
                  const fecha = formatearFecha(clase.fechas);
                  return (
                    <div className="fecha-clase">
                      <p>{fecha.cantidad}</p>
                      <p>{fecha.inicio}</p>
                      <p>{fecha.horario}</p>
                    </div>
                  );
                })()}

                <Link to={`/claseDetalle/${clase._id}`}>
                  <button className="boton-mistico">Ver Más</button>
                </Link>
                <span className="badge-modalidad vivo">🟣 En Vivo</span>
              </div>
            ))
          ) : (
            <EmptyState
              title="No hay cursos disponibles"
              subtitle="Estamos trabajando para traerte contenido mágico muy pronto."
            />
          )}
        </section>
      </div>
    </>
  );
}
