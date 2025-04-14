import { useState, useEffect } from "react";
import { crearClase, editarClase } from "../../../services/clasesVivoService";
import { crearCurso, editarCurso } from "../../../services/CursoService";
import useModalMensaje from "../../../hooks/useModalMensaje";
import "./FormularioCurso.css";
import { subirImagenACloudinary } from "../../../services/subirImagen";

export default function FormularioCurso({
  modo = "crear",
  curso = {},
  onCancelar,
  onGuardar,
}) {
  const [formulario, setFormulario] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    tipo: "",
    visible: true,
    esPropio: false,
    precioAr: "",
    precioUsd: "",
    // específicos para curso grabado
    duracion: "",

    contenido: [""],
    video: { titulo: "", descripcion: "", url: "" },
    imagen: {
      url: "",
      public_id: "",
    },

    // específicos para curso en vivo
    fechas: {
      cantidadClases: "",
      duracionClase: "",
      fechaInicio: "",
      horario: "",
      diaSemana: "",
    },
    grupoWhatsapp: "",
  });

  const { Modal, openModal } = useModalMensaje();

  useEffect(() => {
    if (curso && Object.keys(curso).length > 0) {
      setFormulario({ ...formulario, ...curso });
    }
  }, [curso]);

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario({
      ...formulario,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const manejarCambioFechas = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      fechas: {
        ...formulario.fechas,
        [name]: value,
      },
    });
  };

  const eliminarTema = (index) => {
    const nuevoContenido = [...formulario.contenido];
    nuevoContenido.splice(index, 1);
    setFormulario({ ...formulario, contenido: nuevoContenido });
  };

  const manejarCambioContenido = (index, value) => {
    const nuevoContenido = [...formulario.contenido];
    nuevoContenido[index] = value;
    setFormulario({ ...formulario, contenido: nuevoContenido });
  };

  const agregarTema = () => {
    setFormulario({ ...formulario, contenido: [...formulario.contenido, ""] });
  };

  const manejarCambioVideo = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      video: {
        ...formulario.video,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const datos = { ...formulario };

      // Validar contenido
      datos.contenido = datos.contenido.filter((tema) => tema.trim() !== "");
      datos.precioAr = Number(datos.precioAr);
      datos.precioUsd = Number(datos.precioUsd);

      // Eliminar imagen si está vacía
      if (!datos.imagen?.url) {
        delete datos.imagen;
      }
      console.log("📝 Datos listos para enviar:", datos);
      if (formulario.tipo === "grabado") {
        if (modo === "crear") {
          const creado = await crearCurso(datos, token);

          onGuardar({ ...creado, tipo: "grabado" }); // ✅ tipo correcto

          console.log("✅ Curso creado:", creado);
          openModal({
            titulo: "✅ Curso grabado creado",
            subtitulo: "Tu curso ya está disponible en el panel",
            redirectTo: "/admin",
            onCloseExtra: onCancelar,
          });
        } else {
          const editado = await editarCurso(curso._id, datos, token);
          onGuardar({ ...editado, tipo: "grabado" }); // 👈 importante

          console.log("✏️ Curso editado:", editado);
          openModal({
            titulo: "✏️ Curso editado",
            subtitulo: "Los cambios se guardaron correctamente",
            redirectTo: "/admin",
            onCloseExtra: onCancelar,
          });
        }
      } else if (formulario.tipo === "vivo") {
        if (modo === "crear") {
          const creado = await crearClase(datos);
          onGuardar({ ...creado, tipo: "vivo" });
          console.log("✅ Clase en vivo creada:", creado);
          openModal({
            titulo: "✅ Clase en vivo creada",
            subtitulo: "Ya aparece en el listado del panel",
            redirectTo: "/admin",
            onCloseExtra: onCancelar,
          });
        } else {
          const editado = await editarClase(curso._id, datos);
          onGuardar({ ...editado, tipo: "vivo" });
          console.log("✏️ Clase en vivo editada:", editado);
          openModal({
            titulo: "✏️ Clase editada",
            subtitulo: "Los cambios se guardaron correctamente",
            redirectTo: "/admin",
            onCloseExtra: onCancelar,
          });
        }
      } else {
        console.warn("⚠️ Tipo de curso no reconocido:", formulario.tipo);
      }
    } catch (error) {
      console.error(
        "❌ Error al guardar en el backend:",
        error?.response?.data || error.message
      );
      openModal({
        titulo: "❌ Error al guardar",
        subtitulo:
          error?.response?.data?.mensaje ||
          "Revisá los campos y volvé a intentar",
        redirectTo: null,
      });
    }
  };

  return (
    <div className="formulario-curso">
      <h2>
        {modo === "crear"
          ? "➕ Estás creando un nuevo curso"
          : `✏️ Estás editando: ${curso.titulo}`}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Título */}
        <label>
          Título del curso
          <input
            type="text"
            name="titulo"
            value={formulario.titulo}
            onChange={manejarCambio}
          />
          <small>Ej: Reiki Usui Nivel I</small>
        </label>

        {/* Descripción */}
        <label>
          Descripción
          <textarea
            rows="3"
            name="descripcion"
            value={formulario.descripcion}
            onChange={manejarCambio}
          />
          <small>Una frase breve que describa el curso</small>
        </label>

        {/* Tipo */}
        <label>

  Tipo de curso
  <select name="tipo" value={formulario.tipo} onChange={manejarCambio}>
    <option value="">Seleccioná una opción</option>
    <option value="grabado">🎥 Grabado</option>
    <option value="vivo">🔮 En vivo</option>
  </select>
  <small>Este campo es obligatorio para mostrar los campos correctos</small>
