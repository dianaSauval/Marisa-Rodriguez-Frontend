import { useState, useEffect } from "react";

export default function useFormularioCurso({ curso = {}, modo = "crear" }) {
  const [formulario, setFormulario] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    tipo: "",
    visible: true,
    esPropio: false,
    precioAr: "",
    precioUsd: "",
    duracion: "",
    contenido: [""],
    video: { titulo: "", descripcion: "", url: "" },
    imagen: { url: "", public_id: "" },
    fechas: {
      cantidadClases: "",
      duracionClase: "",
      fechaInicio: "",
      horario: "",
      diaSemana: "",
    },
    grupoWhatsapp: "",
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (curso && Object.keys(curso).length > 0) {
      setFormulario((prev) => ({ ...prev, ...curso }));
    }
  }, [curso]);

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // 🧽 Limpiar error si es válido
  if (errores[name]) {
    const erroresActualizados = { ...errores };

    // Validaciones rápidas individuales
    if (name === "titulo" && value.trim()) delete erroresActualizados.titulo;
    if (name === "descripcion" && value.trim()) delete erroresActualizados.descripcion;
    if (name === "precioAr" && value) delete erroresActualizados.precioAr;
    if (name === "precioUsd" && value) delete erroresActualizados.precioUsd;
    if (name === "tipo" && value) delete erroresActualizados.tipo;
    if (name === "categoria" && value) delete erroresActualizados.categoria;

    setErrores(erroresActualizados);
  }
  };

  const manejarCambioFechas = (e) => {
    const { name, value } = e.target;
  
    setFormulario((prev) => ({
      ...prev,
      fechas: {
        ...prev.fechas,
        [name]: value,
      },
    }));
  
    // 🧽 Limpiar errores si el campo era requerido y ahora tiene valor
    const camposConValidacion = ["cantidadClases", "fechaInicio", "horario"];
    if (camposConValidacion.includes(name) && errores[name]) {
      const esValido = value !== "" && value !== null && value !== undefined;
  
      if (esValido) {
        const erroresActualizados = { ...errores };
        delete erroresActualizados[name];
        setErrores(erroresActualizados);
      }
    }
  };
  

  const manejarCambioContenido = (index, value) => {
    const nuevoContenido = [...formulario.contenido];
    nuevoContenido[index] = value;
    setFormulario((prev) => ({
      ...prev,
      contenido: nuevoContenido,
    }));
  };

  const agregarTema = () => {
    setFormulario((prev) => ({
      ...prev,
      contenido: [...prev.contenido, ""],
    }));
  };

  const eliminarTema = (index) => {
    const nuevoContenido = [...formulario.contenido];
    nuevoContenido.splice(index, 1);
    setFormulario((prev) => ({
      ...prev,
      contenido: nuevoContenido,
    }));
  };

  const manejarCambioVideo = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      video: { ...prev.video, [name]: value },
    }));

    // 🧽 Limpiar errores si el valor es válido
  const errorMap = {
    titulo: "videoTitulo",
    descripcion: "videoDescripcion",
    url: "videoUrl",
  };

  if (errores[errorMap[name]] && value.trim()) {
    const erroresActualizados = { ...errores };
    delete erroresActualizados[errorMap[name]];
    setErrores(erroresActualizados);
  }
  };

  return {
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
  };
}
