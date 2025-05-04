import api from "./api";

// ✅ Crear una orden en PayPal incluyendo los cursos
export const crearOrdenPaypal = async ({ precio, descripcion, cursos }) => {
  try {
    console.log("📤 Creando orden PayPal:", { precio, descripcion, cursos });

    const response = await api.post("/paypal/crear-orden", {
      precio,
      descripcion,
      cursos,
    });

    console.log("🧾 Respuesta crearOrdenPaypal:", response.data);

    // 🔍 Validamos antes de retornar
    if (!response.data.id) {
      throw new Error("No se pudo crear una orden válida de PayPal.");
    }

    return response.data.id;
  } catch (error) {
    console.error("❌ Error al crear orden PayPal:", error);
    throw error.response?.data || { mensaje: "Error al crear orden PayPal" };
  }
};
