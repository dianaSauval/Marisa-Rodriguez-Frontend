// services/clasesVivoService.js
import api from "./api";

export const obtenerClases = async () => {
  const res = await api.get("/clases-vivo");
  return res.data;
};

export const obtenerPorCategoria = async (categoria) => {
  const res = await api.get(`/clases-vivo/categoria/${categoria}`);
  return res.data;
};

export const obtenerClasePorId = async (id) => {
  const res = await api.get(`/clases-vivo/${id}`);
  return res.data;
};

export const crearClase = async (datos) => {
  const res = await api.post("/clases-vivo", datos);
  return res.data;
};

export const editarClase = async (id, datos) => {
  const res = await api.put(`/clases-vivo/${id}`, datos);
  return res.data;
};

export const eliminarClase = async (id) => {
  const res = await api.delete(`/clases-vivo/${id}`);
  return res.data;
};


export const obtenerClasesVisibles = async () => {
  const res = await api.get("/clases-vivo/visibles");
  return res.data;
};

export const obtenerClasesVisiblesPorCategoria = async (categoria) => {
  const res = await api.get(`/clases-vivo/visibles/${categoria}`);
  return res.data;
};


