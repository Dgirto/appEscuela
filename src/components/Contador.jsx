// src/components/Contador.jsx
// Panel "Alumnos Seleccionados": mismo useState de siempre (sumar / restar).
import { useState } from 'react';
import { IconUsuarios, IconMas, IconMenos } from './Icons';

const Contador = ({ max }) => {
  // Inicializamos el estado en 0
  const [numero, setNumero] = useState(0);
  // Dirección del último cambio, solo para la animación del número
  const [direccion, setDireccion] = useState('');

  // Nunca baja de 0 ni supera el total de alumnos (aunque se eliminen alumnos)
  const valor = Math.min(numero, max);

  const restar = () => {
    setNumero(valor - 1);
    setDireccion('baja');
  };

  const sumar = () => {
    setNumero(valor + 1);
    setDireccion('sube');
  };

  return (
    <section className="panel" aria-labelledby="panel-titulo">
      <div className="panel__info">
        <span className="panel__icono">
          <IconUsuarios width={24} height={24} />
        </span>
        <div>
          <h2 id="panel-titulo" className="panel__titulo">Alumnos Seleccionados</h2>
          <p className="panel__texto">Ajusta la cantidad de alumnos seleccionados para la matrícula.</p>
        </div>
      </div>

      <div className="panel__control">
        <div className="panel__contador" aria-live="polite">
          <span key={`${valor}-${direccion}`} className={`panel__numero panel__numero--${direccion || 'inicio'}`}>
            {valor}
          </span>
          <span className="panel__de">de {max}</span>
        </div>

        <div className="panel__botones">
          <button
            type="button"
            className="btn btn--restar"
            onClick={restar}
            disabled={valor <= 0}
          >
            <IconMenos width={16} height={16} />
            Restar
          </button>
          <button
            type="button"
            className="btn btn--sumar"
            onClick={sumar}
            disabled={valor >= max}
          >
            <IconMas width={16} height={16} />
            Sumar
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contador;
