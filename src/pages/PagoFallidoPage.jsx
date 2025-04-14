import { Link } from "react-router-dom";
import SuccessMessage from "../components/SuccessMessage/SuccessMessage";

export default function PagoFallidoPage() {
  return (
    <SuccessMessage
      icon="😔"
      title="El pago no se pudo completar"
      subtitle="Algo interfirió en el camino... Podés intentarlo nuevamente o probar otro método de pago 🕯️"
    >
      <Link to="/carrito">🔁 Volver al carrito</Link>
    </SuccessMessage>
  );
}
