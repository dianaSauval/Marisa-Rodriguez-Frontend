import { useCart } from "../context/CartContext";
import "../assets/styles/pages/CarritoPage.css";
import EmptyState from "../components/EmptyState/EmptyState";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import BotonPaypal from "../components/BotonPaypal/BotonPaypal";

export default function CarritoPage() {
  const [moneda] = useState("USD");

  const { carrito, removerDelCarrito, vaciarCarrito } = useCart();
  const { usuario } = useAuth();

  const total = carrito.reduce((acc, curso) => {
    const precio = curso.precioUsd;
    return acc + (typeof precio === "number" ? precio : 0);
  }, 0);

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
          title="Aún no has elegido ningún curso"
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
                    USD {curso.precioUsd?.toLocaleString("en-US")}
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
            <p className="carrito-total">
              💰 Total: USD {total.toLocaleString("en-US")}
            </p>

            <div className="carrito-acciones acciones-columna">
              <button className="boton-vaciar" onClick={vaciarCarrito}>
                Vaciar carrito
              </button>

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
            </div>
          </div>
        </>
      )}
    </div>
  );
}