// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from "../MKBox";
import MKTypography from "../MKTypography";

function RotatingCardFront({ color, image, icon, title, description }) {
  return (
    <MKBox 
      display="flex"
      justifyContent="center"
      alignContent="center"
      borderRadius="lg"
      width="250px"
      height="350px"
      position="relative"
      zIndex={2}
      sx={{
        backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) =>
          `${linearGradient(
            rgba(gradients[color] ? gradients[color].main : gradients.info.main, 0),
            rgba(gradients[color] ? gradients[color].main : gradients.info.main, 0)
          )}, url(${image})`,
        backgroundSize:"cover",
        backgroundPosition: "center top",
        backfaceVisibility: "hidden",
        borderRadius: "8px", // Bordes redondeados en el fondo
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Sombra suave
      }}
    >
      {/* Filtro amarillo con opacidad */}
      <MKBox
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        sx={{
          backgroundColor: "rgba(82, 38, 95, 0)", // Transparencia amarilla
          borderRadius: "8px",
        }}
      />
      <MKBox py={4} px={3} textAlign="center" lineHeight={1} position="relative" zIndex={3}>
        {icon && (
          <MKTypography variant="h2" color="white" my={2}>
            {typeof icon === "string" ? <Icon>{icon}</Icon> : icon}
          </MKTypography>
        )}
        <MKTypography variant="h4" color="white" gutterBottom sx={{ marginTop: "13px" }}>
          {title}
        </MKTypography>
        <MKTypography variant="body2" color="white" opacity={0.8}>
          {description}
        </MKTypography>
      </MKBox>
    </MKBox>
  );
}

// Setting default props for the RotatingCardFront
RotatingCardFront.defaultProps = {
  color: "info",
  icon: "",
};

// Typechecking props for the RotatingCardFront
RotatingCardFront.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  image: PropTypes.string.isRequired,
  icon: PropTypes.node,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
};

export default RotatingCardFront;
