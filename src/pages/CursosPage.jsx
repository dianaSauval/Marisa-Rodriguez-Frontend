import { useEffect, useState } from "react";
import "../assets/styles/pages/AllCursosPage.css";
import { Link } from "react-router-dom";
import { obtenerCursosVisibles } from "../services/CursoService";
import EmptyState from "../components/EmptyState/EmptyState";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet";

const categorias = [
  { key: "todos", label: "Todos ✨" },
  { key: "tarot", label: "Tarot 🔮" },
  { key: "reiki", label: "Reiki 🕊️" },
  { key: "luzYEnergia", label: "Terapias de Luz ✨" },
  { key: "terapiasIntegrativas", label: "Terapias Integrativas 🌿" },
];

export default function CursosPage() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const data = await obtenerCursosVisibles();
        setCursos(data);
      } catch (error) {
        console.error("❌ Error al obtener los cursos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  let cursosFiltrados = [];

  if (Array.isArray(cursos)) {
    cursosFiltrados = cursos.filter((curso) => {
      if (!curso || typeof curso !== "object") return false;

      return (
        categoriaSeleccionada === "todos" ||
        curso.categoria === categoriaSeleccionada
      );
    });
  } else {
    console.error("❌ cursos no es un array:", cursos);
  }

  return (
    <>
      <Helmet>
        <title>Cursos Holísticos | Marisa Rodríguez</title>
        <link
          rel="canonical"
          href="https://marisarodriguezterapiasholisticas.com/cursos"
        />
        <meta
          name="description"
          content="Accedé a cursos grabados de Reiki, Tarot, Terapias Energéticas y más. Aprendé a tu ritmo, desde cualquier lugar."
        />
      </Helmet>

      <div className="cursos-container">
        {/* 💬 Sección de explicación */}
        <section className="explicacion-cursos">
          <h1>Cursos Grabados</h1>
          <p>
            📚 Accedé a cursos grabados que podés ver a tu ritmo desde cualquier
            lugar.
          </p>
          <ul>
            <li>🧘‍♀️ Se acceden desde tu perfil, dentro de esta plataforma.</li>
            <li>🔐 Necesitás estar logueado para verlos.</li>
            <li>🕓 Una vez comprados, están disponibles durante 1 año.</li>
            <li>📦 Incluyen videos y PDFs descargables</li>
            <li>
              📞 Asistencia personalizada por WhatsApp para despejar dudas
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

        {/* 🧿 Cursos */}
        <section className="grid-cursos">
          {loading ? (
            <LoadingSpinner texto="Cargando curso..." />
          ) : !Array.isArray(cursosFiltrados) ? (
            <p>❌ Error cargando cursos</p>
          ) : cursosFiltrados.length > 0 ? (
            cursosFiltrados.map((curso) => (
              <div
                key={curso._id}
                className={`curso-card ${curso.categoria} ${
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
                <span className="badge-modalidad grabado">🎥 Grabado</span>
              </div>
            ))
          ) : (
            <EmptyState
              title="No hay cursos disponibles"
              subtitle="Estamos trabajando para traerte contenido muy pronto."
            />
          )}
        </section>
      </div>
    </>
  );
}
