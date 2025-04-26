import { useEffect, useState } from "react";
import { crearOrdenPaypal } from "../../services/paypalService";
import "./BotonPaypal.css";

export default function BotonPaypal({ precio, descripcion, cursos = [], onAprobado }) {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    console.log("🤖 Entró al useEffect de PayPal");
    if (!window.paypal || cursos.length === 0) return;

    const container = document.getElementById("paypal-button-container");
    if (!container) return;

    window.paypal.Buttons({
      style: {
        layout: "vertical",
        color: "gold",
        shape: "rect",
        label: "paypal",
      },
      createOrder: async () => {
        const idOrden = await crearOrdenPaypal({
          precio,
          descripcion,
          cursos: cursos.map((c) => c._id),
        });
        return idOrden;
      },
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

          onAprobado(orden);
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
      onInit: () => {
        setCargando(false); // ✅ apenas se inicializa, quitamos el spinner
      },
    }).render(container);
  }, [precio, descripcion, cursos, onAprobado]);

  return (
    <div className="paypal-boton-container">
      {cargando && (
        <div className="spinner">
          <div className="spinner-circle"></div>
          <p className="spinner-texto">Cargando botón de pago...</p>
        </div>
      )}
      <div id="paypal-button-container" style={{ minHeight: "80px" }} />
    </div>
  );
}