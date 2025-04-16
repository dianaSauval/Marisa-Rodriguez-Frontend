import useFormularioCurso from "../../../hooks/useFormularioCurso";
import validarFormulario from "../../../utils/validarFormulario";
import useModalMensaje from "../../../hooks/useModalMensaje";
import { crearClase, editarClase } from "../../../services/clasesVivoService";
import { crearCurso, editarCurso } from "../../../services/CursoService";
import { subirImagenACloudinary } from "../../../services/subirImagen";

// Subcomponentes
import CampoBasico from "./CampoBasico";
import CampoSelect from "./CampoSelect";
import CampoCheckbox from "./CampoCheckbox";
import CampoTemas from "./CampoTemas";
import SeccionGrabado from "./SeccionGrabado";
import SeccionVivo from "./SeccionVivo";

import "./FormularioCurso.css";

export default function FormularioCurso({
  modo = "crear",
  curso = {},
  onCancelar,
  onGuardar,
}) {
  const {
    formulario,
    setFormulario,
    errores,
    setErrores,
    manejarCambio,
    manejarCambioFechas,
    manejarCambioContenido,
    agregarTema,
    eliminarTema,
    manejarCambioVideo,
  } = useFormularioCurso({ curso, modo });

  const { Modal, openModal } = useModalMensaje();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevosErrores = validarFormulario(formulario);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      const primerError = document.querySelector(
        ".campo-error input, .campo-error select, .campo-error textarea"
      );
      if (primerError) primerError.focus();
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const datos = { ...formulario };
      datos.contenido = datos.contenido.filter((tema) => tema.trim() !== "");
      const normalizarPrecio = (valor) =>
        typeof valor === "string"
          ? parseFloat(valor.replace(",", "."))
          : parseFloat(valor);
      
      datos.precioAr = normalizarPrecio(formulario.precioAr);
      datos.precioUsd = normalizarPrecio(formulario.precioUsd);
      
      if (!datos.imagen?.url) delete datos.imagen;

      if (formulario.tipo === "grabado") {
        const res =
          modo === "crear"
            ? await crearCurso(datos, token)
            : await editarCurso(curso._id, datos, token);
        onGuardar({ ...res, tipo: "grabado" });
        openModal({
          titulo:
            modo === "crear" ? "✅ Curso grabado creado" : "✏️ Curso editado",
          subtitulo:
            modo === "crear"
              ? "Tu curso ya está disponible"
              : "Los cambios fueron guardados",
          redirectTo: "/admin",
          onCloseExtra: onCancelar,
        });
      } else if (formulario.tipo === "vivo") {
        const res =
          modo === "crear"
            ? await crearClase(datos)
            : await editarClase(curso._id, datos);
        onGuardar({ ...res, tipo: "vivo" });
        openModal({
          titulo:
            modo === "crear" ? "✅ Clase en vivo creada" : "✏️ Clase editada",
          subtitulo:
            modo === "crear"
              ? "Ya aparece en el panel"
              : "Los cambios fueron guardados",
          redirectTo: "/admin",
          onCloseExtra: onCancelar,
        });
      }
    } catch (error) {
      console.error("❌ Error al guardar:", error);
      openModal({
        titulo: "❌ Error al guardar",
        subtitulo:
          error?.response?.data?.mensaje ||
          "Revisá los campos e intentá de nuevo",
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
        {/* Campos generales */}
        <CampoBasico
          label="Título del curso"
          name="titulo"
          value={formulario.titulo}
          onChange={manejarCambio}
          error={errores.titulo}
          hint="Ej: Reiki Usui Nivel I"
        />

        <CampoBasico
          label="Descripción"
          name="descripcion"
          value={formulario.descripcion}
          onChange={manejarCambio}
          error={errores.descripcion}
          hint="Una frase breve que describa el curso"
        />

        <CampoSelect
          label="Tipo de curso"
          name="tipo"
          value={formulario.tipo}
          onChange={manejarCambio}
          opciones={[
            { value: "grabado", label: "🎥 Grabado" },
            { value: "vivo", label: "🔮 En vivo" },
          ]}
          hint="Este campo es obligatorio para mostrar los campos correctos"
          error={errores.tipo}
        />

        <CampoSelect
          label="Categoría"
          name="categoria"
          value={formulario.categoria}
          onChange={manejarCambio}
          opciones={[
            { value: "reiki", label: "Reiki" },
            { value: "tarot", label: "Tarot" },
            { value: "luzYEnergia", label: "Terapias de Luz" },
            { value: "terapiasIntegrativas", label: "Terapias Integrativas" },
          ]}
          error={errores.categoria}
        />

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
                setFormulario((prev) => ({ ...prev, imagen: respuesta }));
              } catch (error) {
                console.error("Error al subir la imagen:", error);
                alert("Ocurrió un error al subir la imagen");
              }
            }}
          />
          <small>Esta imagen aparecerá en la vista previa del curso.</small>
          {formulario.imagen?.url && (
            <small>
              Imagen subida ✔️{" "}
              <a href={formulario.imagen.url} target="_blank" rel="noreferrer">
                Ver imagen
              </a>
            </small>
          )}
        </label>

        {/* Secciones condicionales */}
        {formulario.tipo === "grabado" && (
          <SeccionGrabado
            formulario={formulario}
            errores={errores}
            onChangeDuracion={manejarCambio}
            onChangeVideo={manejarCambioVideo}
          />
        )}

        {formulario.tipo === "vivo" && (
          <SeccionVivo
            fechas={formulario.fechas}
            grupoWhatsapp={formulario.grupoWhatsapp}
            errores={errores}
            onChangeFechas={manejarCambioFechas}
            onChangeWhatsapp={manejarCambio}
          />
        )}

        {/* Precios */}
        <CampoBasico
          label="Precio en ARS"
          name="precioAr"
          type="number"
          step="0.01" // ✅ permite decimales
          value={formulario.precioAr}
          onChange={manejarCambio}
          error={errores.precioAr}
          hint="Para usar decimales, usa el punto en vez de la coma. Ej: 1500.50"

        />

        <CampoBasico
          label="Precio en USD"
          name="precioUsd"
          type="number"
          step="0.01" // ✅ permite decimales
          value={formulario.precioUsd}
          onChange={manejarCambio}
          error={errores.precioUsd}
          hint="Para usar decimales, usa el punto en vez de la coma. Ej: 20.50"
        />

        {/* Contenido: temas */}
        <CampoTemas
          temas={formulario.contenido}
          onCambiarTema={manejarCambioContenido}
          onAgregar={agregarTema}
          onEliminar={eliminarTema}
        />

        {/* Checkboxes */}
        <CampoCheckbox
          name="visible"
          checked={formulario.visible}
          onChange={manejarCambio}
          label="Mostrar públicamente"
        />

        {formulario.categoria === "reiki" && (
          <CampoCheckbox
            name="esPropio"
            checked={formulario.esPropio}
            onChange={manejarCambio}
            label="Canalizado por Marisa Rodríguez"
          />
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
