// src/components/SuccessMessage/SuccessMessage.jsx
import "./SuccessMessage.css";

export default function SuccessMessage({ title, subtitle, icon = "✅", children }) {
  return (
    <div className="success-message-container">
      <div className="success-message-card">
        <div className="success-message-icon">{icon}</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {children}
      </div>
    </div>
  );
}
