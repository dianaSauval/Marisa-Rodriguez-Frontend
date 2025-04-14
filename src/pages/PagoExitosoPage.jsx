import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import SuccessMessage from "../components/SuccessMessage/SuccessMessage";
import { obtenerPreferencia, confirmarCompraCursos } from "../services/pagosService";

export default function PagoExitosoPage() {
  const { vaciarCarrito } = useCart();
  const { usuario } = useAuth();

  useEffect(() => {
    const confirmar = async () => {
      const idPreferencia = localStorage.getItem("mp_preference_id");
      if (!idPreferencia || !usuario) return;

      try {
        const pref = await obtenerPreferencia(idPreferencia);
        const cursosPagados = pref.metadata?.cursos || [];

        if (cursosPagados.length > 0) {
          await confirmarCompraCursos(cursosPagados);
          vaciarCarrito();
          localStorage.removeItem("mp_preference_id");
        }
      } catch (error) {
        console.error("❌ Error al confirmar compra desde metadata:", error);
      }
    };

    confirmar();
  }, [usuario]);

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
