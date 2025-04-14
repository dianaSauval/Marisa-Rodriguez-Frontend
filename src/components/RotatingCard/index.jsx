import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// @mui material components

// Material Kit 2 React components
import MKBox from "../MKBox";
import { Card } from "@mui/material";

function RotatingCard({ children }) {
  const [rotate, setRotate] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si estamos en móvil
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768); // Ajusta el valor según tu necesidad
    checkMobile();
    window.addEventListener("resize", checkMobile); // Añadir evento para actualización en cambio de tamaño
    return () => window.removeEventListener("resize", checkMobile); // Limpiar cuando el componente se desmonte
  }, []);

  // Función que cambia la rotación cuando se hace click en mobile
  const handleClick = () => {
    if (isMobile) {
      setRotate(!rotate); // Cambia el estado de rotación en mobile
    }
  };

  // Funciones para el hover en desktop
  const rotate0 = () => {
    if (!isMobile) {
      setRotate(false); // Función de hover para desktop
    }
  };

  const rotate180 = () => {
    if (!isMobile) {
      setRotate(true); // Función de hover para desktop
    }
  };

  return (
    <MKBox
      sx={{ perspective: "50rem" }}
      onClick={handleClick} // Activamos el click para mobile
      onMouseEnter={!isMobile ? rotate180 : undefined} // Solo se activa el hover si no es mobile
      onMouseLeave={!isMobile ? rotate0 : undefined} // Solo se activa el hover si no es mobile
    >
      <Card
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          position: "relative",
          transform: rotate ? "rotateY(180deg)" : "rotateY(0)",
          transformStyle: "preserve-3d",
          transition: "all 0.8s cubic-bezier(0.34, 1.45, 0.7, 1)",
        }}
      >
        {children}
      </Card>
    </MKBox>
  );
}

// Typechecking props for the RotatingCard
RotatingCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RotatingCard;
