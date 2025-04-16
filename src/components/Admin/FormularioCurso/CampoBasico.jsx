// CampoBasico.jsx
export default function CampoBasico({
    label,
    name,
    value,
    onChange,
    type = "text",
    error,
    hint = "",
    required = false,
    ...props
  }) {
    return (
      <label className={error ? "campo-error" : ""}>
        {label}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          {...props}
        />
        {hint && <small>{hint}</small>}
        {error && <span className="mensaje-error">{error}</span>}
      </label>
    );
  }
  