// CampoCheckbox.jsx
export default function CampoCheckbox({
    label,
    name,
    checked,
    onChange,
    error,
    ...props
  }) {
    return (
      <label className={`checkbox ${error ? "campo-error" : ""}`}>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          {...props}
        />
        {label}
        {error && <span className="mensaje-error">{error}</span>}
      </label>
    );
  }
  