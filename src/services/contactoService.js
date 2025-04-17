import api from "./api";

export const enviarMensajeDeContacto = async ({ nombre, email, mensaje }) => {
  try {
    const response = await api.post("/contacto", {
      nombre,
      email,
      mensaje,
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error en contactoService:", error);
    // Si la API devuelve un mensaje de error desde el backend
    if (error.response && error.response.data?.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Ocurrió un error al enviar el mensaje.");
    }
  }
};
