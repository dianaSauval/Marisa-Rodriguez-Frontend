export default function validarFormulario(formulario) {
  const errores = {};
  const tipo = formulario.tipo;

  // Validaciones comunes
  if (!formulario.titulo.trim()) errores.titulo = "El título es obligatorio";
  if (!formulario.descripcion.trim()) errores.descripcion = "La descripción es obligatoria";
  if (!formulario.tipo) errores.tipo = "Elegí el tipo de curso";
  if (!formulario.categoria) errores.categoria = "Elegí una categoría";

  const precioAr = parseFloat(formulario.precioAr);
  const precioUsd = parseFloat(formulario.precioUsd);

  if (!formulario.precioAr) errores.precioAr = "Falta el precio en ARS";
  else if (isNaN(precioAr)) errores.precioAr = "El precio debe ser un número válido";

  if (!formulario.precioUsd) errores.precioUsd = "Falta el precio en USD";
  else if (isNaN(precioUsd)) errores.precioUsd = "El precio debe ser un número válido";

  // Curso grabado
  if (tipo === "grabado") {
    if (!formulario.duracion?.trim()) errores.duracion = "Ingresá la duración del curso";
    if (!formulario.video.titulo.trim()) errores.videoTitulo = "Falta el título del video";
    if (!formulario.video.descripcion.trim()) errores.videoDescripcion = "Falta la descripción del video";
    if (!formulario.video.url.trim()) errores.videoUrl = "Falta la URL del video";

    // Validar PDFs
    formulario.pdfs.forEach((pdf, index) => {
      if (!pdf.titulo?.trim()) errores[`pdfs.${index}.titulo`] = "El título es obligatorio";
      if (!pdf.url?.startsWith("http")) errores[`pdfs.${index}.url`] = "Debe ser un link válido";
    });
  }

  // Curso en vivo
  if (tipo === "vivo") {
    if (!formulario.fechas.cantidadClases) errores.cantidadClases = "Ingresá la cantidad de clases";
    if (!formulario.fechas.fechaInicio) errores.fechaInicio = "Falta la fecha de inicio";
    if (!formulario.fechas.horario) errores.horario = "Falta el horario";
    if (!formulario.fechas.diaSemana) errores.diaSemana = "Falta el día de la semana";
  }  

  return errores;
}
