// src/components/Contador.jsx
// Panel "Resumen de selección": mismo useState de siempre (sumar / restar).
import { useState } from 'react';
import { IconUsuarios, IconMas, IconMenos } from './Icons';

const Contador = ({ max }) => {
  // Inicializamos el estado en 0
  const [numero, setNumero] = useState(0);

  // Si se eliminan alumnos, el valor mostrado nunca supera el total disponible
  const valor = Math.min(numero, max);

  return (
    <section className="resumen" aria-labelledby="resumen-titulo">
      <div className="resumen__info">
        <div className="resumen__icono">
          <IconUsuarios width={26} height={26} />
        </div>
        <div>
          <h2 id="resumen-titulo" className="resumen__titulo">Resumen de selección</h2>
          <p className="resumen__texto">
            Lleva la cuenta de los alumnos que seleccionas para realizar gestiones
            de matrícula. El valor va de 0 hasta el total de alumnos registrados.
          </p>
        </div>
      </div>

      <div className="resumen__control">
        <div className="resumen__contador" aria-live="polite">
          <span className="resumen__numero">{valor}</span>
          <span className="resumen__de">de {max} alumnos seleccionados</span>
        </div>

        <div className="resumen__botones">
          <button
            type="button"
            className="btn-resumen btn-resumen--secundario"
            onClick={() => setNumero(valor - 1)}
            disabled={valor <= 0}
            aria-label="Restar un alumno seleccionado"
          >
            <IconMenos width={18} height={18} />
            Restar
          </button>
          <button
            type="button"
            className="btn-resumen btn-resumen--primario"
            onClick={() => setNumero(valor + 1)}
            disabled={valor >= max}
            aria-label="Sumar un alumno seleccionado"
          >
            <IconMas width={18} height={18} />
            Sumar
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contador;
