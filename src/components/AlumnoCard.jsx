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
const AlumnoCard = ({ id, nombre, carrera, estadoInicial, foto, onEliminar }) => {
  const [estado, setEstado] = useState(estadoInicial);
  // Si la foto no carga (sin internet, enlace roto) se muestran las iniciales
  const [fotoFallida, setFotoFallida] = useState(false);

  const esMatriculado = estado === 'Matriculado';

  const cambiarEstado = () => {
    setEstado(esMatriculado ? 'Inactivo' : 'Matriculado');
  };

  return (
    <article className="alumno-card">
      <div className="alumno-card__top">
        <div
          className={`alumno-card__avatar avatar-${(id % 5) + 1}`}
          aria-hidden="true"
        >
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

      <div className="alumno-card__footer">
        <span
          className={`estado-badge ${esMatriculado ? 'estado-badge--ok' : 'estado-badge--off'}`}
          aria-live="polite"
        >
          <span className="estado-badge__dot" aria-hidden="true" />
          {estado}
        </span>

        <div className="alumno-card__acciones">
          <button
            type="button"
            className="btn-accion btn-accion--primario"
            onClick={cambiarEstado}
            aria-label={`Cambiar estado de ${nombre}`}
          >
            <IconCambiar width={15} height={15} />
            Cambiar estado
          </button>
          <button
            type="button"
            className="btn-accion btn-accion--peligro"
            onClick={() => onEliminar(id)}
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
