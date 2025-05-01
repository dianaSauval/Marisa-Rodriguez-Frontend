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
  const [animando, setAnimando] = useState(false);
  const { carrito } = useCart();
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const cerrarSesion = () => {
    logout();
    navigate("/");
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

  return (
    <header className="header">
      {/* Logo */}
      <div className="header__logo">
        <img src={logo} alt="Marisa Rodríguez" />
      </div>

      {/* Menú Hamburguesa (mobile) */}
      <div className="header__menu-icon" onClick={toggleMenu}>
        {menuAbierto ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navegación - desktop */}
      <nav className="header__nav">
        {enlaces.map((link) => (
          <Link key={link.href} to={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Acciones a la derecha */}
      <div className="header__actions">
        <Link to="/carrito" className="carrito-link" title="Ver carrito">
          <FaShoppingCart
            className={`carrito-icono ${animando ? "animado" : ""}`}
          />
          {carrito.length > 0 && (
            <span className="carrito-contador">{carrito.length}</span>
          )}
        </Link>

        {usuario ? (
          <button className="btn-sesion cerrar" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        ) : (
          <button
            className="btn-sesion"
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </button>
        )}
      </div>

      {/* Navegación Mobile */}
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
              <Link key={link.href} to={link.href} onClick={toggleMenu}>
                {link.label}
              </Link>
            ))}
            <div className="mobile-actions">
              <Link to="/carrito" onClick={toggleMenu}>
                <button className="carrito-btn">
                  <FaShoppingCart />
                </button>
              </Link>
              {usuario ? (
                <button className="btn-sesion cerrar" onClick={cerrarSesion}>
                  Cerrar sesión
                </button>
              ) : (
                <button
                  className="btn-sesion"
                  onClick={() => {
                    toggleMenu();
                    navigate("/login");
                  }}
                >
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