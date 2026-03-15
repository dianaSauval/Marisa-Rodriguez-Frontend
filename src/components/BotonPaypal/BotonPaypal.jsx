import { useEffect, useState } from "react";
import { crearOrdenPaypal } from "../../services/paypalService";
import api from "../../services/api";
import "./BotonPaypal.css";

export default function BotonPaypal({
  precio,
  descripcion,
  cursos = [],
  onAprobado,
}) {
  const [cargando, setCargando] = useState(true);
  const [sdkReady, setSdkReady] = useState(false);
  const [errorSDK, setErrorSDK] = useState(false);
  const [containerId] = useState(
    () => `paypal-button-container-${Math.random().toString(36).slice(2, 11)}`,
  );

  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const paypalCurrency = import.meta.env.VITE_PAYPAL_CURRENCY || "USD";

  // Cargar el SDK de PayPal
  useEffect(() => {
    const cargarPaypalSDK = async () => {
      if (!paypalClientId) {
        console.error(
          "❌ Falta VITE_PAYPAL_CLIENT_ID en las variables de entorno",
        );
        setErrorSDK(true);
        setCargando(false);
        return;
      }

      if (window.paypal) {
        setSdkReady(true);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=${paypalCurrency}&intent=capture`;
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
  }, [paypalClientId, paypalCurrency]);

  // Renderizar el botón cuando el SDK esté listo
  useEffect(() => {
    if (!sdkReady || cursos.length === 0 || !window.paypal) return;

    const container = document.getElementById(containerId);
    if (!container) return;

    // Limpiar render previo por si el efecto corre más de una vez
    container.innerHTML = "";

    window.paypal
      .Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "paypal",
        },

        createOrder: async () => {
          try {
            const idOrden = await crearOrdenPaypal({
              precio,
              descripcion,
              cursos: cursos.map((c) => c._id),
            });

            console.log("🧾 ID de orden creada:", idOrden);
            return idOrden;
          } catch (error) {
            console.error("❌ Error creando orden PayPal:", error);
            window.location.href = "/pago-fallido";
          }
        },

        onApprove: async (data) => {
          try {
            const captureRes = await api.post("/paypal/capturar-orden", {
              orderID: data.orderID,
            });

            console.log("💸 Orden capturada en backend:", captureRes.data);

            const ids = cursos.map((c) => c._id);

            localStorage.setItem("paypal_pagado", "true");
            localStorage.setItem("paypal_cursos", JSON.stringify(ids));

            window.location.href = "/pago-exitoso";
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
      })
      .render(`#${containerId}`);
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
          <p>
            ❌ Hubo un problema cargando el botón de PayPal. Intentá recargar la
            página.
          </p>
        </div>
      )}

      <div id={containerId} style={{ minHeight: "80px", minWidth: "200px" }} />
    </div>
  );
}
