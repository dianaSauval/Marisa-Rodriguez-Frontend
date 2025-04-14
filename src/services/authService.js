// services/authService.js
import api from "./api";

export const login = async (email, password) => {
  const response = await api.post("/usuarios/login", { email, password });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const registrar = async (usuario) => {
  const response = await api.post("/usuarios/registro", usuario);
  return response.data;
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error al enviar el correo de recuperación." };
  }
};


export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post(`/usuarios/reset-password/${token}`, {
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Error inesperado." };
  }
};

// 🎥 Cursos comprados
export const obtenerMisCursosGrabados = async () => {
  try {
    const response = await api.get("/usuarios/mis-cursos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener cursos grabados:", error);
    throw error.response?.data || { error: "Error al obtener los cursos" };
  }
};

// 🔮 Clases en vivo compradas
export const obtenerMisClasesEnVivo = async () => {
  try {
    const response = await api.get("/usuarios/mis-clases");
    return response.data;
  } catch (error) {
    console.error("Error al obtener clases en vivo:", error);
    throw error.response?.data || { error: "Error al obtener las clases en vivo" };
  }
};
