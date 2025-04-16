// validarFormulario.js
export default function validarFormulario(formulario) {
  const errores = {};
  const tipo = formulario.tipo;

  // Validaciones comunes
  if (!formulario.titulo.trim()) errores.titulo = "El título es obligatorio";
  if (!formulario.descripcion.trim())
    errores.descripcion = "La descripción es obligatoria";
  if (!formulario.tipo) errores.tipo = "Elegí el tipo de curso";
  if (!formulario.categoria) errores.categoria = "Elegí una categoría";
  if (!formulario.precioAr) errores.precioAr = "Falta el precio en ARS";
  if (!formulario.precioUsd) errores.precioUsd = "Falta el precio en USD";
  if (isNaN(parseFloat(formulario.precioAr))) {
    errores.precioAr = "El precio debe ser un número válido";
  }
  if (isNaN(parseFloat(formulario.precioUsd))) {
    errores.precioAr = "El precio debe ser un número válido";
  }
  

  // Validaciones específicas para curso grabado
  if (tipo === "grabado") {
    if (!formulario.duracion || !formulario.duracion.trim()) {
      errores.duracion = "Ingresá la duración del curso";
    }

    if (!formulario.video.titulo.trim())
      errores.videoTitulo = "Falta el título del video";
    if (!formulario.video.descripcion.trim())
      errores.videoDescripcion = "Falta la descripción del video";
    if (!formulario.video.url.trim())
      errores.videoUrl = "Falta la URL del video";
  }

  // Validaciones específicas para curso en vivo
  if (tipo === "vivo") {
    if (!formulario.fechas.cantidadClases)
      errores.cantidadClases = "Ingresá la cantidad de clases";
    if (!formulario.fechas.fechaInicio)
      errores.fechaInicio = "Falta la fecha de inicio";
    if (!formulario.fechas.horario) errores.horario = "Falta el horario";
    if (!formulario.fechas.diaSemana) {
      errores.diaSemana = "Falta el día de la semana";
    }
    
  }

  return errores;
}
