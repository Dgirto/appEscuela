// src/App.jsx
import { useLayoutEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import AlumnoCard from './components/AlumnoCard';
import Contador from './components/Contador';
import ConfirmDialog from './components/ConfirmDialog';
import { alumnosIniciales } from './data/alumnos';

const sinAnimaciones = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function App() {
  const [alumnos, setAlumnos] = useState(alumnosIniciales);
  const [alumnoAEliminar, setAlumnoAEliminar] = useState(null);
  const [saliendoId, setSaliendoId] = useState(null);

  // Referencias a cada card para animar la reorganización (técnica FLIP)
  const cards = useRef(new Map());
  const posiciones = useRef(new Map());

  const registrarCard = (id) => (el) => {
    if (el) cards.current.set(id, el);
    else cards.current.delete(id);
  };

  // Tras eliminar, cada card se desliza suavemente desde su posición anterior
  useLayoutEffect(() => {
    if (posiciones.current.size === 0) return;
    if (!sinAnimaciones()) {
      cards.current.forEach((el, id) => {
        const antes = posiciones.current.get(id);
        if (!antes) return;
        const ahora = el.getBoundingClientRect();
        const dx = antes.left - ahora.left;
        const dy = antes.top - ahora.top;
        if (dx || dy) {
          el.animate(
            [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }],
            { duration: 380, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }
          );
        }
      });
    }
    posiciones.current.clear();
  }, [alumnos]);

  const pedirEliminar = (id) => {
    setAlumnoAEliminar(alumnos.find((a) => a.id === id) ?? null);
  };

  const quitarAlumno = (id) => {
    cards.current.forEach((el, key) => posiciones.current.set(key, el.getBoundingClientRect()));
    setAlumnos((actuales) => actuales.filter((a) => a.id !== id));
    setSaliendoId(null);
  };

  const confirmarEliminar = () => {
    const id = alumnoAEliminar.id;
    setAlumnoAEliminar(null);
    // Primero la card se desvanece; al terminar su animación se quita del listado
    if (sinAnimaciones()) quitarAlumno(id);
    else setSaliendoId(id);
  };

  return (
    <>
      <Navbar />

      <main className="contenedor principal">
        <header className="encabezado">
          <h1 className="encabezado__titulo">Directorio de Alumnos</h1>
          <p className="encabezado__texto">
            Consulta a los alumnos registrados y gestiona su estado de matrícula.
          </p>
        </header>

        {alumnos.length > 0 ? (
          <section className="directorio" aria-label="Listado de alumnos">
            {alumnos.map((alumno, indice) => (
              <AlumnoCard
                key={alumno.id}
                id={alumno.id}
                nombre={alumno.nombre}
                carrera={alumno.carrera}
                estadoInicial={alumno.estado}
                foto={alumno.foto}
                indice={indice}
                saliendo={saliendoId === alumno.id}
                cardRef={registrarCard(alumno.id)}
                onEliminar={pedirEliminar}
                onSalidaTerminada={quitarAlumno}
              />
            ))}
          </section>
        ) : (
          <p className="vacio">No hay alumnos en el directorio.</p>
        )}

        <Contador max={alumnos.length} />
      </main>

      {alumnoAEliminar && (
        <ConfirmDialog
          titulo="¿Eliminar alumno?"
          mensaje={`Se eliminará a ${alumnoAEliminar.nombre} del directorio.`}
          onConfirmar={confirmarEliminar}
          onCancelar={() => setAlumnoAEliminar(null)}
        />
      )}
    </>
  );
}

export default App;
