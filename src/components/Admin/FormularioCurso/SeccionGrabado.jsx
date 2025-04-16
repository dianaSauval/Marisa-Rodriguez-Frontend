// SeccionGrabado.jsx
import CampoBasico from "./CampoBasico";

export default function SeccionGrabado({ formulario, errores, onChangeDuracion, onChangeVideo }) {
  return (
    <div className="seccion-condicional">
      <CampoBasico
        label="Duración (en horas)"
        name="duracion"
        type="text"
        value={formulario.duracion}
        onChange={onChangeDuracion}
        error={errores.duracion}
        hint="Ej: 1:30hs"
      />

      <CampoBasico
        label="Título del video"
        name="titulo"
        value={formulario.video.titulo}
        onChange={onChangeVideo}
        error={errores.videoTitulo}
      />

      <CampoBasico
        label="Descripción del video"
        name="descripcion"
        value={formulario.video.descripcion}
        onChange={onChangeVideo}
        error={errores.videoDescripcion}
      />

      <CampoBasico
        label="URL del video"
        name="url"
        type="url"
        value={formulario.video.url}
        onChange={onChangeVideo}
        error={errores.videoUrl}
      />
    </div>
  );
}
