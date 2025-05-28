import React from "react";
import "./NotFoundPage.css";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">
        Uy... parece que esta página no existe en nuestro universo 🌌
      </p>
      <Link to="/" className="not-found-button">
        Volver al inicio
      </Link>
    </div>
  );
}
