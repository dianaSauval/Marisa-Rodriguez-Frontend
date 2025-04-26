import { useEffect, useState } from "react";
import { crearOrdenPaypal } from "../../services/paypalService";
import "./BotonPaypal.css";

export default function BotonPaypal({ precio, descripcion, cursos = [], onAprobado }) {
  const [cargando, setCargando] = useState(true);
  const [sdkReady, setSdkReady] = useState(false);
  const [errorSDK, setErrorSDK] = useState(false);
  const [containerId] = useState(() => `paypal-button-container-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const cargarPaypalSDK = async () => {
      if (window.paypal) {
        setSdkReady(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://www.paypal.com/sdk/js?client-id=Afze7SVu-m_05Jj-7EKt-JyzyFlWnCn1C9AZw0jQWVkyFp2o7XyVaEI0xNfUhzWKb3nymmDdBG56PKvw&currency=USD&intent=capture";
      script.type = "text/javascript";
      script.async = true;
      script.onload = () => {
        console.log("✅ SDK de PayPal cargado");
        setSdkReady(true);
      };
      script.onerror = () => {
        console.error("❌ Error cargando el SDK de PayPal");
        setErrorSDK(true);
        setCargando(false);
      };
      document.body.appendChild(script);
    };

    cargarPaypalSDK();
  }, []);

  useEffect(() => {
    if (!sdkReady || cursos.length === 0) return;

    const container = document.getElementById(containerId);
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
        console.log("🧾 ID de orden creada:", idOrden);
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
        setCargando(false);
      },
    }).render(`#${containerId}`);
  }, [precio, descripcion, cursos, onAprobado, containerId, sdkReady]);

  return (
    <div className="paypal-boton-container">
      {cargando && (
        <div className="spinner">
          <div className="spinner-circle"></div>
          <p className="spinner-texto">Cargando botón de pago...</p>
        </div>
      )}

      {errorSDK && (
        <div className="error-paypal">
          <p>❌ Hubo un problema cargando el botón de PayPal. Intentá recargar la página.</p>
        </div>
      )}

      <div id={containerId} style={{ minHeight: "80px", minWidth: "200px" }} />
    </div>
  );
}
