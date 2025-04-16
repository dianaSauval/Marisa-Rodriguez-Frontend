// ✅ PanelAdmin actualizado para trabajar con datos reales
import { useEffect, useState } from "react";
import "../../assets/styles/pages/admin/PanelAdmin.css";
import EmptyState from "../../components/EmptyState/EmptyState";
import { FiEdit, FiEye, FiEyeOff, FiTrash2 } from "react-icons/fi";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import {
  eliminarCurso,
  cambiarVisibilidadCurso,
} from "../../services/CursoService";
import { eliminarClase, editarClase } from "../../services/clasesVivoService";

export default function PanelAdmin({
  cursos,
  filtroTipo,
  filtroCategoria,
  setFiltroCategoria,
  onEditarCurso,
  onActualizarVisibilidad,
  onEliminarCurso,
}) {
  const [listaCursos, setListaCursos] = useState(cursos);
  const [visibilidadEnProceso, setVisibilidadEnProceso] = useState({});
  const [cursoAEliminar, setCursoAEliminar] = useState(null);

  useEffect(() => {
    setListaCursos(cursos);
  }, [cursos]);

  const categorias = [
    { key: "todas", label: "Todas ✨" },
    { key: "reiki", label: "Reiki 🕊️" },
    { key: "tarot", label: "Tarot 🔮" },
    { key: "luzYEnergia", label: "Terapias de Luz ✨" },
    { key: "terapiasIntegrativas", label: "Terapias Integrativas 🌿" },
  ];

  const toggleVisibilidad = async (curso) => {
    setVisibilidadEnProceso((prev) => ({ ...prev, [curso._id]: true }));
    try {
      if (curso.tipo === "grabado") {
        await cambiarVisibilidadCurso(curso._id, localStorage.getItem("token"));
      } else {
        await editarClase(curso._id, { ...curso, visible: !curso.visible });
      }

      const actualizados = listaCursos.map((c) =>
        c._id === curso._id ? { ...c, visible: !c.visible } : c
      );
      setListaCursos(actualizados);

      // 🔁 Avisa al layout para que actualice también el menú lateral
      onActualizarVisibilidad(curso._id, !curso.visible, curso.tipo);
    } catch (error) {
      console.error("Error al cambiar visibilidad:", error);
      alert("Hubo un error al cambiar la visibilidad.");
    } finally {
      setVisibilidadEnProceso((prev) => ({ ...prev, [curso._id]: false }));
    }
  };

  const eliminar = async (curso) => {
    try {
      if (curso.tipo === "grabado") {
        await eliminarCurso(curso._id, localStorage.getItem("token"));
      } else {
        await eliminarClase(curso._id);
      }
      const actualizados = listaCursos.filter((c) => c._id !== curso._id);
      setListaCursos(actualizados);
    } catch (error) {
      console.error("Error al eliminar curso:", error);
    }
    onEliminarCurso(curso._id, curso.tipo); // 👈 notificamos al layout
  };

  const cursosFiltrados = listaCursos.filter((curso) => {
    const tipoOk = filtroTipo === "todos" || curso.tipo === filtroTipo;
    const categoriaOk =
      filtroCategoria === "todas" || curso.categoria === filtroCategoria;
    return tipoOk && categoriaOk;
  });

  return (
    <div className="panel-admin">
      <h1 className="titulo-panel">📋 Panel de cursos ({filtroTipo})</h1>

      {/* Filtro por categoría */}
      <div className="filtros-admin">
        {categorias.map((cat) => (
          <button
            key={cat.key}
            className={`filtro-boton ${
              filtroCategoria === cat.key ? "activo" : ""
            }`}
            onClick={() => setFiltroCategoria(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="lista-cursos-admin">
        {cursosFiltrados.length === 0 ? (
          <EmptyState
            title="No hay cursos que coincidan con los filtros"
            subtitle=""
          />
        ) : (
          cursosFiltrados.map((curso) => (
            <div key={curso._id} className="item-admin">
              <div>
                <h3>{curso.titulo}</h3>
                <p>
                  Tipo: {curso.tipo === "grabado" ? "🎥 Grabado" : "🔮 En vivo"}
                </p>
                <p>Categoría: {curso.categoria}</p>
                <p>
                  {curso.visible ? <HiOutlineEye /> : <HiOutlineEyeOff />}{" "}
                  {curso.visible ? "Visible" : "Oculto"}
                </p>
              </div>
              <div className="acciones">
                <button
                  className="boton-admin editar"
                  onClick={() => onEditarCurso(curso)}
                >
                  <FiEdit /> Editar
                </button>
                <button
                  className="boton-admin eliminar"
                  onClick={() => setCursoAEliminar(curso)}
                >
                  <FiTrash2 /> Eliminar
                </button>

                <button
                  className={`boton-admin visibilidad ${
                    curso.visible ? "ocultar" : "mostrar"
                  }`}
                  onClick={() => toggleVisibilidad(curso)}
                  disabled={visibilidadEnProceso[curso._id]}
                >
                  {visibilidadEnProceso[curso._id] ? (
                    "Cambiando..."
                  ) : (
                    <>
                      {curso.visible ? <FiEyeOff /> : <FiEye />}{" "}
                      {curso.visible ? "Ocultar" : "Mostrar"}
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {cursoAEliminar && (
        <div className="modal-eliminar-overlay">
          <div className="modal-eliminar">
            <h3>¿Estás segura de que querés eliminar este curso?</h3>
            <p className="nombre-curso">"{cursoAEliminar.titulo}"</p>

            <div className="acciones-modal">
              <button
                className="confirmar"
                onClick={() => {
                  eliminar(cursoAEliminar);
                  setCursoAEliminar(null);
                }}
              >
                Sí, eliminar
              </button>
              <button
                className="cancelar"
                onClick={() => setCursoAEliminar(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
