// SeccionVivo.jsx
import CampoBasico from "./CampoBasico";

export default function SeccionVivo({
  fechas,
  grupoWhatsapp,
  errores,
  onChangeFechas,
  onChangeWhatsapp,
}) {
  return (
    <div className="seccion-condicional">
      <CampoBasico
        label="Cantidad de clases"
        name="cantidadClases"
        type="number"
        value={fechas.cantidadClases}
        onChange={onChangeFechas}
        error={errores.cantidadClases}
      />

      <CampoBasico
        label="Duración de cada clase"
        name="duracionClase"
        type="text"
        value={fechas.duracionClase}
        onChange={onChangeFechas}
      />

      <CampoBasico
        label="Fecha de inicio"
        name="fechaInicio"
        type="date"
        value={fechas.fechaInicio?.slice(0, 10) || ""}
        onChange={onChangeFechas}
        error={errores.fechaInicio}
      />

      <CampoBasico
        label="Día de la semana"
        name="diaSemana"
        type="text"
        value={fechas.diaSemana}
        onChange={onChangeFechas}
        error={errores.diaSemana}
      />

      <CampoBasico
        label="Horario"
        name="horario"
        type="time"
        value={fechas.horario}
        onChange={onChangeFechas}
        error={errores.horario}
        min="07:00"
        max="22:00"
        step="60" // cada 15 minutos
      />

      <CampoBasico
        label="Link al grupo de WhatsApp"
        name="grupoWhatsapp"
        type="url"
        value={grupoWhatsapp}
        onChange={onChangeWhatsapp}
      />
    </div>
  );
}
