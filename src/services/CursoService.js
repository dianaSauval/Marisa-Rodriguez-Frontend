import api from "./api";

// ✅ Obtener todos los cursos
export const obtenerCursos = async () => {
  const res = await api.get("/cursos");
  return res.data;
};

// ✅ Obtener cursos por categoría
export const obtenerCursosPorCategoria = async (categoria) => {
  const res = await api.get(`/cursos/categoria/${categoria}`);
  return res.data;
};

// ✅ Obtener un curso por ID
export const obtenerCursoPorId = async (id) => {
  const res = await api.get(`/cursos/${id}`);
  return res.data;
};

// ✅ Crear un curso (requiere token de admin)
export const crearCurso = async (cursoData, token) => {
  const res = await api.post("/cursos", cursoData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ✅ Editar un curso (requiere token de admin)
export const editarCurso = async (id, cursoData, token) => {
  const res = await api.put(`/cursos/${id}`, cursoData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ✅ Eliminar un curso (requiere token de admin)
export const eliminarCurso = async (id, token) => {
  const res = await api.delete(`/cursos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ✅ Cambiar visibilidad del curso (requiere token de admin)
export const cambiarVisibilidadCurso = async (id, token) => {
  const res = await api.patch(`/cursos/visibilidad/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};



// ✅ Obtener todos los cursos visibles
export const obtenerCursosVisibles = async () => {
  const res = await api.get("/cursos/visibles");
  return res.data;
};

// ✅ Obtener cursos visibles por categoría
export const obtenerCursosVisiblesPorCategoria = async (categoria) => {
  const res = await api.get(`/cursos/visibles/${categoria}`);
  return res.data;
};
