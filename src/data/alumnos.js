// src/data/alumnos.js
// Datos iniciales del directorio. Cada alumno tiene un id estable y único.
// 'foto' usa retratos públicos de randomuser.me (https://randomuser.me/photos).
// Si la imagen no carga, la card muestra automáticamente las iniciales.
const foto = (genero, n) => `https://randomuser.me/api/portraits/${genero}/${n}.jpg`;

export const alumnosIniciales = [
  { id: 1, nombre: 'Daniel Puccio', carrera: 'Desarrollo de Software', estado: 'Matriculado', foto: foto('men', 32) },
  { id: 2, nombre: 'Maria Perez', carrera: 'Diseño Gráfico', estado: 'Inactivo', foto: foto('women', 44) },
  { id: 3, nombre: 'Carlos Mendoza', carrera: 'Administración Industrial', estado: 'Matriculado', foto: foto('men', 45) },
  { id: 4, nombre: 'Andrea Torres', carrera: 'Ingeniería de Software', estado: 'Matriculado', foto: foto('women', 65) },
  { id: 5, nombre: 'Luis Ramírez', carrera: 'Redes y Comunicaciones', estado: 'Inactivo', foto: foto('men', 75) },
  { id: 6, nombre: 'Valeria Castillo', carrera: 'Ciberseguridad', estado: 'Matriculado', foto: foto('women', 68) },
  { id: 7, nombre: 'Diego Fernández', carrera: 'Administración de Empresas', estado: 'Matriculado', foto: foto('men', 12) },
  { id: 8, nombre: 'Camila Rojas', carrera: 'Diseño y Desarrollo Web', estado: 'Inactivo', foto: foto('women', 26) },
  { id: 9, nombre: 'Sebastián Flores', carrera: 'Soporte y Mantenimiento de Equipos', estado: 'Matriculado', foto: foto('men', 52) },
];
