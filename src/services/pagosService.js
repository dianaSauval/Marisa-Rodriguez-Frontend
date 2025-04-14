import api from "./api";

// ✅ Confirmar compra (agregar cursos al usuario)
export const confirmarCompraCursos = async (cursos) => {
  try {
    const response = await api.post("/pagos/confirmar-compra", { cursos });
    return response.data;

  } catch (error) {
    console.error("❌ Error al confirmar compra:", error);
    throw error.response?.data || { mensaje: "Error al confirmar compra" };
  }
};

// ✅ Obtener info de una preferencia por ID
export const obtenerPreferencia = async (id) => {
  const response = await api.get(`/pagos/preferencia/${id}`);
  return response.data;
};
