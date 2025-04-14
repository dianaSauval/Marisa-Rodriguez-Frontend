// ✅ AdminLayout ajustado: trae cursos y clases por separado, sin filtros innecesarios
import { useEffect, useState } from "react";
import "../../assets/styles/pages/admin/AdminLayout.css";
import PanelAdmin from "./PanelAdmin";
import FormularioCurso from "../../components/Admin/FormularioCurso/FormularioCurso";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { obtenerCursos } from "../../services/CursoService";
import { obtenerClases } from "../../services/clasesVivoService";

export default function AdminLayout() {
  const [vista, setVista] = useState("panel"); // 'panel' | 'formulario'
  const [menuAbierto, setMenuAbierto] = useState(true);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [cursosGrabados, setCursosGrabados] = useState([]);
  const [cursosVivos, setCursosVivos] = useState([]);

  const mostrarMenu = vista !== "formulario" && menuAbierto;

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const grabados = await obtenerCursos();
        const vivos = await obtenerClases();

        // Marcamos el tipo de cada uno
        const grabadosConTipo = grabados.map((c) => ({ ...c, tipo: "grabado" }));
        const vivosConTipo = vivos.map((c) => ({ ...c, tipo: "vivo" }));

        setCursosGrabados(grabadosConTipo);
        setCursosVivos(vivosConTipo);
      } catch (error) {
        console.error("Error al cargar los cursos:", error);
      }
    };

    fetchCursos();
  }, []);

  const cambiarAVistaPanel = () => {
    setVista("panel");
    setMenuAbierto(true);
    setCursoSeleccionado(null);
  };

  const editarCurso = (curso) => {
    setCursoSeleccionado(curso);
    setVista("formulario");
  };

  const todosLosCursos = [...cursosGrabados, ...cursosVivos];

  const cursosFiltrados = todosLosCursos.filter((curso) => {
    const tipoOk = filtroTipo === "todos" || curso.tipo === filtroTipo;
    const categoriaOk =
      filtroCategoria === "todas" || curso.categoria === filtroCategoria;
    return tipoOk && categoriaOk;
  });

  const actualizarCursoEditado = (cursoEditado) => {
    if (cursoEditado.tipo === "grabado") {
      setCursosGrabados((prev) =>
        prev.map((c) => (c._id === cursoEditado._id ? cursoEditado : c))
      );
    } else {
      setCursosVivos((prev) =>
        prev.map((c) => (c._id === cursoEditado._id ? cursoEditado : c))
      );
    }
  };
  
  const agregarNuevoCurso = (nuevoCurso) => {
    if (nuevoCurso.tipo === "grabado") {
      setCursosGrabados((prev) => [...prev, nuevoCurso]);
    } else {
      setCursosVivos((prev) => [...prev, nuevoCurso]);
    }
  };

  const actualizarVisibilidadCurso = (id, visible, tipo) => {
    if (tipo === "grabado") {
      setCursosGrabados((prev) =>
        prev.map((c) => (c._id === id ? { ...c, visible } : c))
      );
    } else {
      setCursosVivos((prev) =>
        prev.map((c) => (c._id === id ? { ...c, visible } : c))
      );
    }
  };

  const eliminarCursoDesdePanel = (id, tipo) => {
    if (tipo === "grabado") {
      setCursosGrabados((prev) => prev.filter((c) => c._id !== id));
    } else {
      setCursosVivos((prev) => prev.filter((c) => c._id !== id));
    }
  };
  
  
  

  return (
    <div className="admin-layout">
      <aside className={`menu-lateral ${mostrarMenu ? "abierto" : "cerrado"}`}>
        {vista !== "formulario" && (
          <button
            className="hamburguesa"
            onClick={() => setMenuAbierto(!menuAbierto)}
            title="Mostrar/Ocultar menú"
          >
            {menuAbierto ? "⇦" : "☰"}
          </button>
        )}

        {mostrarMenu && (
          <nav>
            <h2>📂 Opciones</h2>
            <button
              onClick={() => {
                cambiarAVistaPanel();
                setFiltroTipo("todos");
              }}
            >
              📋 Todos los cursos
            </button>
            <button onClick={() => setVista("formulario")}>➕ Agregar nuevo curso</button>
            <button
              onClick={() => {
                cambiarAVistaPanel();
                setFiltroTipo("grabado");
              }}
            >
              🎥 Ver solo cursos grabados
            </button>
            <button
              onClick={() => {
                cambiarAVistaPanel();
                setFiltroTipo("vivo");
              }}
            >
              🔮 Ver solo clases en vivo
            </button>

            <div className="menu-cursos-lista">
              <h3>🎥 Cursos grabados</h3>
              <ul>
                {cursosGrabados.map((curso) => (
                  <li key={curso._id}>
                    <button
                      onClick={() => editarCurso(curso)}
                      className={`curso-link ${curso.visible ? "visible" : "oculto"}`}
                    >
                      <span className="curso-titulo">{curso.titulo}</span>
                      <span className="estado-curso">
                        {curso.visible ? <HiOutlineEye /> : <HiOutlineEyeOff />}
                        {curso.visible ? "Visible" : "Oculto"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="menu-cursos-lista">
              <h3>🔮 Clases en vivo</h3>
              <ul>
                {cursosVivos.map((curso) => (
                  <li key={curso._id}>
                    <button
                      onClick={() => editarCurso(curso)}
                      className={`curso-link ${curso.visible ? "visible" : "oculto"}`}
                    >
                      <span className="curso-titulo">{curso.titulo}</span>
                      <span className="estado-curso">
                        {curso.visible ? <HiOutlineEye /> : <HiOutlineEyeOff />}
                        {curso.visible ? "Visible" : "Oculto"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}
      </aside>

      <main className="contenido-admin">
        {vista === "panel" && (
          <PanelAdmin
            cursos={cursosFiltrados}
            filtroTipo={filtroTipo}
            setFiltroCategoria={setFiltroCategoria}
            filtroCategoria={filtroCategoria}
            onEditarCurso={editarCurso}
            onActualizarVisibilidad={actualizarVisibilidadCurso}
            onEliminarCurso={eliminarCursoDesdePanel}
          />
        )}
        {vista === "formulario" && (
          <div className="formulario-wrapper">
            <button className="cerrar-formulario" onClick={cambiarAVistaPanel}>
              ❌
            </button>
            <FormularioCurso
              modo={cursoSeleccionado ? "editar" : "crear"}
              curso={cursoSeleccionado || {}}
              onCancelar={cambiarAVistaPanel}
              onGuardar={cursoSeleccionado ? actualizarCursoEditado : agregarNuevoCurso}
            />
          </div>
        )}
      </main>
    </div>
  );
}
