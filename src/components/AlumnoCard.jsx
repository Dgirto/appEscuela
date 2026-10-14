// src/components/AlumnoCard.jsx
import { useState } from 'react';
import { IconCambiar, IconPapelera } from './Icons';

// Iniciales para el avatar (máximo 2 letras)
const obtenerIniciales = (nombre) =>
  nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join('');

// 'estadoInicial' entra como Prop; el estado vive dentro de la card (useState)
const AlumnoCard = ({ id, nombre, carrera, estadoInicial, foto, indice, saliendo, cardRef, onEliminar, onSalidaTerminada }) => {
  const [estado, setEstado] = useState(estadoInicial);
  const [pulso, setPulso] = useState(false);
  // Si la foto no carga (sin internet, enlace roto) se muestran las iniciales
  const [fotoFallida, setFotoFallida] = useState(false);

  const esMatriculado = estado === 'Matriculado';

  const cambiarEstado = () => {
    setEstado(esMatriculado ? 'Inactivo' : 'Matriculado');
    setPulso(true);
  };

  return (
    <article
      ref={cardRef}
      className={`alumno-card${saliendo ? ' alumno-card--saliendo' : ''}`}
      style={{ '--i': indice }}
      onAnimationEnd={(e) => {
        if (saliendo && e.target === e.currentTarget) onSalidaTerminada(id);
      }}
    >
      <div className="alumno-card__cabecera">
        <div className={`alumno-card__avatar avatar-${(id % 6) + 1}`} aria-hidden="true">
          {foto && !fotoFallida ? (
            <img
              src={foto}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setFotoFallida(true)}
            />
          ) : (
            obtenerIniciales(nombre)
          )}
        </div>
        <div className="alumno-card__info">
          <h3 className="alumno-card__nombre">{nombre}</h3>
          <p className="alumno-card__carrera">{carrera}</p>
        </div>
      </div>

      <div className="alumno-card__pie">
        <span
          className={`estado ${esMatriculado ? 'estado--ok' : 'estado--off'}${pulso ? ' estado--pulso' : ''}`}
          onAnimationEnd={() => setPulso(false)}
          role="status"
          aria-live="polite"
        >
          <span className="estado__punto" aria-hidden="true" />
          {estado}
        </span>

        <div className="alumno-card__acciones">
          <button
            type="button"
            className="btn btn--secundario"
            onClick={cambiarEstado}
            disabled={saliendo}
            aria-label={`Cambiar estado de ${nombre}`}
          >
            <IconCambiar width={15} height={15} />
            Cambiar Estado
          </button>
          <button
            type="button"
            className="btn btn--peligro"
            onClick={() => onEliminar(id)}
            disabled={saliendo}
            aria-label={`Eliminar a ${nombre}`}
          >
            <IconPapelera width={15} height={15} />
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
};

export default AlumnoCard;
