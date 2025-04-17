import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SuccessMessage from "../components/SuccessMessage/SuccessMessage";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { obtenerPreferencia, confirmarCompraCursos } from "../services/pagosService";

export default function PagoExitosoPage() {
  const { vaciarCarrito } = useCart();
  const { usuario, loading } = useAuth(); // 👈 ahora también usamos loading
  const [confirmando, setConfirmando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;        // ⏳ Aún cargando el usuario
    if (!usuario) return;       // ⚠️ No hay usuario, no confirmar nada

    const confirmar = async () => {
      try {
        const idPreferencia = localStorage.getItem("mp_preference_id");
        const paypalPagado = localStorage.getItem("paypal_pagado");

        if (idPreferencia) {
          const pref = await obtenerPreferencia(idPreferencia);
          const cursosPagados = pref.metadata?.cursos || [];
          if (cursosPagados.length > 0) {
            await confirmarCompraCursos(cursosPagados);
            vaciarCarrito();
            localStorage.removeItem("mp_preference_id");
          }
        }

        if (paypalPagado === "true") {
          const cursos = JSON.parse(localStorage.getItem("paypal_cursos") || "[]");
          if (cursos.length > 0) {
            await confirmarCompraCursos(cursos);
            vaciarCarrito();
          }
          localStorage.removeItem("paypal_pagado");
          localStorage.removeItem("paypal_cursos");
        }

        setConfirmando(false); // ✅ Terminó todo bien
      } catch (error) {
        console.error("❌ Error al confirmar compra:", error);
        navigate("/pago-fallido"); // 🔁 Si falla la confirmación
      }
    };

    confirmar();
  }, [usuario, loading, navigate]);

  if (loading || confirmando) {
    return <LoadingSpinner texto="Confirmando tu compra..." />;
  }

  return (
    <SuccessMessage
      icon="💫"
      title="¡Gracias por tu compra!"
      subtitle="Tu acceso está habilitado por un año. ¡A disfrutar el conocimiento!"
    >
      <a href="/mis-cursos">📚 Ir a mis cursos</a>
    </SuccessMessage>
  );
}