</label>


        {/* Categoría */}
        <label>
          Categoría
          <select
            name="categoria"
            value={formulario.categoria}
            onChange={manejarCambio}
          >
            <option value="">Seleccioná una opción</option>
            <option value="reiki">Reiki</option>
            <option value="tarot">Tarot</option>
            <option value="luzYEnergia">Terapias de Luz</option>
            <option value="terapiasIntegrativas">Terapias Integrativas</option>
          </select>
        </label>

        {/* Imagen */}
        {/* Imagen destacada */}
        <label className="campo-imagen">
          Imagen destacada (opcional)
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const archivo = e.target.files[0];
              if (!archivo) return;

              try {
                const respuesta = await subirImagenACloudinary(archivo);
                setFormulario({ ...formulario, imagen: respuesta });
              } catch (error) {
                console.error("Error al subir la imagen:", error);
                alert("Ocurrió un error al subir la imagen");
              }
            }}
          />
          <small>
            Esta imagen aparecerá en la vista previa del curso. Si no subís
            ninguna, se mostrará sin imagen destacada.
          </small>
          {formulario.imagen?.url && (
            <small style={{ display: "block", marginTop: "0.5rem" }}>
              Imagen subida ✔️ <br />
              <a href={formulario.imagen.url} target="_blank" rel="noreferrer">
                Ver imagen
              </a>
            </small>
          )}
        </label>

        {/* Sección: Curso Grabado */}
        {formulario.tipo === "grabado" && (
          <div className="seccion-condicional">
            <label>
              Duración (en horas)
              <input
                type="number"
                name="duracion"
                value={formulario.duracion}
                onChange={manejarCambio}
              />
            </label>

            <label>
              Título del video principal
              <input
                type="text"
                name="titulo"
                value={formulario.video.titulo}
                onChange={manejarCambioVideo}
              />
            </label>
            <label>
              Descripción del video
              <input
                type="text"
                name="descripcion"
                value={formulario.video.descripcion}
                onChange={manejarCambioVideo}
              />
            </label>
            <label>
              URL del video
              <input
                type="url"
                name="url"
                value={formulario.video.url}
                onChange={manejarCambioVideo}
              />
            </label>
          </div>
        )}

        {/* Sección: Clase en Vivo */}
        {/* Sección: Clase en Vivo */}
        {formulario.tipo === "vivo" && (
          <div className="seccion-condicional">
            <label>
              Cantidad de clases
              <input
                type="number"
                name="cantidadClases"
                value={formulario.fechas.cantidadClases}
                onChange={manejarCambioFechas}
              />
            </label>
            <label>
              Duración de cada clase
              <input
                type="text"
                name="duracionClase"
                value={formulario.fechas.duracionClase}
                onChange={manejarCambioFechas}
              />
              <small>Ej: 2 horas</small>
            </label>
            <label>
              Fecha de inicio
              <input
                type="date"
                name="fechaInicio"
                value={formulario.fechas.fechaInicio?.slice(0, 10) || ""}
                onChange={manejarCambioFechas}
              />
            </label>
            <label>
              Día de la semana
              <input
                type="text"
                name="diaSemana"
                value={formulario.fechas.diaSemana}
                onChange={manejarCambioFechas}
              />
              <small>Ej: Miércoles</small>
            </label>
            <label>
              Horario
              <input
                type="time"
                name="horario"
                value={formulario.fechas.horario}
                onChange={manejarCambioFechas}
              />
            </label>
            <label>
              Link al grupo de WhatsApp
              <input
                type="url"
                name="grupoWhatsapp"
                value={formulario.grupoWhatsapp}
                onChange={manejarCambio}
              />
            </label>
          </div>
        )}
        {/* Contenido del curso o clase */}
        {(formulario.tipo === "grabado" || formulario.tipo === "vivo") && (
          <>
            <div className="seccion-condicional">
              <label>
                Precio en pesos argentinos (ARS)
                <input
                  type="number"
                  name="precioAr"
                  value={formulario.precioAr || ""}
                  onChange={manejarCambio}
                />
                <small>Ej: 8800</small>
              </label>

              <label>
                Precio en dólares estadounidenses (USD)
                <input
                  type="number"
                  name="precioUsd"
                  value={formulario.precioUsd || ""}
                  onChange={manejarCambio}
                />
                <small>Ej: 22</small>
              </label>
            </div>
            <label className="temas-container">
              Temas que se van a ver
              <small>Podés agregar o quitar temas libremente</small>
              {formulario.contenido.map((tema, i) => (
                <div
                  className="tema-item"
                  key={i}
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <input
                    type="text"
                    value={tema}
                    onChange={(e) => manejarCambioContenido(i, e.target.value)}
                    placeholder={`Tema ${i + 1}`}
                    style={{ flexGrow: 1 }}
                  />
                  <button type="button" onClick={() => eliminarTema(i)}>
                    X
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={agregarTema}
                className="agregar-tema"
              >
                ➕ Agregar tema
              </button>
            </label>
          </>
        )}

        {/* Visibilidad */}
        <label className="checkbox">
          <input
            type="checkbox"
            name="visible"
            checked={formulario.visible}
            onChange={manejarCambio}
          />
          Mostrar este curso públicamente
        </label>

        {/* Checkbox solo para cursos Reiki canalizados por Marisa */}
        {formulario.categoria === "reiki" && (
          <label className="checkbox">
            <input
              type="checkbox"
              name="esPropio"
              checked={formulario.esPropio}
              onChange={manejarCambio}
            />
            Este contenido fue canalizado por Marisa Rodríguez
          </label>
        )}

        {/* Botones */}
        <div className="botones-formulario">
          <button type="submit" className="boton-guardar">
            💾 Guardar
          </button>
          <button type="button" className="boton-cancelar" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </form>
      {Modal}
    </div>
  );
}
