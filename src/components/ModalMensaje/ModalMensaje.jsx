// src/components/ModalMensaje/ModalMensaje.jsx
import "./ModalMensaje.css";

export default function ModalMensaje({ titulo, subtitulo, onClose, isClosing }) {

  return (
    <div
      className={`modal-overlay ${isClosing ? "fadeOut" : "fadeIn"}`}
      onClick={onClose}
    >
      <div
        className={`modal-mensaje ${isClosing ? "zoomOut" : "zoomIn"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="modal-icon">✨</span>
        <h2>{titulo}</h2>
        <p>{subtitulo}</p>
        <button className="modal-boton" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
