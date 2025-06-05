  import React from 'react';
  import { Link } from 'react-router-dom';

export default function AlumnList({
  alumnos,
  eliminarAlumno,
  mensajeExito,
  clearMensaje
}) {
  return (
    <div className="list-container">
      {/* Mensaje de éxito: siempre en la parte superior */}
      {mensajeExito && (
        <div className="success-message">
          {mensajeExito}
          <button className="close-message" onClick={clearMensaje}>
            ×
          </button>
        </div>
      )}

      <h2>Lista de Alumnos</h2>
      {/* Si no hay alumnos, muestro mensaje” */}
      {alumnos.length === 0 ? (
        <p>No hay alumnos ingresados.</p>
      ) : (
        /* 3) Si hay alumnos, muestro la lista */
        <ul>
          {alumnos.map(a => (
            <li key={a.libreta} className="alumno-item">
              <div className="alumno-info">
                <strong>
                  {a.nombre} {a.apellido}
                </strong>{' '}
                — LU: {a.libreta}
              </div>
              <div className="alumno-actions">
                <Link to={`/detalle/${a.libreta}`}>
                  <button>Ver Detalles</button>
                </Link>
                <Link to={`/editar/${a.libreta}`}>
                  <button>Editar</button>
                </Link>
                <button
                  onClick={() => {
                    const confirmar = window.confirm(
                      `¿Seguro que querés eliminar a ${a.nombre} ${a.apellido}?`
                    );
                    if (confirmar) {
                      eliminarAlumno(a.libreta);
                    }
                  }}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
        <div className='agregar-container'>
          <Link to="/agregar">
          <button>Agregar Alumno</button>
        </Link>
        </div>
        

    </div>

  );
}
