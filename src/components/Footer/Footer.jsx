import React from 'react';
import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-marisa">
      <div className="footer-container">
        <div className="footer-logo">
          <h2>Marisa Rodríguez</h2>
          <p>Conectando con tu luz interior</p>
        </div>

        <div className="footer-links">
          <a href="cursos">Cursos</a>
          <a href="clases-en-vivo">Clases en vivo</a>
          <a href="contacto">Contacto</a>          
        </div>

        <div className="footer-social">
          <a href="https://www.instagram.com/marisa.rodz/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="icon" /> marisa.rodz
          </a>
          <a href="https://wa.me/5491124596372?text=Hola!%20Quiero%20informacion%20sobre%20los%20cursos%20y%20las%20clases." target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="icon" /> WhatsApp
          </a>
          <a href="mailto:marisarodz@hotmail.com">
            <FaEnvelope className="icon" /> Email
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Diana Sauval - Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
