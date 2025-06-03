import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function DetalleAlumno({ alumnos }) {
  const { libreta } = useParams();
  const idNum = Number(libreta);
  const alumno = alumnos.find(a => a.libreta === idNum);

  if (!alumno) {
    return (
      <div>
        <h2>Alumno no encontrado</h2>
        <Link to="/listaalumnos">
          <button>Volver a la lista</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <h2>Detalle del Alumno</h2>
      <p><strong>LU:</strong> {alumno.libreta}</p>
      <p><strong>Nombre:</strong> {alumno.nombre}</p>
      <p><strong>Apellido:</strong> {alumno.apellido}</p>
      <p><strong>Curso:</strong> {alumno.curso}</p>
      <p><strong>Email:</strong> {alumno.email}</p>
      <p><strong>Domicilio:</strong> {alumno.domicilio}</p>
      <p><strong>Teléfono:</strong> {alumno.telefono}</p>

      <Link to="/listaalumnos">
        <button>Volver a la lista</button>
      </Link>
    </div>
  );
}
