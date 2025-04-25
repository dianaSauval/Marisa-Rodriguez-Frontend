import { useCart } from "../context/CartContext";
import "../assets/styles/pages/CarritoPage.css";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState/EmptyState";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useState } from "react";
import BotonPaypal from "../components/BotonPaypal/BotonPaypal";

export default function CarritoPage() {
  const [moneda, setMoneda] = useState("ARS"); // "ARS" o "USD" 

  const { carrito, removerDelCarrito, vaciarCarrito } = useCart();
  const { usuario } = useAuth();
  

  const total = carrito.reduce((acc, curso) => {
    const precio = moneda === "ARS" ? curso.precioAr : curso.precioUsd;
    return acc + (typeof precio === "number" ? precio : 0);
  }, 0);

  const manejarCompra = async () => {
    const token = localStorage.getItem("token");
    const cursos = carrito.map((curso) => curso._id);
    console.log(
      "🛰 Enviando a:",
      `${import.meta.env.VITE_API_URL}/pagos/crear-preferencia`
    );

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/pagos/crear-preferencia`,
      { cursos },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${res.data.id}`;
    localStorage.setItem("mp_preference_id", res.data.id);
  };

  return (
    <div className="carrito-container">
      <h1>Tu Carrito</h1>

      {!usuario ? (
        <EmptyState
          title="Necesitás una cuenta para continuar"
          subtitle="Para poder comprar un curso y acceder a tus contenidos desde la sección 'Mis cursos', es necesario crear una cuenta o iniciar sesión. Así podemos guardar tu recorrido y asegurar que tengas acceso siempre que lo necesites. ✨"
        />
      ) : carrito.length === 0 ? (
        <EmptyState
          title="Aún no haz elegido ningún curso"
          subtitle="Tu recorrido aún no comenzó... pero cada viaje empieza con un primer paso ✨"
        />
      ) : (
        <>
          <ul className="carrito-lista">
            {carrito.map((curso, index) => (
              <li key={index} className="carrito-item">
                <div>
                  <h3>{curso.titulo}</h3>
                  <p>{curso.descripcion?.slice(0, 80)}...</p>
                </div>
                <div className="carrito-item-info">
                  <span className="carrito-precio">
                    {moneda === "ARS"
                      ? `$${curso.precioAr?.toLocaleString("es-AR")} ARS`
                      : `USD ${curso.precioUsd?.toLocaleString("en-US")}`}
                  </span>

                  <button
                    className="carrito-eliminar"
                    onClick={() => removerDelCarrito(curso.titulo)}
                  >
                    ✖
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="carrito-footer">
            <div className="carrito-moneda">
              <label>Elegí la moneda:</label>
              <select
                value={moneda}
                onChange={(e) => setMoneda(e.target.value)}
              >
                <option value="ARS">Pesos argentinos (ARS)</option>
                <option value="USD">Dólares estadounidenses (USD)</option>
              </select>
            </div>

            <p className="carrito-total">
              💰 Total:{" "}
              {moneda === "ARS"
                ? `$${total.toLocaleString("es-AR")} ARS`
                : `USD ${total.toLocaleString("en-US")}`}
            </p>

            <div
              className={`carrito-acciones ${
                moneda === "USD" ? "acciones-columna" : ""
              }`}
            >
              <button className="boton-vaciar" onClick={vaciarCarrito}>
                Vaciar Carrito
              </button>

              {moneda === "ARS" && (
                <button className="boton-pagar" onClick={manejarCompra}>
                  Pagar con Mercado Pago
                </button>
              )}

              {moneda === "USD" && (
                <div className="paypal-wrapper">
                  <p className="carrito-opcion-paypal">💳 Pagá con PayPal</p>
                  <div style={{ width: "100%" }}>
                    <BotonPaypal
                      precio={total.toFixed(2)}
                      descripcion={`Compra de ${carrito.length} curso(s)`}
                      cursos={carrito}
                      onAprobado={() => {
                        vaciarCarrito();
                        window.location.href = "/pago-exitoso";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
