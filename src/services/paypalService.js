import api from "./api"; 

// ✅ Crear una orden en PayPal incluyendo los cursos
export const crearOrdenPaypal = async ({ precio, descripcion, cursos }) => {
  try {
    const response = await api.post("/paypal/crear-orden", {
      precio,
      descripcion,
      cursos, // 👈 ahora se envían los cursos
    });

    console.log("🧾 Respuesta crearOrdenPaypal:", response.data); // 👉 agregá esto

    return response.data.id;
  } catch (error) {
    console.error("❌ Error al crear orden PayPal:", error);
    throw error.response?.data || { mensaje: "Error al crear orden PayPal" };
  }
};
