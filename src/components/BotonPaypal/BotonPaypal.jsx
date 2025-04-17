import { useEffect } from "react";
import { crearOrdenPaypal } from "../../services/paypalService";

export default function BotonPaypal({ precio, descripcion, cursos = [], onAprobado }) {
  useEffect(() => {
    if (!window.paypal || cursos.length === 0) return;

    window.paypal.Buttons({
      style: {
        layout: "vertical",
        color: "gold",
        shape: "rect",
        label: "paypal",
      },
      // 🔹 PASO 1: crear orden con IDs incluidos
      createOrder: async () => {
        const idOrden = await crearOrdenPaypal({
          precio,
          descripcion,
          cursos: cursos.map((c) => c._id), // 👈 pasamos los IDs
        });
        return idOrden;
      },

      // 🔹 PASO 2: extraer los IDs desde la descripción capturada
      onApprove: async (data, actions) => {
        try {
          const orden = await actions.order.capture();

          const descripcion = orden.purchase_units?.[0]?.description || "";
          const ids = descripcion
            .replace("Compra: ", "")
            .split(",")
            .map((id) => id.trim())
            .filter((id) => id.length > 0);

          localStorage.setItem("paypal_pagado", "true");
          localStorage.setItem("paypal_cursos", JSON.stringify(ids));

          onAprobado(orden); // ✅ Llamamos a la función de éxito que redirige y vacía
        } catch (error) {
          console.error("❌ Error al capturar pago de PayPal:", error);
          window.location.href = "/pago-fallido";
        }
      },

      onError: (err) => {
        console.error("❌ Error en PayPal:", err);
        window.location.href = "/pago-fallido";
      },

      onCancel: () => {
        console.warn("⚠️ Usuario canceló el pago.");
        window.location.href = "/pago-fallido";
      },
    }).render("#paypal-button-container");
  }, [precio, descripcion, cursos, onAprobado]);

  return <div id="paypal-button-container" />;
}
