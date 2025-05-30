import { Link } from "react-router-dom";
import { useState } from "react";

function AlumnList({ alumnos, manejarEditar, eliminarAlumno }) {
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  return (
    <div className="app-container">
      <h2>Lista de Alumnos</h2>
      <Link to="/agregar">
        <button>Agregar Alumno</button>
      </Link>

      <ul>
        {alumnos.map((a) => (
          <li key={a.libreta} className="alumno-item">
            <div>
              {a.nombre} {a.apellido} - {a.curso} - {a.email}
            </div>

            <div>
              <Link to={`/editar/${a.libreta}`}>
                <button>Editar</button>
              </Link>
              <button onClick={() => eliminarAlumno(a.libreta)}>Eliminar</button>
              <button
                onClick={() =>
                  setAlumnoSeleccionado(
                    alumnoSeleccionado?.libreta === a.libreta ? null : a
                  )
                }
              >
                {alumnoSeleccionado?.libreta === a.libreta
                  ? "Cerrar Detalle"
                  : "Detalle Alumno"}
              </button>
            </div>

            {alumnoSeleccionado && alumnoSeleccionado.libreta === a.libreta && (
              <div className="alumno-detalle">
                <p><strong>Nombre:</strong> {alumnoSeleccionado.nombre}</p>
                <p><strong>Apellido:</strong> {alumnoSeleccionado.apellido}</p>
                <p><strong>Curso:</strong> {alumnoSeleccionado.curso}</p>
                <p><strong>Email:</strong> {alumnoSeleccionado.email}</p>
                <p><strong>Domicilio:</strong> {alumnoSeleccionado.domicilio}</p>
                <p><strong>Teléfono:</strong> {alumnoSeleccionado.telefono}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlumnList;
