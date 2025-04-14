import PropTypes from "prop-types";

// Material Kit 2 React components
import MKBox from "../MKBox";
import MKTypography from "../MKTypography";
import { Link } from "react-router-dom";
// import MKButton from "../../MKButton";

function RotatingCard({
  color,
  image,
  title,
  description,
  extraInfo,
  description2 , action ,
}) {
  return (
    <MKBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="lg"
      coloredShadow={color}
      position="absolute"
      width="100%"
      height="100%"
      top={0}
      left={0}
      zIndex={5}
      sx={{
        backgroundImage: ({
          palette: { gradients },
          functions: { linearGradient, rgba },
        }) =>
          `${linearGradient(
            rgba(
              gradients[color] ? gradients[color].main : gradients.info.main,
              0.85
            ),
            rgba(
              gradients[color] ? gradients[color].main : gradients.info.main,
              0.85
            )
          )}, url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
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
          backgroundColor: "rgba(46, 26, 61, 0.9)",
          borderRadius: "8px",
        }}
      />
      <MKBox
        width="100%"
        backgroundColor="rgba(46, 26, 61, 0.9)"
        borderRadius="8px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        pt={2}
        pb={2}
        px={2}
        textAlign="center"
        lineHeight={1}
        height="100%"
        position="relative"
        zIndex={3}
      >
        <MKTypography variant="h4" color="white" gutterBottom>
          {title}
        </MKTypography>
        <MKTypography variant="h5" color="white" opacity={0.8}>
          {extraInfo}
        </MKTypography>
        <MKTypography variant="body2" color="white" opacity={0.8}>
          {description}
        </MKTypography>
        <MKTypography variant="body2" color="white" opacity={0.8}>
          {description2}
        </MKTypography>
        {/* Uncomment the following block if you want to use the action button */}

        <MKBox width="50%" mt={4} mb={2} mx="auto">
          <Link to={action.route}>
            <button className="button-RotatingCard">Ver cursos</button>
          </Link>
        </MKBox>
      </MKBox>
    </MKBox>
  );
}

// Setting default props for the RotatingCard
RotatingCard.defaultProps = {
  color: "info",
};

// Typechecking props for the RotatingCard
RotatingCard.propTypes = {
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
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  /* 
  Commented out since action is not being used
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  */
};

export default RotatingCard;
