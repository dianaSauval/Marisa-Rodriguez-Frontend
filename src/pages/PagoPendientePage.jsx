import { Link } from "react-router-dom";
import SuccessMessage from "../components/SuccessMessage/SuccessMessage";

export default function PagoPendientePage() {
  return (
    <SuccessMessage
      icon="⏳"
      title="Tu pago está pendiente"
      subtitle="A veces la magia necesita unos momentos para manifestarse... ✨ Apenas se confirme tu pago, podrás ver tu compra en Mis Cursos."
    >
      <Link to="/mis-cursos">📚 Ir a mis cursos</Link>
    </SuccessMessage>
  );
}
