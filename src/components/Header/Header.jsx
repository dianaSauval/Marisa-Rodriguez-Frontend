import React, { useState } from "react";
import "./Header.css";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/img/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [animando] = useState(false);

  const { carrito } = useCart();
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuAbierto((estadoActual) => !estadoActual);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  const subirAlInicio = (smooth = false) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? "smooth" : "instant",
    });
  };

  const irAlInicio = () => {
    cerrarMenu();
    subirAlInicio(true);
  };

  const cerrarSesion = () => {
    logout();
    cerrarMenu();
    navigate("/");
    subirAlInicio();
  };

  const irALogin = () => {
    cerrarMenu();
    navigate("/login");
    subirAlInicio();
  };

  const enlaces = [
    { label: "Inicio", href: "/" },
    { label: "Sobre mí", href: "/about" },
    { label: "Cursos", href: "/cursos" },
    { label: "Clases en vivo", href: "/clases-en-vivo" },
    { label: "Contacto", href: "/contacto" },
    ...(usuario ? [{ label: "Mis cursos", href: "/mis-cursos" }] : []),
    ...(usuario?.rol === "admin"
      ? [{ label: "Panel Admin", href: "/admin" }]
      : []),
  ];

  const manejarClickEnlace = (href) => {
    cerrarMenu();

    // Necesario cuando ya estamos en Inicio y volvemos a pulsar Inicio.
    if (href === "/") {
      subirAlInicio(true);
    }
  };

  return (
    <header className="header">
      {/* Logo */}
      <Link to="/" className="header__logo" onClick={irAlInicio}>
        <img src={logo} alt="Marisa Rodríguez" />
      </Link>

      {/* Menú hamburguesa */}
      <button
        type="button"
        className="header__menu-icon"
        onClick={toggleMenu}
        aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuAbierto}
      >
        {menuAbierto ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navegación desktop */}
      <nav className="header__nav">
        {enlaces.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            onClick={() => manejarClickEnlace(link.href)}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Acciones desktop */}
      <div className="header__actions">
        <Link
          to="/carrito"
          className="carrito-link"
          title="Ver carrito"
          onClick={cerrarMenu}
        >
          <FaShoppingCart
            className={`carrito-icono ${animando ? "animado" : ""}`}
          />

          {carrito.length > 0 && (
            <span className="carrito-contador">{carrito.length}</span>
          )}
        </Link>

        {usuario ? (
          <button
            type="button"
            className="btn-sesion cerrar"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
        ) : (
          <button type="button" className="btn-sesion" onClick={irALogin}>
            Iniciar sesión
          </button>
        )}
      </div>

      {/* Navegación mobile */}
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
          >
            {enlaces.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => manejarClickEnlace(link.href)}
              >
                {link.label}
              </Link>
            ))}

            <div className="mobile-actions">
              <Link
                to="/carrito"
                className="carrito-link"
                title="Ver carrito"
                onClick={cerrarMenu}
              >
                <FaShoppingCart className="carrito-icono" />

                {carrito.length > 0 && (
                  <span className="carrito-contador">{carrito.length}</span>
                )}
              </Link>

              {usuario ? (
                <button
                  type="button"
                  className="btn-sesion cerrar"
                  onClick={cerrarSesion}
                >
                  Cerrar sesión
                </button>
              ) : (
                <button type="button" className="btn-sesion" onClick={irALogin}>
                  Iniciar sesión
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
