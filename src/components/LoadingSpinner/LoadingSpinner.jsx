// src/components/LoadingSpinner/LoadingSpinner.jsx
import React from "react";
import "./LoadingSpinner.css";

export default function LoadingSpinner({ texto = "Cargando..." }) {
  return (
    <div className="loading-spinner-container">
      <div className="spinner" />
      <p className="loading-texto">{texto}</p>
    </div>
  );
}
