// components/Admin/FormularioCurso/CampoPDFs.jsx
import { CSSTransition, TransitionGroup } from "react-transition-group";
import React, { useRef } from "react";

export default function CampoPDFs({ pdfs, setPDFs, errores = {} }) {
  const manejarCambio = (index, campo, valor) => {
    const nuevos = [...pdfs];
    nuevos[index][campo] = valor;
    setPDFs(nuevos);
  };

  const eliminarPDF = (index) => {
    const nuevos = [...pdfs];
    nuevos.splice(index, 1);
    setPDFs(nuevos);
  };

  const agregarPDF = () => {
    setPDFs([...pdfs, { titulo: "", url: "" }]);
  };

  const nodeRefs = useRef([]);

  return (
    <div className="campo-pdfs">
      <h3 className="pdfs-titulo">
        📄 Material en PDF <span>(opcional)</span>
      </h3>
      <p className="pdfs-subtexto">
        Si querés, podés compartir links a materiales de apoyo. Asegurate de que estén en Google Drive y sean públicos.
      </p>

      <TransitionGroup className="pdf-lista">
        {pdfs.map((pdf, index) => {
          if (!nodeRefs.current[index]) {
            nodeRefs.current[index] = React.createRef();
          }

          return (
            <CSSTransition
              key={index}
              nodeRef={nodeRefs.current[index]}
              timeout={300}
              classNames="fade"
            >
              <div ref={nodeRefs.current[index]} className="pdf-item">
                <div className={errores[`pdfs.${index}.titulo`] ? "campo-error" : ""}>
                  <label>
                    Título del PDF
                    <input
                      type="text"
                      value={pdf.titulo}
                      onChange={(e) => manejarCambio(index, "titulo", e.target.value)}
                    />
                    {errores[`pdfs.${index}.titulo`] && (
                      <span className="mensaje-error">{errores[`pdfs.${index}.titulo`]}</span>
                    )}
                  </label>
                </div>

                <div className={errores[`pdfs.${index}.url`] ? "campo-error" : ""}>
                  <label>
                    Link de Google Drive
                    <input
                      type="url"
                      value={pdf.url}
                      onChange={(e) => manejarCambio(index, "url", e.target.value)}
                    />
                    {errores[`pdfs.${index}.url`] && (
                      <span className="mensaje-error">{errores[`pdfs.${index}.url`]}</span>
                    )}
                  </label>
                </div>

                <button
                  type="button"
                  className="boton-eliminar"
                  onClick={() => eliminarPDF(index)}
                >
                  ❌
                </button>
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>

      <button type="button" className="agregar-tema" onClick={agregarPDF}>
        ➕ Agregar PDF
      </button>
    </div>
  );
}
