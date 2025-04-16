// CampoTemas.jsx
export default function CampoTemas({
  temas = [],
  onAgregar,
  onEliminar,
  onCambiarTema,
}) {
  return (
    <label className="temas-container">
      Temas que se van a ver
      {temas.map((tema, i) => (
        <div key={i} className="tema-item">
          <input
            type="text"
            value={tema}
            onChange={(e) => onCambiarTema(i, e.target.value)}
          />
          <button type="button" onClick={() => onEliminar(i)}>
            ❌
          </button>
        </div>
      ))}

      <button type="button" onClick={onAgregar} className="agregar-tema">
        ➕ Agregar tema
      </button>
    </label>
  );
}
