// src/components/ConfirmDialog.jsx
import { useEffect, useRef } from 'react';

const ConfirmDialog = ({ titulo, mensaje, textoConfirmar = 'Eliminar', onConfirmar, onCancelar }) => {
  const botonCancelar = useRef(null);

  useEffect(() => {
    // Foco inicial en la opción segura y cierre con Escape
    botonCancelar.current?.focus();
    const alPulsar = (e) => {
      if (e.key === 'Escape') onCancelar();
    };
    document.addEventListener('keydown', alPulsar);
    return () => document.removeEventListener('keydown', alPulsar);
  }, [onCancelar]);

  return (
    <div className="dialogo-fondo" onClick={onCancelar}>
      <div
        className="dialogo"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialogo-titulo"
        aria-describedby="dialogo-mensaje"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="dialogo-titulo" className="dialogo__titulo">{titulo}</h2>
        <p id="dialogo-mensaje" className="dialogo__mensaje">{mensaje}</p>
        <div className="dialogo__botones">
          <button
            type="button"
            ref={botonCancelar}
            className="btn btn--neutro"
            onClick={onCancelar}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn--confirmar-peligro"
            onClick={onConfirmar}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
