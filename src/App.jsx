// src/App.jsx
import { useState } from 'react';
import Navbar from './components/Navbar';
import AlumnoCard from './components/AlumnoCard';
import Contador from './components/Contador';
import ConfirmDialog from './components/ConfirmDialog';
import { IconUsuarios, IconVacio } from './components/Icons';
import { alumnosIniciales } from './data/alumnos';

function App() {
  const [alumnos, setAlumnos] = useState(alumnosIniciales);
  const [alumnoAEliminar, setAlumnoAEliminar] = useState(null);

  const pedirEliminar = (id) => {
    setAlumnoAEliminar(alumnos.find((a) => a.id === id) ?? null);
  };

  const confirmarEliminar = () => {
    setAlumnos((actuales) => actuales.filter((a) => a.id !== alumnoAEliminar.id));
    setAlumnoAEliminar(null);
  };

  return (
    <>
      <Navbar />

      <main className="app-container app-main">
        {/* Encabezado */}
        <section className="encabezado">
          <div>
            <h1 className="encabezado__titulo">Directorio de alumnos</h1>
            <p className="encabezado__subtitulo">
              Gestiona las matrículas y consulta el estado de tus alumnos
            </p>
          </div>
          <div className="encabezado__total" aria-label={`${alumnos.length} alumnos registrados`}>
            <IconUsuarios width={18} height={18} />
            <strong>{alumnos.length}</strong>
            <span>alumnos registrados</span>
          </div>
        </section>

        {/* Directorio */}
        {alumnos.length > 0 ? (
          <section className="directorio" aria-label="Listado de alumnos">
            {alumnos.map((alumno) => (
              <AlumnoCard
                key={alumno.id}
                id={alumno.id}
                nombre={alumno.nombre}
                carrera={alumno.carrera}
                estadoInicial={alumno.estado}
                foto={alumno.foto}
                onEliminar={pedirEliminar}
              />
            ))}
          </section>
        ) : (
          <section className="vacio">
            <IconVacio />
            <h2>No hay alumnos registrados</h2>
            <p>Cuando se registren alumnos aparecerán aquí.</p>
          </section>
        )}

        {/* Panel de selección: siempre debajo del directorio */}
        <Contador max={alumnos.length} />
      </main>

      {alumnoAEliminar && (
        <ConfirmDialog
          titulo="¿Eliminar alumno?"
          mensaje={`Se eliminará a ${alumnoAEliminar.nombre} del directorio. Esta acción no se puede deshacer.`}
          onConfirmar={confirmarEliminar}
          onCancelar={() => setAlumnoAEliminar(null)}
        />
      )}
    </>
  );
}

export default App;
