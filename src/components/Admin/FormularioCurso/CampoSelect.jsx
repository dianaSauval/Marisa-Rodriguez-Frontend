// CampoSelect.jsx
export default function CampoSelect({
    label,
    name,
    value,
    onChange,
    opciones = [],
    error,
    hint = "",
    required = false,
    ...props
  }) {
    return (
      <label className={error ? "campo-error" : ""}>
        {label}
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          {...props}
        >
          <option value="">Seleccioná una opción</option>
          {opciones.map((opcion) => (
            <option key={opcion.value} value={opcion.value}>
              {opcion.label}
            </option>
          ))}
        </select>
        {hint && <small>{hint}</small>}
        {error && <span className="mensaje-error">{error}</span>}
      </label>
    );
  }
  