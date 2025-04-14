import { useState } from "react";
import ModalMensaje from "../components/ModalMensaje/ModalMensaje";
import { useNavigate } from "react-router-dom";

export default function useModalMensaje() {
  const [modalData, setModalData] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [onExtraClose, setOnExtraClose] = useState(null);
  const navigate = useNavigate();

  const openModal = ({ titulo, subtitulo, redirectTo = "/", onCloseExtra = null }) => {
    setModalData({ titulo, subtitulo, redirectTo });
    setOnExtraClose(() => onCloseExtra); // ✅ guardamos correctamente la función
    setIsClosing(false);
  };

  const closeModal = ({ redirect = true, delay = 1000 } = {}) => {
    setIsClosing(true);
    setTimeout(() => {
      if (redirect && modalData?.redirectTo) {
        navigate(modalData.redirectTo);
      } else if (redirect) {
        navigate("/");
      }

      if (onExtraClose) {
        onExtraClose(); // ✅ ejecutamos solo si existe
        setOnExtraClose(null); // ✨ opcional: limpiamos luego
      }

      setModalData(null);
    }, delay);
  };

  const Modal = modalData ? (
    <ModalMensaje
      titulo={modalData.titulo}
      subtitulo={modalData.subtitulo}
      onClose={() => closeModal({ redirect: false })} // 👈 se ejecuta al cerrar manualmente
      isClosing={isClosing}
    />
  ) : null;

  return {
    Modal,
    openModal,
    closeModal,
    isOpen: !!modalData,
  };
}
